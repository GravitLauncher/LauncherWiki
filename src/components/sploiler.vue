<template>
    <details>
          <summary tabindex="1">
              <slot name="header"></slot><a v-if="link" :href='"#"+this.link'>&#128279;</a>
          </summary>
          <a v-if="link" :name='this.link'></a>
          <slot></slot>
    </details>
</template>
<script>
export default {
  props: ['text', 'link']
}
</script>
