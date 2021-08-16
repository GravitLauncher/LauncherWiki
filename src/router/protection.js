export default [
  {
    path: '/protection/nginx',
    name: 'WikiProtectionNginx',
    meta: { title: 'Защита | Настройка Nginx' },
    component: () => import('@/views/protection/Nginx')
  },
  {
    path: '/protection/protecthandler',
    name: 'WikiProtectionProtectHandler',
    meta: { title: 'Защита | Настройка ProtectHandler' },
    component: () => import('@/views/protection/ProtectHandler')
  },
  {
    path: '/protection/signing',
    name: 'WikiProtectionSigning',
    meta: { title: 'Защита | Подпись' },
    component: () => import('@/views/protection/Signing')
  },
  {
    path: '/protection/runtimeencrypt',
    name: 'WikiProtectionRuntimeEncrypt',
    meta: { title: 'Защита | Шифрование рантайма' },
    component: () => import('@/views/protection/RuntimeEncrypt')
  }
]
