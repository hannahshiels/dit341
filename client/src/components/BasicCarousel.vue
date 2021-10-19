<template>
  <div>
    <h1 class="mt-6 text-center">
      {{this.garden_title}}
    </h1>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-for="garden in gardens" v-bind:key="garden._id"
        :caption="'Garden number: ' + (slide+1)"
        :img-src="garden.img_link"
        class="d-block img-fluid w-100"
        alt="Responsive image"
      ></b-carousel-slide>

    </b-carousel>
  </div>
</template>

<script>

import { Api } from '@/Api'

export default {
  data() {
    return {
      slide: 1,
      user_id: this.$parent.user_id,
      first_img: '',
      gardens: [],
      sliding: null,
      garden_title: ''
    }
  },
  mounted() {
    if (this.user_id === '') {
      this.garden_title = 'You are not logged in'
    } else {
      Api.get('/users/' + this.user_id + '/gardens')
        .then(response => {
          console.log(response)
          console.log('Current user ID is ' + this.user_id)
          this.gardens = response.data.User_gardens
          console.log(this.gardens[0].img_link)
          this.first_img = this.gardens[0].img_link
          this.garden_title = 'Your gardens'
        })
        .catch(error => {
          this.gardens = []
          this.garden_title = 'There are no gardens'
          console.log(error)
        })
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    }
  }
}
</script>
