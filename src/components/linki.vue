<template>
    <span>
          <a v-if="link" :href='"#"+this.link'>&#128279;</a>
          <a v-if="link" :name='this.link'></a>
    </span>
</template>
<script>
export default {
  props: ['link']
}
</script>
