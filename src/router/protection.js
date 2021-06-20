export default [
  {
    path: '/protection/nginx',
    name: 'WikiProtectionNginx',
    component: () => import('@/views/protection/Nginx')
  },
  {
    path: '/protection/protecthandler',
    name: 'WikiProtectionProtectHandler',
    component: () => import('@/views/protection/ProtectHandler')
  },
  {
    path: '/protection/signing',
    name: 'WikiProtectionSigning',
    component: () => import('@/views/protection/Signing')
  },
  {
    path: '/protection/runtimeencrypt',
    name: 'WikiProtectionRuntimeEncrypt',
    component: () => import('@/views/protection/RuntimeEncrypt')
  }
]
