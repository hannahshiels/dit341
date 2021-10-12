<template>
  <div>
    <div class="text-center text-white" v-if="gardens.length == 0">
      <p>Sorry! There are no gardens.</p>
    </div>
    <div class="row mt-1 ml-4 mr-3">
      <div class="bg-muted">
        <h2 class="text-center">GARDENS</h2>
        <h6 class="text-center">Click on a garden to be taken to a page full of information about that garden.</h6>
        <div class="container">
          <div class="row justify-content-between">
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Garden 1"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Garden 2"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Garden 3"></a>
            </div>
          </div>
          <div class="row justify-content-between, mt-3">
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Garden 4"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Garden 5"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Garden 6"></a>
            </div>
          </div>
          <div class="row justify-content-between, mt-3">
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Garden 7"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Garden 8"></a>
            </div>
            <div class="col">
              <a href="#"><img src="https://picsum.photos/300/300" alt="Garden 9"></a>
            </div>
          </div>
        </div>
      </div>
      <b-card-group deck>
        <div v-for="garden in gardens.slice(this.startList,this.endList)" v-bind:key="garden._id">
          <garden v-bind:garden="garden" class="mb-1 mt-1 ml-1 mr-1"/>
        </div>
      </b-card-group>
    </div>
    <div class="col-md-4">
      <post-garden/>
    </div>
  </div>
</template>

<script>

import Garden from '../components/Garden.vue'
// import Router from '@/router'
import { Api } from '@/Api'

export default {
  name: 'gardens',
  components: {
    garden: Garden
  },
  mounted() {
    Api.get('/gardens')
      .then(response => {
        console.log(response)
        console.log('Current user ID is ' + this.user_id)
        this.gardens = response.data.gardens
      })
      .catch(error => {
        this.gardens = []
        console.log(error)
      })
  },
  data() {
    return {
      gardens: [],
      startList: 0,
      endList: 5,
      allGardens: false,
      user_id: this.$parent.user_id
    }
  },
  methods: {
    moveList(direction) {
      if (this.allGardens === true) {
        this.showList()
      } else {
        if (direction === 1) {
          if (this.startList + 5 >= this.gardens.length) {
            console.log('Reached limit')
          } else {
            this.startList += 5
            if (this.endList + 5 <= this.gardens.length) {
              this.endList += 5
            } else {
              this.endList = this.gardens.length
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
      if (this.allGardens === false) {
        console.log('Say hello')
        this.startList = 0
        this.endList = this.gardens.length
        this.allGardens = true
      } else {
        console.log('Say goodbye')
        this.startList = 0
        this.endList = 5
        this.allGardens = false
      }
    }
  }
}
</script>
