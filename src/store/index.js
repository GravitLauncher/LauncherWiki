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
      state.path = version.path
      state.state = version.state ? version.state : 'stable'
    }
  },
  actions: {
    ifVersion: function (context, data) {
      if (data.major && (context.state.major < data.major)) return false
      if (data.imajor && (context.state.major > data.imajor)) return false
      if (data.minor && (context.state.minor < data.minor)) return false
      if (data.iminor && (context.state.minor > data.iminor)) return false
      if (data.patch && (context.state.patch < data.patch)) return false
      if (data.ipatch && (context.state.patch > data.ipatch)) return false
      return true
    }
  },
  modules: {
  }
})
