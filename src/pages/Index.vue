<template>
  <q-page padding>
    <h2>GravitLauncher Wiki</h2>
    <p>Это вики по GravitLauncher - лучшему лаунчеру майнкрафт для вашего проекта. GravitLauncher имеет множество функций, таких как:</p>
    <ul>
      <li>Поддержка запуска майнкрафта от 1.7.10 до 1.17.1</li>
      <li>Установка на ваш сервер(VPS/VDS)</li>
      <li>Поддержка нативной защиты, шифрования рантайма, обфускации proguard, подписи jar/exe и множество других функций безопасности</li>
      <li>Кастомизируемый рантайм на основе JavaFX</li>
      <li>И множество других функций, которые вы можете найти в этой вики</li>
    </ul>
    <p>
      <q-btn no-warp color="primary" label='Начать установку' to='/install'></q-btn>
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex'
})
</script>
