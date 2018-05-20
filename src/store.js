import Vue from 'vue'
import Vuex from 'vuex'

import graphqlClient from './utils/graphql'

import { CHECK_TOKEN } from './constants/graphql'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    checkToken({ commit }) {
      return new Promise((resolve, reject) => {
        graphqlClient.query({
          query: CHECK_TOKEN
        }).then(result => {
          console.log(result)
          commit('setUser', result.data.check)
          resolve()
        }).catch(err => {
          console.error(err)
          reject()
        })
      })
    }
  }
})
