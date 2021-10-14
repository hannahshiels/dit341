<template>
  <div>
    <b-card border-variant="dark">
      <b-card-header class="d-flex justify-content-center align-items-center border-dark">
        <div class="bg-grey d-flex flex-fill">
          <div class="bg-dark text-white flex-fill"><p>{{ garden._id }}</p></div>
        </div>
      </b-card-header>
      <b-card-body>
        <b-card-text align-h="start" class="garden-content">
          <button v-on:click="moveToGarden()">{{ garden._id }}</button>
        </b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>

import Router from '@/router'

export default {
  name: 'garden',
  props: ['garden'],
  methods: {
    moveToGarden() {
      const id = this.garden._id
      Router.push('/gardens/' + id)
    }
  }
}

</script>
