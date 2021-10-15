<template>
<div>
  <div class="d-flex justify-content-center">
  <basic-carousel/>
  </div>
  <div class ="container">
<div class="row justify-content-center">
  <div class="col-lg-4 mb-2 mt-3 ml-1 mr-1">
  <button type="button" class="btn btn-danger col align-self-center p-2 m-1" v-on:click="toGardenPage()">Gardens</button>
  </div>
</div>
<div class="row justify-content-center">
  <div class="col-lg-3 mb-1 mt-1 ml-1 mr-1">
  <button type="button" class="btn btn-danger col align-self-start p-2 m-1" v-on:click="toAdPage()">Ads</button>
  </div>
  <div class="col-lg-3 mb-1 mt-1 ml-1 mr-1">
  <button type="button" class="btn btn-danger col align-self-end p-2 m-1" v-on:click="toTipPage()">Tips</button>
  </div>
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
      this.$router.push('/gardens')
    },
    toTipPage() {
      this.$router.push('/tips')
    },
    toAdPage() {
      this.$router.push('/ads')
    }
  },
  data() {
    return {
      user_id: this.$parent.user_id
    }
  }
}
</script>
