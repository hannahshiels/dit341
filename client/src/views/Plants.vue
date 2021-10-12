<template>
  <div>
    <div class="text-center text-white" v-if="plants.length == 0">
      <p>Sorry! There are no plants.</p>
    </div>
    <div class="row mt-1 ml-4 mr-3">
      <div class="bg-muted">
        <h2 class="text-center">PLANTS</h2>
        <h6 class="text-center">Click on a plant to be taken to a page full of information about that plant.</h6>
        <div class="container">
          <div class="row justify-content-between">
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Plant 1"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Plant 2"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Plant 3"></a>
            </div>
          </div>
          <div class="row justify-content-between, mt-3">
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Plant 4"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Plant 5"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Plant 6"></a>
            </div>
          </div>
          <div class="row justify-content-between, mt-3">
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Plant 7"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Plant 8"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Plant 9"></a>
            </div>
          </div>
        </div>
      </div>
      <b-card-group deck>
        <div v-for="plant in plants.slice(this.startList,this.endList)" v-bind:key="plant._id">
          <plant v-bind:plant="plant" class="mb-1 mt-1 ml-1 mr-1"/>
        </div>
      </b-card-group>
    </div>
    <div class="col-md-4">
      <post-plant/>
    </div>
  </div>
</template>

<script>

import Plant from '../components/Plant.vue'
// import Router from '@/router'
import { Api } from '@/Api'

export default {
  name: 'plants',
  components: {
    plant: Plant
  },
  mounted() {
    Api.get('/plants')
      .then(response => {
        console.log(response)
        console.log('Current user ID is ' + this.user_id)
        this.plants = response.data.plants
      })
      .catch(error => {
        this.plants = []
        console.log(error)
      })
  },
  data() {
    return {
      plants: [],
      startList: 0,
      endList: 5,
      allPlants: false,
      user_id: this.$parent.user_id
    }
  },
  methods: {
    moveList(direction) {
      if (this.allPlants === true) {
        this.showList()
      } else {
        if (direction === 1) {
          if (this.startList + 5 >= this.plants.length) {
            console.log('Reached limit')
          } else {
            this.startList += 5
            if (this.endList + 5 <= this.plants.length) {
              this.endList += 5
            } else {
              this.endList = this.plants.length
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
      if (this.allPlants === false) {
        console.log('Say hello')
        this.startList = 0
        this.endList = this.plants.length
        this.allPlants = true
      } else {
        console.log('Say goodbye')
        this.startList = 0
        this.endList = 5
        this.allPlants = false
      }
    }
  }
}
</script>
