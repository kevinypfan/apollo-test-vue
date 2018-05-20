import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Auth from './views/Auth.vue'
import Posts from './views/Posts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    }
  ]
})
