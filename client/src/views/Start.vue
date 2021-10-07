<template>
<div>
  <div class="mx-auto">
  <garden-slide/>
  </div>
<div class="row justify-content-center">
  <div class="col-lg-4 mb-3 mt-1 ml-1 mr-1">
  <button type="button" class="btn btn-danger col align-self-center p-2" v-on:click="toGardenPage()">Your gardens</button>
  </div>
</div>
<div class="row justify-content-center">
  <div class="col-lg-4 mb-1 mt-1 ml-1 mr-1">
  <button type="button" class="btn btn-danger col align-self-start p-2" v-on:click="toPlantPage()">Your plants</button>
  </div>
  <div class="col-lg-4 mb-1 mt-1 ml-1 mr-1">
  <button type="button" class="btn btn-danger col align-self-end p-2" v-on:click="toTipPage()">Your tips</button>
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
