/* eslint-disable vue/valid-v-for */
<template>
  <div id="bg">
    <div class="p-5">
    <b-card class="ml-auto mr-auto d-flex" no-body style="max-width: 20rem;">
      <b-card-body>
        <b-card-title>{{ plant.plant_name }}</b-card-title>
        <b-card-text>
          {{ plant.plant_description[1].description }}
        </b-card-text>
      </b-card-body>
      <b-card-header> Watering schedule </b-card-header>
      <div class="flex-row p-2"
      >
        <b-badge class="m-1"
        v-bind:key="plant.water_schedule"
        v-for="plant in plant.water_schedule" variant="primary"> {{ plant }} </b-badge>
      </div>
      <b-card-header> Fertilizer schedule </b-card-header>
      <div class="flex-row p-2"
      >
        <b-badge class="m-1" v-bind:key="plant.fertilizer_schedule"
        v-for="plant in plant.fertilizer_schedule" variant="success"> {{ plant }} </b-badge>
      </div>
    </b-card>
    <b-card-group deck class="center">
      <div v-for="tip in tips" v-bind:key="tip._id">
        <tip v-bind:tip="tip" />
      </div>
    </b-card-group>
    </div>
  </div>
</template>

<style scoped>
#bg {
  min-height: 100vh;
  background: #d57a66;
}

.flex-row {
  display:flex;
  flex-direction: row;
}
</style>

<script>
import Tip from '../components/Tip.vue'
import { Api } from '@/Api'

export default {
  data() {
    return {
      tips: [],
      plant: null
    }
  },
  mounted() {
    Api.get(
      '/gardens/' +
        this.$route.params.gardenID +
        '/plants/' +
        this.$route.params.plantID
    )
      .then(response => {
        console.log(response)
        this.plant = response.data.plant
      })
      .catch(err => {
        console.log(err)
      })

    Api.get(
      '/gardens/' +
        this.$route.params.gardenID +
        '/plants/' +
        this.$route.params.plantID +
        '/tips'
    )
      .then(response => {
        console.log(response)
        this.tips = response.data.tips
      })
      .catch(error => {
        console.log(error)
      })
  },
  components: {
    tip: Tip
  }
}
</script>
