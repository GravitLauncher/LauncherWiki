<template>
  <h3 :id="name"><slot></slot></h3>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "doc-header",
  props: ["name"],
  data: function () {
    return {
    };
  },
  methods: {
  },
});
</script>
