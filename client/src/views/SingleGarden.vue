<template>
<div>
  <b-jumbotron class="mb-0 bg-green text-black-50 ">
    <router-link class="" v-if="user_id == garden.owned_by._id" :to="'/gardens/' + this.$route.params.id + '/edit' ">Edit your garden </router-link>
    <h1> {{ garden.owned_by.name }}'s  garden </h1>
    <div class="p-4">  <p> size: {{ garden.size }} m²</p> <p> soil level: {{ garden.soil_level }}</p> <p> direction: {{ garden.direction }} </p>  <p> number of plants: {{ garden.plants.length }} </p>  </div>
  </b-jumbotron>
        <div v-if="user_id == garden.owned_by._id" class="edit-div bg-brown">
        <button class="btn btn-dark m-4">
          <router-link class="text-white" :to="'/gardens/' + this.$route.params.id + '/create-a-plant'">
            Create a plant
          </router-link>
        </button>
      </div>
  <b-card-group deck>
     <div class="m-4" v-for="plant in garden.plants" v-bind:key="plant._id">
            <plant v-bind:plant="plant"/>
            </div>
          </b-card-group>

</div>
</template>

<style scoped>

.bg-green{
  background: #b1e693;
}

.bg-brown {
    background: #D57A66;
}

.card-deck {
  margin: 0;
  padding: 2rem;
  background: #D57A66;
  min-height: 70vh;
}

</style>

<script>
import { Api } from '@/Api'
import Plant from '../components/Plant.vue'

export default {
  components: {
    plant: Plant
  },
  mounted() {
    Api.get('/gardens/' + this.$route.params.id)
      .then(response => {
        console.log(response)
        this.garden = response.data.garden
      })
      .catch(error => {
        console.log(error)
      })
  },
  data() {
    return {
      garden: null,
      user_id: this.$parent.user_id
    }
  }
}
</script>
