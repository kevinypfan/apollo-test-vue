<template>
  <div>
    <form @submit.prevent="onSubmitHandler">
      <button type="button" @click="switchAuth">switch to {{ authMode === "Login" ? "Signup" : "Login" }}</button>
      <input type="text" v-if="authMode === 'Signup'" v-model="username">
      <input type="text" v-model="email">
      <input type="text" v-model="password">
      <button type="submit">submit</button>
    </form>
  </div>
</template>
<script>
import { SIGNUP_MUTATION, LOGIN_MUTATION } from "../constants/graphql";
export default {
  data() {
    return {
      authMode: "Login",
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmitHandler() {
      if (this.authMode === "Signup") {
        const { username, email, password } = this.$data;
        this.$apollo
          .mutate({
            mutation: SIGNUP_MUTATION,
            variables: {
              username,
              email,
              password
            }
          })
          .then(result => {
            const { tokens } = result.data.signup;
            const token = tokens[tokens.length - 1].tokenHash;
            window.localStorage.setItem("authToken", token);
            this.$router.push("/posts");
          })
          .catch(err => {
            console.error(err.message);
          });
      } else {
        const { email, password } = this.$data;
        this.$apollo
          .mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              email,
              password
            }
          })
          .then(result => {
            const { tokens } = result.data.login;
            const token = tokens[tokens.length - 1].tokenHash;
            window.localStorage.setItem("authToken", token);
            this.$router.push("/posts");
          })
          .catch(err => {
            console.error(err.message);
          });
      }
    },
    switchAuth() {
      this.authMode = this.authMode === "Signup" ? "Login" : "Signup";
    }
  }
};
</script>

