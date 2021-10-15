<template>
  <div class="garden m-2 mb-3">
    <b-card class="mt-4 shadow"  align-h="center" border-variant="dark">
      <b-card-header class="card-head d-flex justify-content-center align-items-center border-dark">
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
