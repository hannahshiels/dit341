<template>
  <div class="ad">
    <b-card border-variant="dark">
      <b-card-header class="bg-white text-black border-white">
          <p>{{ ad.ad_date_posted }}</p>
          <p>{{ ad.ad_description }}</p>

      </b-card-header>

      <b-card-body>
                <button class="btn btn-info" v-on:click="moveToAd()">Go to ad</button>
      </b-card-body>
    </b-card>
  </div>
</template>

<style scoped>

.bg-white {
  background: white;
}

</style>

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
