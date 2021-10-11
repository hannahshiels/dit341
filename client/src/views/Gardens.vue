<template>
<div>
  <div class="text-center text-white" v-if="ads.length == 0">
    <p>Sorry! There are no gardens.</p>
  </div>
  <div class="row mt-3">
    <div class="bg-muted">
    <h2 class="text-center">GARDENS</h2>
    <h8 class="text-center">Click on a garden to be taken to a page full of information about that garden.</h8>
      <div class="row justify-content-between">
        <b-card
          img-src="https://picsum.photos/300/300"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 50%;"
          class="mb-2"
        >
        <b-button href="#" variant="primary">Garden 1</b-button>
        </b-card>
        <b-card
          img-src="https://picsum.photos/300/300"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 50%;"
          class="mb-2"
        >
        <b-button href="#" variant="primary">Garden 2</b-button>
        </b-card>
        <b-card
          img-src="https://picsum.photos/300/300"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 50%;"
          class="mb-2"
        >
        <b-button href="#" variant="primary">Garden 3</b-button>
        </b-card>
        <b-card
          img-src="https://picsum.photos/300/300"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 50%;"
          class="mb-2"
        >
        <b-button href="#" variant="primary">Garden 4</b-button>
        </b-card>
        <b-card
          img-src="https://picsum.photos/300/300"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 50%;"
          class="mb-2"
        >
        <b-button href="#" variant="primary">Garden 5</b-button>
        </b-card>
        <b-card
          img-src="https://picsum.photos/300/300"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 50%;"
          class="mb-2"
        >
        <b-button href="#" variant="primary">Garden 6</b-button>
        </b-card>
        <b-card
          img-src="https://picsum.photos/300/300"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 50%;"
          class="mb-2"
        >
        <b-button href="#" variant="primary">Garden 7</b-button>
        </b-card>
        <b-card
          img-src="https://picsum.photos/300/300"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 50%;"
          class="mb-2"
        >
        <b-button href="#" variant="primary">Garden 8</b-button>
        </b-card>
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
</template>

<script>

import Ad from '../components/Ad.vue'
// import Router from '@/router'
import { Api } from '@/Api'

export default {
  name: 'ads',
  components: {
    ad: Ad
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

<!--
<template>
 <div>
    <div class="text-center text-white" v-if="ads.length == 0" >  <p> Sorry, there are no gardens </p> </div>
    <div class="row mt-3">
    <div class="col-md-8 bg-secondary">
    <h2>GARDENS</h2>
    <div class="row justify-content-between">
    <div class="col-4">
      <button class="d-flex justify-content-start" v-on:click="showList()">Garden 1</button>
    </div>
    <div class="col-4">
      <button class="d-flex justify-content-end" v-on:click="moveList(-1)">Garden 2</button>
    </div>
    <div class="col-4">
      <button class="d-flex justify-content-end" v-on:click="moveList(1)">Garden 3</button>
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
// import Router from '@/router'
import { Api } from '@/Api'

export default {
  name: 'ads',
  components: {
    ad: Ad
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
-->
