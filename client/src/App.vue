<template>
  <div id="app">

    <div v-if="authenticated">  <b-button @click="logout"> Logout </b-button> </div>

    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/tips">Tips</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign Up</router-link>
      <router-link v-if="authenticated"  to="/settings">Settings</router-link>

    </div>
    <!-- Render the content of the current page view -->
    <router-view/>
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

import { Api } from '@/Api'
import Router from '@/router'

export default {
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
    setAuthenticated(status) {
      this.authenticated = status
    },
    logout() {
      Api.get('/logout')
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      this.setAuthenticated(false)
      this.setID('')
      Router.push('/')
    }
  }
}
</script>
