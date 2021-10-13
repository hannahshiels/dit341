<template>
<div>
  <div class="d-flex justify-content-center">
  <basic-carousel/>
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
import BasicCarousel from '../components/BasicCarousel.vue'

export default {
  name: 'start',
  components: {
    BasicCarousel
  },
  methods: {
    toGardenPage() {
      console.log('Moving to the garden page')
      this.$router.push('/gardens')
    },
    toTipPage() {
      console.log('Moving to the tip page')
      this.$router.push('/tips')
    },
    toPlantPage() {
      console.log('Moving to the plant pages')
      this.$router.push('/plants')
    }
  },
  data() {
    return {
      user_id: this.$parent.user_id
    }
  }
}
</script>
