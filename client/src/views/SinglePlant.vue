<template>
  <div id="bg">
    <div class="p-5">
    <b-card class="ml-auto mr-auto d-flex shadow text-center text-black-50 border-none" no-body style="max-width: 20rem;">
      <b-card-body>
        <b-card-title class="title">{{ plant.plant_name }}</b-card-title>
        <b-card-text class="pt-2 pb-2">
          {{ plant.plant_description[1].description }}
        </b-card-text>
      </b-card-body>
      <b-card-header class="bg-info text-white border-none"> Watering schedule </b-card-header>
      <div class="flex-row justify-content-center p-4"
      >
        <b-badge class="m-1"
        v-bind:key="plant.water_schedule"
        v-for="plant in plant.water_schedule" variant="info"> {{ plant }} </b-badge>
      </div>
      <b-card-header class="green border-none"> Fertilizer schedule </b-card-header>
      <div class="flex-row justify-content-center p-4"
      >
        <b-badge class="m-1 green text-black-50" v-bind:key="plant.fertilizer_schedule"
        v-for="plant in plant.fertilizer_schedule" > {{ plant }} </b-badge>
      </div>
    </b-card>
    <b-card-group deck class="flex-row center">
      <div v-for="tip in tips" v-bind:key="tip._id">
        <tip v-bind:tip="tip" />
      </div>
    </b-card-group>
    </div>
  </div>
</template>

<style scoped>

.green {
  background: #b1e693;
}

#bg {
  min-height: 100vh;
  background: #d57a66;
}

.border-none {
  border: none;
}

.title {
  border-bottom: 1px solid;
  padding: 1rem 0;
}

.flex-row {
  display:flex;
  flex-direction: row;
}

.center {
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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
