<template>
<div>
<b-navbar toggleable="lg" type="dark" variant="warning">
      <b-navbar-nav class="ml-auto">
          <b-link href="#foo" class="link-secondary" v-on:click="toLoginPage()">Create an account or login</b-link>
      </b-navbar-nav>
  </b-navbar>

  <b-navbar toggleable type="dark" variant="secondary">
    <b-navbar-brand href="#" v-on:click="toMainPage">Get Potted</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <div class="btn-group" role="group" aria-label="Basic example">
            <a href="#" class="btn btn-secondary" v-on:click="toGardenPage()">Gardens</a>
            <span class="border border-light"></span>
            <a href="#" class="btn btn-secondary" v-on:click="toTipPage()">Tips</a>
            <span class="border border-light"></span>
            <a href="#" class="btn btn-secondary" v-on:click="toAdPage()">Ads</a>
        </div>
      </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>

export default {
  methods: {
    toGardenPage() {
      console.log('Moving to the garden page')
      // Change '/test' to the garden route
      // this.$router.push('/test')
    },
    toTipPage() {
      console.log('Moving to the tip page')
      // Change '/test' to the tip route
      // this.$router.push('/test')
    },
    toAdPage() {
      console.log('Moving to the ad pages')
      this.$router.push('/ads')
    },
    toLoginPage() {
      console.log('Moving to the account/login page')
      // Change '/test' to the account/login route
      // this.$router.push('/test')
    },
    toMainPage() {
      console.log('Moving ot the main page')
      this.$router.push('/main')
    }
  }
}
</script>
