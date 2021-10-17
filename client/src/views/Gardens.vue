<template>
  <div class="gardens center">
    <div class="text-center text-white" v-if="gardens.length == 0">
      <p>Sorry, there are no gardens ☹️.</p>
    </div>
    <div v-if="user_id != ''">
      <div class="create-div">
        <button class="btn btn-lg btn-dark m-4 ">
          <router-link class="text-white" to="/create-a-garden">
            Create a garden
          </router-link>
        </button>
      </div>
    </div>
<b-card-group deck class="center">
    <div v-for="garden in gardens" v-bind:key="garden._id">
            <garden v-bind:garden="garden"/>
            </div>
      </b-card-group>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.gardens {
  min-height: 100vh;
  background: #b1e693;
}

@media screen and (max-width:575px) {

  .card-deck{
    padding: 1rem;
  }
  .gardens {
    align-items: flex-start;
  }
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
        if (error.message === 'Network Error') {
          this.$parent.networkErrorMessage()
        }
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
