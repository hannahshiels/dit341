<template>
  <div class="gardens">
    <div class="text-center text-white" v-if="gardens.length == 0">
      <p>Sorry! There are no gardens.</p>
    </div>
          <b-row class="center">
        <b-col lg="3" md="8" sm="12" v-for="garden in gardens" v-bind:key="garden._id">
          <garden v-bind:garden="garden" class="mb-1 mt-1 ml-1 mr-1"/>
        </b-col>
      </b-row>
  </div>
</template>

<style scoped>

.center {
  justify-content: center;
  align-items: center;
}

.gardens {
  min-height: 100vh;
  background: #b1e693;
}

</style>

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
        this.gardens = response.data.gardens
        console.log(this.gardens)
      })
      .catch(error => {
        this.gardens = []
        console.log(error)
      })
  },
  data() {
    return {
      gardens: [],
      user_id: this.$parent.user_id
    }
  }
}
</script>
