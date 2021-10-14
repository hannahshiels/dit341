<template>
  <div class="garden mb-3">
    <b-card class="mt-4 shadow"  align-h="center" border-variant="dark">
      <b-card-header class="card-head d-flex justify-content-center align-items-center border-dark">
      </b-card-header>
      <b-card-body class=" d-flex justify-content-center align-items-center ">
        <b-card-text class="garden-content ">
          <button class="btn btn-green"> <router-link class="secondary-link text-black-50"  :to="'/gardens/' + garden._id"> {{ garden.owned_by.name }}'s Garden  </router-link> </button>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<style scoped>

.btn-green{
  background: #b1e693;
}

.card-head {
  background: #D57A66;
  height: 150px;
}

.garden .card-body {
  padding: 0;
}

.card.garden {
  text-align: center;
  margin: 15px;
  border-width: 2px;
}

.garden .card-text {
  padding: 1rem;
}

</style>

<script>

export default {
  name: 'garden',
  props: ['garden']
}

</script>
