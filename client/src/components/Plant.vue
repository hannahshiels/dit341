<template>
  <div>
    <b-card border-variant="dark">
      <b-card-header class="d-flex justify-content-center align-items-center border-dark">
        <div class="bg-grey d-flex flex-fill">
          <div class="bg-dark text-white flex-fill"><p>{{ plant._id }}</p></div>
        </div>
      </b-card-header>
      <b-card-body>
        <b-card-text align-h="start" class="plant-content">
          <button v-on:click="moveToPlant()">{{ plant._id }}</button>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>

import Router from '@/router'

export default {
  name: 'plant',
  props: ['plant'],
  methods: {
    moveToPlant() {
      const id = this.plant._id
      Router.push('/plants/' + id)
    }
  }
}

</script>
