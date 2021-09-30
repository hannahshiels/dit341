<template>
<div>
<div class="row justify-content-center">
  <div class="col-lg-4">
  <button type="button" class="btn btn-danger col align-self-center" v-on:click="toGardenPage()">  Your gardens</button>
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
export default {

  name: 'start',
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
    toPlantPage() {
      console.log('Moving to the plant pages')
      // this.$router.push('/ads')
    }
  }
}
</script>
