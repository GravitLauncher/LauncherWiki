import Vue from 'vue'
import VueRouter from 'vue-router'
import WikiIndex from '@/views/WikiIndex'
import WikiAuthProvider from '@/views/WikiAuthProvider'
import WikiAuthHandler from '@/views/WikiAuthHandler'
import WikiAuthCoreProvider from '@/views/WikiAuthCoreProvider'
import WikiProtection from '@/views/WikiProtection'
import WikiClientBuild from '@/views/WikiClientBuild'
import WikiServerBuild from '@/views/WikiServerBuild'
import WikiRuntimeAPI from '@/views/WikiRuntimeAPI'
import WikiMigration from '@/views/WikiMigration'
import Protection from './protection.js'
import Developer from './developer.js'

Vue.use(VueRouter)

const routes = [
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
    path: '/auth',
    name: 'WikiAuthCoreProvider',
    component: WikiAuthCoreProvider
  },
  {
    path: '/migration',
    name: 'WikiMigration',
    component: WikiMigration
  },
  {
    path: '/protection',
    name: 'WikiProtection',
    component: WikiProtection
  },
  ...Protection,
  ...Developer,
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
    path: '/runtimeapi',
    name: 'WikiRuntimeAPI',
    component: WikiRuntimeAPI
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
