<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/styles/default.min.css"
    />
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand to="/">GravitLauncher Wiki</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown :text="version" right>
              <b-dropdown-item @click="setVersion(5,2,0, 'dev')">v5.2.0-dev</b-dropdown-item>
              <b-dropdown-item @click="setVersion(5,1,10, 'stable')">v5.1.10-stable</b-dropdown-item>
              <b-dropdown-item @click="setVersion(5,1,7, 'stable')">v5.1.7-stable</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown :text="osName" right>
              <b-dropdown-item @click="setOperationSystem('Linux', 'Debian')">Debian</b-dropdown-item>
              <b-dropdown-item @click="setOperationSystem('Linux', 'CentOS')">CentOS</b-dropdown-item>
              <b-dropdown-item @click="setOperationSystem('Linux', 'ArchLinux')">ArchLinux</b-dropdown-item>
              <b-dropdown-item @click="setOperationSystem('Windows', 'Windows')">Windows</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Разделы" right>
              <b-dropdown-item to="/">Главная</b-dropdown-item>
              <b-dropdown-item to="/authprovider">AuthProvider</b-dropdown-item>
              <b-dropdown-item to="/authhandler">AuthHandler</b-dropdown-item>
              <b-dropdown-item to="/protection">Защита</b-dropdown-item>
              <b-dropdown-item to="/clientbuild"
                >Сборка клиента</b-dropdown-item
              >
              <b-dropdown-item to="/serverbuild"
                >Сборка сервера</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Разработчикам" right>
              <b-dropdown-item to="/developers/api"
                >Написание модулей</b-dropdown-item
              >
              <b-dropdown-item to="/developers/websocketapi"
                >WebSocket API</b-dropdown-item
              >
              <b-dropdown-item to="/runtimeapi"
                >Редактирование runtime</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    version: function () {
      return 'v' + this.$store.state.major + '.' + this.$store.state.minor + '.' + this.$store.state.patch + '-' + this.$store.state.state
    },
    osName: function () {
      return this.$store.state.osType
    }
  },
  methods: {
    setVersion: function (major, minor, patch, state) {
      this.$store.commit('setVersion', { major, minor, patch, state })
    },
    setOperationSystem: function (osClass, osType) {
      this.$store.commit('setOperatingSystem', { osClass, osType })
    }
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}
.content {
  text-align: initial;
  padding: 10px 20px 3% 3%;
}
details {
  display: block;
  background: #fff;
  box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}
summary::-webkit-details-marker {
  display: none;
}
summary::-moz-list-bullet {
  list-style-type: none;
}
summary::marker {
  display: none;
}
summary {
  display: block;
  padding: 0.3em 0.3em 0.3em 1.4em;
  font-size: 1.4em;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid #e2e8f0;
}
summary:before {
  top: 0.4em;
  left: 0.3em;
  color: transparent;
  background: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjM0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIzNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOC41OSAxNi4zNGw0LjU4LTQuNTktNC41OC00LjU5TDEwIDUuNzVsNiA2LTYgNnoiLz48L3N2Zz4=")
    no-repeat 50% 50% / 1em 1em;
  width: 1em;
  height: 1em;
  content: "";
  position: absolute;
  transition: transform 0.5s;
}
details[open] > summary:before {
  transform: rotateZ(90deg);
}
summary ~ * {
  padding: 0 2em 10px 2em;
}
details[open] summary ~ * {
  animation: sweep 0.5s ease-in-out;
}
@keyframes sweep {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
summary:focus {
  outline: 0;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3), inset 0 0 2px rgba(0, 0, 0, 0.3);
}
.wiki {
  text-align: initial;
}
.wiki h2,
h1,
h3 {
  text-align: center;
}
.hljs {
  border-radius: 8px;
}
span.codes {
  font-size: 12px;
  font-family: Consolas, monospace, serif;
  color: #000;
  white-space: nowrap;
  padding: 0 4px;
  background: #bdbdbd;
  border-radius: 2px;
}

.gtag {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 700;
  color: #fff;
  display: inline-flex;
  align-items: center;
  font-size: 16px;
}
.gtag::before {
  content: "";
  width: 22px;
  height: 22px;
  margin-right: 6px;
}

.gtag-deprecated {
  background-color: #faad14;
}
.gtag-deprecated::before {
  background-image: url("./assets/gtag/error.svg");
}
.gtag-important {
  background-color: #f5222d;
}
.gtag-important::before {
  background-image: url("./assets/gtag/star.svg");
}
.gtag-info {
  background-color: #722ed1;
}
.gtag-info::before {
  background-image: url("./assets/gtag/push-pin.svg");
}
.gtag-easy {
  background-color: #52c41a;
}
.gtag-easy::before {
  background-image: url("./assets/gtag/joke.svg");
}
.gtag-medium {
  background-color: #1890ff;
}
.gtag-medium::before {
  background-image: url("./assets/gtag/straight.svg");
}
.gtag-hard {
  background-color: #f5222d;
}
.gtag-hard::before {
  background-image: url("./assets/gtag/sos.svg");
}
</style>
