<template>
 <div class="mx-auto">
   <div class="text-center text-white" v-if="ads.length == 0" >  <p> Sorry, there are no ads </p> </div>
     <b-card-group deck class="position-absolute top-0 end-0 mx-auto">
      <div v-for="ad in ads" v-bind:key="ad._id">
          <ad v-bind:ad="ad"/>
      </div>
     </b-card-group>
 </div>
</template>

<script>

import Ad from '../components/Ad.vue'
import { Api } from '@/Api'

export default {
  name: 'ads',
  components: {
    ad: Ad
  },
  mounted() {
    Api.get('/users/6149f9f1e01786e798ea4619/ads')
      .then(response => {
        console.log(response)
        this.ads = response.data.ads
      })
      .catch(error => {
        this.ads = []
        console.log(error)
      })
  },
  data() {
    return {
      ads: []
    }
  }
}
</script>
