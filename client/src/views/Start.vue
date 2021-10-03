<template>
<div>
  <div class="mx-auto">
  <garden-slide/>
  </div>
<div class="row justify-content-center">
  <div class="col-lg-4">
  <button type="button" class="btn btn-danger col align-self-center" v-on:click="toGardenPage()">Your gardens</button>
  </div>
</div>
<div class="row justify-content-center">
  <div class="col-lg-4">
  <button type="button" class="btn btn-danger col align-self-start" v-on:click="toPlantPage()">Your plants</button>
  </div>
  <div class="col-lg-4">
  <button type="button" class="btn btn-danger col align-self-end" v-on:click="toTipPage()">Your tips</button>
  </div>
</div>

</div>
</template>

<script>
import GardenSlide from '../components/GardenSlide.vue'

export default {
  name: 'start',
  components: {
    GardenSlide
  },
  methods: {
    toGardenPage() {
      console.log('Moving to the garden page')
      // this.$router.push('/test')
    },
    toTipPage() {
      console.log('Moving to the tip page')
      this.$router.push('/tips')
    },
    toPlantPage() {
      console.log('Moving to the plant pages')
      // this.$router.push('/ads')
    }
  }
}
</script>
