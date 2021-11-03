
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/install',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/wiki/LaunchServerInstall.vue') }
    ]
  },
  {
    path: '/auth',
    alias: ['/authcoreprovider', '/authprovider', '/authhandler'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/wiki/LaunchServerAuth.vue') }
    ]
  },
  {
    path: '/othersettings',
    alias: ['/textureprovider'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/wiki/LaunchServerOther.vue') }
    ]
  },
  {
    path: '/client',
    alias: ['/clientbuild'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/wiki/Client.vue') }
    ]
  },
  {
    path: '/server',
    alias: ['/serverbuild'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/wiki/Server.vue') }
    ]
  },
  {
    path: '/runtime',
    alias: ['/runtimebuild'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/wiki/Runtime.vue') }
    ]
  },
  {
    path: '/developers',
    alias: ['/developers/oauth'],
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/wiki/Developers.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
