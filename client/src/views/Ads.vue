<template>
 <div id="myID" class="bg-info">
    <div class="container">
    <b-row class="pt-3">
    <b-col lg="8" md="10" sm="12" class="bg">
    <h2>Advertisements</h2>
    <h3 class="text-white">Showing ads ({{this.startList}} - {{this.endList}})</h3>
    <div class="row p-2 justify-content-between">
      <button class="btn btn-dark text-center" v-on:click="showList()">Show all ads</button>
      <button class="btn btn-dark text-center" v-on:click="moveList(-1)">Previous 5 ads</button>
      <button class="btn btn-dark text-center" v-on:click="moveList(1)">Next 5 ads</button>
    </div>
       <b-row class="p-2" align-h="center">
         <div class="text-center text-white" v-if="ads.length == 0" >  <p> Sorry, there are no ads ☹️ </p> </div>
          <b-col lg=6 md="8" sm=12 v-for="ad in ads.slice(this.startList,this.endList)" v-bind:key="ad._id">
            <ad v-bind:ad="ad" class="col m-2"/>
          </b-col>
     </b-row>
  </b-col>
   <b-col lg="4" md="10"  sm="12" class="">
     <div class="container bg">
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
        this.ads = response.data.ads
      })
      .catch(error => {
        this.ads = []
        console.log(error)
        if (error.message === 'Network Error') {
          this.$parent.networkErrorMessage()
        }
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
        this.startList = 0
        this.endList = this.ads.length
        this.allAds = true
      } else {
        this.startList = 0
        this.endList = 5
        this.allAds = false
      }
    }
  }
}
</script>

<style>

.bg {
  background: rgba(255,255,255,0.3) ;
}

#myID {
  min-height: 100vh;
}

.ad {
  width: 50%;
}

@media screen and (max-width: 992px) {
  .ad-form{
    margin-top:1rem;
  }
}

</style>
