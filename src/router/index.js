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
    meta: { title: 'Install' },
    component: WikiIndex
  },
  {
    path: '/authprovider',
    name: 'WikiAuthProvider',
    meta: { title: 'AuthProvider' },
    component: WikiAuthProvider
  },
  {
    path: '/authhandler',
    name: 'WikiAuthHandler',
    meta: { title: 'AuthHandler' },
    component: WikiAuthHandler
  },
  {
    path: '/auth',
    name: 'WikiAuthCoreProvider',
    meta: { title: 'Настройка авторизации' },
    component: WikiAuthCoreProvider
  },
  {
    path: '/migration',
    name: 'WikiMigration',
    meta: { title: 'Миграция' },
    component: WikiMigration
  },
  {
    path: '/protection',
    name: 'WikiProtection',
    meta: { title: 'Защита' },
    component: WikiProtection
  },
  ...Protection,
  ...Developer,
  {
    path: '/clientbuild',
    name: 'WikiClientBuild',
    meta: { title: 'Сборка клиента' },
    component: WikiClientBuild
  },
  {
    path: '/serverbuild',
    name: 'WikiServerBuild',
    meta: { title: 'Сборка сервера' },
    component: WikiServerBuild
  },
  {
    path: '/runtimeapi',
    name: 'WikiRuntimeAPI',
    meta: { title: 'Runtime API' },
    component: WikiRuntimeAPI
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
      document.title = "GravitLauncher Wiki | " + ( to.meta.title || "" );
  });
});

export default router
