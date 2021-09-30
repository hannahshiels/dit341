<template>
  <div id="app">
    <navigation-bar />
    <!-- Render the content of the current page view -->
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  text-align: center;
}
</style>

<script>
import NavigationBar from './components/NavigationBar.vue'

export default {
  components: {
    NavigationBar
  },
  name: 'App',
  data() {
    return {
      authenticated: false,
      user_id: ''
    }
  },
  methods: {
    setID(id) {
      this.user_id = id
    },
    getAuthenicated() {
      return this.authenticated
    },
    setAuthenticated(status) {
      this.authenticated = status
      console.log(status)
    }
  }
}
</script>
