import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import VueHighlightJS from 'vue-highlightjs'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueHighlightJS)
// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.config.productionTip = false

if (localStorage.getItem('version.major')) {
  store.commit('setVersion', {
    major: localStorage.getItem('version.major'),
    minor: localStorage.getItem('version.minor'),
    patch: localStorage.getItem('version.patch'),
    state: localStorage.getItem('version.state')
  })
}
if (localStorage.getItem('os.class')) {
  store.commit('setOperatingSystem', {
    osClass: localStorage.getItem('os.class'),
    osType: localStorage.getItem('os.type')
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
