export default [
  {
    path: '/developers/websocketapi',
    name: 'WikiDeveloperWebSocketAPI',
    meta: { title: 'Для разработчиков | WebSocket API' },
    component: () => import('@/views/developers/WebSocketAPI')
  },
  {
    path: '/developers/api',
    name: 'WikiDeveloperAPI',
    meta: { title: 'Для разработчиков | API' },
    component: () => import('@/views/developers/API')
  },
  {
    path: '/developers/oauth',
    name: 'WikiDeveloperOAuth',
    meta: { title: 'Для разработчиков | OAuth' },
    component: () => import('@/views/developers/OAuth')
  },
  {
    path: '/developerapi',
    name: 'WikiDeveloperLAPI',
    meta: { title: 'Для разработчиков | API' },
    component: () => import('@/views/developers/API')
  }
]
