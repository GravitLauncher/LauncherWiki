import codes from './codes.vue'
import gtag from './gtag.vue'
import sploiler from './sploiler.vue'

export default {
  computed: {
    version: function () {
      return this.$store.state.major * 10000 + this.$store.state.minor * 100 + this.$store.state.patch * 1
    },
    os: function () {
      return this.$store.state.osType
    },
    osc: function () {
      return this.$store.state.osClass
    }
  },
  methods: {
    ifVersion: function (data) {
      if (data.major && (this.$store.state.major < data.major)) return false
      if (data.imajor && (this.$store.state.major > data.imajor)) return false
      if (data.minor && (this.$store.state.minor < data.minor)) return false
      if (data.iminor && (this.$store.state.minor > data.iminor)) return false
      if (data.patch && (this.$store.state.patch < data.patch)) return false
      if (data.ipatch && (this.$store.state.patch > data.ipatch)) return false
      console.log(true)
      return true
    }
  },
  components: {
    codes, gtag, sploiler
  }
}
