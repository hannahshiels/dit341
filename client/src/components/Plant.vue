<template>
  <div class="plant">
    <b-card class="mt-4 shadow" border-variant="dark">
      <div>
        <div class="">
          <div class="mt-2 text-center text-black-50 flex-fill pt-3"><p>{{ plant.plant_name }}</p></div>
        </div>
      </div>
      <b-card-body class=" d-flex justify-content-center align-items-center ">
        <b-card-text align-h="start" class="plant-content">
          <p> {{ plant.description }} </p>
          <button class="btn bg-green"> <router-link class="text-black-50" :to="'/gardens/' + this.$route.params.id + '/plants/' + plant._id "> View plant </router-link></button>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<style scoped>

.bg-green{
  background: #b1e693;
}

</style>

<script>

export default {
  name: 'plant',
  props: ['plant']
}

</script>
