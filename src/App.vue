<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
})
</script>
<style scoped>
.codes {
  font-size: 12px;
  font-family: Consolas, monospace, serif;
  color: #000;
  white-space: nowrap;
  padding: 0 4px;
  background: #bdbdbd;
  border-radius: 2px;
}
</style>