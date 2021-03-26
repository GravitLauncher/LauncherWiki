<template>
    <details>
          <summary tabindex="1">{{ text }}</summary>
          <slot></slot>
    </details>
</template>
<script>
export default {
  props: ['text']
}
</script>
