<template>
  <div>
    <navigation-bar/>
    <b-jumbotron header="DIT341 Frontend" lead="Welcome to your DIT341 Frontend Vue.js App">
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()" >Get Message from Server</b-button>
      <p>Message from the server:<br/>
      {{ message }}</p>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  components: { NavigationBar },
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
