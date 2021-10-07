<template>
  <div>
    <b-navbar toggleable="lg" type="dark"  class="bg" id="nav">
      <b-navbar-nav class="ml-auto">
        <div v-if="!isAuthenticated" class="text-center">
          <router-link to="/signup" class="link-secondary text-dark">
            Create an account
          </router-link>
          <span> or </span>
          <router-link to="/login" class="link-secondary text-dark">
            Login instead</router-link
          >
        </div>
        <div v-else><a class="link text-dark" @click="logout"> Logout </a></div>
      </b-navbar-nav>
    </b-navbar>
    <b-navbar toggleable="md" type="dark" variant="dark" class="flex-col">
      <router-link to="/"
        ><b-navbar-brand> Get Potted </b-navbar-brand>
      </router-link>

      <b-navbar-nav class="ml-auto">
        <div class="btn-group flex-col" role="group" aria-label="Basic example">
          <router-link to="/gardens" class="btn btn-secondary btn-dark"
            >Gardens</router-link
          >
          <span class="border border-light"></span>
          <router-link to="/tips" class="btn btn-secondary btn-dark">Tips</router-link>
          <span class="border border-light"></span>
          <router-link to="/ads" class="btn btn-secondary btn-dark">Ads</router-link>
            <span  v-if="isAuthenticated" class="border border-light"></span>
            <router-link v-if="isAuthenticated" class="btn btn-secondary btn-dark" to="/settings">
              Settings
            </router-link>
        </div>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import { Api } from '@/Api'

import Router from '@/router'

export default {
  computed: {
    isAuthenticated: function () {
      return this.$parent.authenticated
    }
  },
  methods: {
    logout() {
      Api.get('/logout')
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      this.$parent.setAuthenticated(false)
      this.$parent.setID('')
      Router.push('/')
    }
  }
}
</script>

<style scoped>
.bg {
  background: #FFD65C;
}

@media screen and (max-width:575px){

  .ml-auto{
    margin-right: auto;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .flex-col > * {
    width: 100%;
    text-align: center;
  }

  .navbar-brand {
    margin-right: 0;
  }
}

</style>
