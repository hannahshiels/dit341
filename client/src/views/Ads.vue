<template>
 <div id="myID" class="bg-info">
    <div class="container">
    <b-row class=" pt-3">
    <b-col lg="8" md="10" sm="12" class=" bg-secondary">
    <h2>Advertisements</h2>
    <h3 class="text-white">Showing ads ({{this.startList}} - {{this.endList}})</h3>
    <div class="row p-2 justify-content-between">
      <button class="btn btn-dark text-center" v-on:click="showList()">Show all ads</button>
      <button class="btn btn-dark text-center" v-on:click="moveList(-1)">Previous 5 ads</button>
      <button class="btn btn-dark text-center" v-on:click="moveList(1)">Next 5 ads</button>
    </div>
       <b-card-group deck class="center">
          <div class="d-flex" v-for="ad in ads.slice(this.startList,this.endList)" v-bind:key="ad._id">
            <ad v-bind:ad="ad" class="col mb-1 mt-1 ml-1 mr-1"/>
          </div>
     </b-card-group>
  </b-col>
   <b-col lg="4" md="10"  sm="12" class="">
     <div class="container">
     <post-ad class="ad-form" />
   </div>
   </b-col>
   </b-row>
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

<style>

#myID {
  min-height: 100vh;
}

.center {
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 992px) {
  .ad-form{
    margin-top:1rem;
  }
}

</style>
