import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    major: 5,
    minor: 1,
    patch: 10,
    state: 'stable',
    osClass: 'Linux',
    osType: 'Debian'
  },
  mutations: {
    setVersion: function (state, version) {
      state.major = version.major
      state.minor = version.minor
      state.patch = version.patch
      state.state = version.state ? version.state : 'stable'
      localStorage.setItem('version.major', version.major)
      localStorage.setItem('version.minor', version.minor)
      localStorage.setItem('version.patch', version.patch)
      localStorage.setItem('version.state', version.state ? version.state : 'stable')
    },
    setOperatingSystem: function (state, os) {
      state.osClass = os.osClass
      state.osType = os.osType
      localStorage.setItem('os.class', os.osClass)
      localStorage.setItem('os.type', os.osType)
    }
  },
  actions: {
  },
  modules: {
  }
})
