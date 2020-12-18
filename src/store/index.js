import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    major: 5,
    minor: 1,
    patch: 9,
    state: 'dev'
  },
  mutations: {
    setVersion: function (state, version) {
      state.major = version.major
      state.minor = version.minor
      state.patch = version.patch
      state.state = version.state ? version.state : 'stable'
    }
  },
  actions: {
  },
  modules: {
  }
})
