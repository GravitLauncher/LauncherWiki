<template>
  <q-expansion-item
        expand-separator
        default-opened
        icon="code"
        :label="header"
      >
      <highlightjs :language="language" :code="code" />
  </q-expansion-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "doc-code",
  props: ["header", "language", "code"],
  data: function () {
    return {
      copytext: "Copy",
    };
  },
  methods: {
    copyin: async function () {
      var cleartext = this.code
        .split("\n")
        .map((e) => this.clearlinein(e))
        .filter((e) => e)
        .join("\n");
      await navigator.clipboard.writeText(cleartext);
      this.copytext = "Copied";
    },
    clearlinein: function (text) {
      var tmptext = text;
      var offset = 0;
      do {
        var r = tmptext.search('"');
        if (r > 0) {
          offset += r + 1;
          tmptext = tmptext.substr(r + 1);
        }
      } while (r > 0);
      r = tmptext.search("//");
      if (r > 0) {
        text = text.substr(0, offset + r);
      }
      if (text.trim().length == 0) return undefined;
      return text;
    },
  },
});
</script>
