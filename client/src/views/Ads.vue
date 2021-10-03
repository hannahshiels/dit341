<template>
 <div>
    <div class="text-center text-white" v-if="ads.length == 0" >  <p> Sorry, there are no ads </p> </div>
    <div class="row mt-3">
    <div class="col-md-8 bg-secondary">
    <p>All advertisements</p>
       <b-card-group deck>
          <div v-for="ad in ads" v-bind:key="ad._id">
            <ad v-bind:ad="ad" class="mb-1 mt-1 ml-1 mr-1"/>
          </div>
     </b-card-group>
     </div>
   <div class="col-md-4">
     <post-ad/>
   </div>
   </div>
  </div>
</template>

<script>

import Ad from '../components/Ad.vue'
import PostAd from '../components/PostAd.vue'
import { Api } from '@/Api'

export default {
  name: 'ads',
  components: {
    ad: Ad,
    PostAd
  },
  mounted() {
    Api.get('/ads')
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
