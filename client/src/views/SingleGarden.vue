<template>
<div>
  <b-jumbotron>
    <h1> {{ garden.owned_by.name }}'s  garden </h1>
    <div class="p-4">  <p> size: {{ garden.size }}</p> <p> soil level: {{ garden.soil_level }}</p> <p> direction: {{ garden.direction }} </p>  <p> number of plants: {{ garden.plants.length }} </p>  </div>
  </b-jumbotron>
  <b-card-group deck>
     <div v-for="plant in garden.plants" v-bind:key="plant._id">
            <plant v-bind:plant="plant"/>
            </div>
          </b-card-group>

</div>
</template>

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
      garden: null
    }
  }
}
</script>
