import Vue from 'vue'
import Router from 'vue-router'
import WikiIndex from '@/components/WikiIndex'
import WikiAuthProvider from '@/components/WikiAuthProvider'
import WikiAuthHandler from '@/components/WikiAuthHandler'
import WikiProtection from '@/components/WikiProtection'
import WikiClientBuild from '@/components/WikiClientBuild'
import WikiServerBuild from '@/components/WikiServerBuild'
import WikiDeveloperAPI from '@/components/WikiDeveloperAPI'
import WikiRuntimeAPI from '@/components/WikiRuntimeAPI'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'WikiIndex',
      component: WikiIndex
    },
    {
      path: '/authprovider',
      name: 'WikiAuthProvider',
      component: WikiAuthProvider
    },
    {
      path: '/authhandler',
      name: 'WikiAuthHandler',
      component: WikiAuthHandler
    },
    {
      path: '/protection',
      name: 'WikiProtection',
      component: WikiProtection
    },
    {
      path: '/clientbuild',
      name: 'WikiClientBuild',
      component: WikiClientBuild
    },
    {
      path: '/serverbuild',
      name: 'WikiServerBuild',
      component: WikiServerBuild
    },
    {
      path: '/developerapi',
      name: 'WikiDeveloperAPI',
      component: WikiDeveloperAPI
    },
    {
      path: '/runtimeapi',
      name: 'WikiRuntimeAPI',
      component: WikiRuntimeAPI
    }
  ]
})
