<template>
  <q-page padding>
    <h2>GravitLauncher Wiki</h2>
    <p>Это вики по GravitLauncher - лучшему лаунчеру майнкрафт для вашего проекта. GravitLauncher имеет множество функций, таких как:</p>
    <ul>
      <li>Версии: MineCraft от 1.7.10 до 1.17.1</li>
      <li>Безопасность: поддержка нативной защиты, шифрования рантайма, обфускации ProGuard, подписи .jar/.exe и т.д.</li>
      <li>Кастомизируемость: рантайм на основе JavaFX</li>
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
