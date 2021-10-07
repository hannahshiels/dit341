<template>
  <div>
    <b-card border-variant="dark">
      <b-card-header class="d-flex justify-content-center align-items-center border-dark">
        <div class="bg-grey d-flex flex-fill">
          <div class="bg-dark text-white flex-fill"><p>{{ ad.ad_date_posted }}</p></div>
        </div>
      </b-card-header>
      <b-card-body>
        <b-card-text align-h="start" class="ad-content">
          <button v-on:click="moveToAd()">{{ ad.ad_type }}</button>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>

import Router from '@/router'

export default {
  name: 'ad',
  props: ['ad'],
  methods: {
    moveToAd() {
      const id = this.ad._id
      Router.push('/ads/' + id)
    }
  }
}

</script>
