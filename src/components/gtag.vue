<template>
    <div :class="classgen"><slot></slot></div>
</template>
<script>
export default {
  props: ['type'],
  computed: {
    classgen: function () {
      return 'gtag gtag-' + this.type
    }
  }
}
</script>
