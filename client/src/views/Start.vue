<template>
<div>
  <div class="d-flex justify-content-center">
  <basic-carousel/>
  </div>
  <div class ="container">
    <div class="text-center text-black">
      <p>This application helps home gardeners to maintain their gardens and plants well, track progress, prepare schedules and thus keep them in the best shape possible. You can write blog posts about your garden and plants to share knowledge, wisdom and experience. You can also make adverstisements.</p>
</div>
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
<div class="row justify-content-center">
<a><img src="../assets/garden1.jpg" width="300" height="200" alt="Garden Image"></a>
<a><img src="../assets/garden2.jpg" width="300" height="200" alt="Garden Image"></a>
<a><img src="../assets/garden3.jpg" width="300" height="200" alt="Garden Image"></a>
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
