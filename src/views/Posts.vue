<template>
  <div>
    <form @submit.prevent="onSubmitHandler">
      <input type="text" v-model="subject">
      <input type="text" v-model="description">
      <button type="submit">submit</button>
    </form>
    <h1 v-if="$apollo.queries.posts.loading">Loading</h1>
    <pre v-if="!$apollo.queries.posts.loading">{{posts}}</pre>
  </div>
</template>
<script>
import { GET_POSTS, NEW_POST } from "../constants/graphql";
export default {
  data() {
    return {
      posts: null,
      subject: "",
      description: ""
    };
  },
  apollo: {
    posts: {
      query: GET_POSTS
    }
  },
  methods: {
    onSubmitHandler() {
      const { subject, description } = this.$data;
      this.$apollo
        .mutate({
          mutation: NEW_POST,
          variables: {
            subject,
            description
          }
        })
        .then(rs => {
          this.$apollo.queries.posts.refetch();
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  }
};
</script>
