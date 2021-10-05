<template>
 <div>
    <div class="text-center text-white" v-if="ads.length == 0" >  <p> Sorry, there are no ads </p> </div>
    <div class="row mt-3">
    <div class="col-md-8 bg-secondary">
    <p>All advertisements</p>
    <div class="row justify-content-between">
    <div class="col-4">
      <button class="d-flex justify-content-start" v-on:click="showList()">Show all ads</button>
    </div>
    <div class="col-4">
      <button class="d-flex justify-content-end" v-on:click="moveList()">Show next 5</button>
    </div>
  </div>
       <b-card-group deck>
          <div v-for="ad in ads.slice(this.startList,this.endList)" v-bind:key="ad._id">
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
import Router from '@/router'
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
      ads: [],
      startList: 0,
      endList: 5
    }
  },
  methods: {
    moveList() {
      if (this.endList + 5 > this.ads.length) {
        console.log('Reached limit')
      } else {
        this.startList = this.startList + 5
        this.endList = this.endList + 5
        Router.push('/ads')
      }
    },
    showList() {
      console.log('Say hello')
      this.startList = 0
      this.endList = this.ads.length
      Router.push('/ads')
    }
  }
}
</script>
