<template>
 <div>
    <div class="text-center text-white" v-if="ads.length == 0" >  <p> Sorry, there are no ads </p> </div>
    <div class="row mt-3">
    <div class="col-md-8 bg-secondary">
    <h2>All advertisements</h2>
    <h3 class="text-white">Showing ads ({{this.startList}} to {{this.endList}})</h3>
    <div class="row justify-content-between">
    <div class="col-4">
      <button class="d-flex justify-content-start" v-on:click="showList()">Show all ads</button>
    </div>
    <div class="col-4">
      <button class="d-flex justify-content-end" v-on:click="moveList(-1)">Previous 5 ads</button>
    </div>
    <div class="col-4">
      <button class="d-flex justify-content-end" v-on:click="moveList(1)">Next 5 ads</button>
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
// import Router from '@/router'
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
        console.log('Current user ID is ' + this.user_id)
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
      endList: 5,
      allAds: false,
      user_id: this.$parent.user_id
    }
  },
  methods: {
    moveList(direction) {
      if (this.allAds === true) {
        this.showList()
      } else {
        if (direction === 1) {
          if (this.startList + 5 >= this.ads.length) {
            console.log('Reached limit')
          } else {
            this.startList += 5
            if (this.endList + 5 <= this.ads.length) {
              this.endList += 5
            } else {
              this.endList = this.ads.length
            }
          }
        } else {
          if (this.startList === 0) {
            console.log('Reached limit')
          } else {
            this.startList -= 5
            this.endList = this.startList + 5
          }
        }
      }
    },
    showList() {
      if (this.allAds === false) {
        console.log('Say hello')
        this.startList = 0
        this.endList = this.ads.length
        this.allAds = true
      } else {
        console.log('Say goodbye')
        this.startList = 0
        this.endList = 5
        this.allAds = false
      }
    }
  }
}
</script>
