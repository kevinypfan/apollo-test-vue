import Vue from 'vue'

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import { setContext } from 'apollo-link-context';

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueApollo);

const httpLink = new HttpLink({
  uri: `http://localhost:3000/graphql`
});

const middlewareLink = setContext(() => ({
  headers: {
    authToken: window.localStorage.getItem('authToken') || null
  }
}));

const link = middlewareLink.concat(httpLink);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user) next();
    if (!store.state.user) {
      store.dispatch('checkToken')
        .then(rs => {
          next();
        }).catch(() => {
          next({
            path: '/auth',
            query: { redirect: to.fullPath }
          });
        })
    }
  } else {
    next();
  }
})

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
