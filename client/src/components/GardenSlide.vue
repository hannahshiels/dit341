<template>
  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img :src= "this.first_img" class="d-block w-100" alt="">
    </div>
    <div v-for="garden in gardens.slice(1, this.gardens.length)" v-bind:key="garden._id" class="carousel-item">
      <img :src="garden.img_link" class="d-block w-100" alt="">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</template>

<script>

import { Api } from '@/Api'

export default {
  name: 'gardens',
  data() {
    return {
      user_id: this.$parent.user_id,
      first_img: ''
    }
  },
  mounted() {
    Api.get('/users/' + this.user_id + '/gardens')
      .then(response => {
        console.log(response)
        console.log('Current user ID is ' + this.user_id)
        this.gardens = response.data.User_gardens
        console.log(this.gardens[0].img_link)
        this.first_img = this.gardens[0].img_link
      })
      .catch(error => {
        this.ads = []
        console.log(error)
      })
  }
}
</script>
