<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="warning">
      <b-navbar-nav class="ml-auto">
        <div v-if="!isAuthenticated">
          <router-link to="/signup" class="link-secondary">
            Create an account
          </router-link>
          <span> or </span>
          <router-link to="/login" class="link-secondary">
            Login instead</router-link
          >
        </div>
        <div v-else><a class="link" @click="logout"> Logout </a></div>
      </b-navbar-nav>
    </b-navbar>
    <b-navbar toggleable type="dark" variant="secondary">
      <router-link to="/start"
        ><b-navbar-brand> Get Potted </b-navbar-brand>
      </router-link>

      <b-navbar-nav class="ml-auto">
        <div class="btn-group" role="group" aria-label="Basic example">
          <router-link to="/gardens" class="btn btn-secondary"
            >Gardens</router-link
          >
          <span class="border border-light"></span>
          <router-link to="/tips" class="btn btn-secondary">Tips</router-link>
          <span class="border border-light"></span>
          <router-link to="/ads" class="btn btn-secondary">Ads</router-link>
            <span  v-if="isAuthenticated" class="border border-light"></span>
            <router-link v-if="isAuthenticated" class="btn btn-secondary" to="/settings">
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
