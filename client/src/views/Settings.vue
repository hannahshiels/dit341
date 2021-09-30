<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <p>{{ user_data.name }}</p>
      </b-row>
      <b-row align-h="center">
        <p>{{ user_data.email }}</p>
      </b-row>
      <b-row align-h="center">
        <p>{{ user_data.password }}</p>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  mounted() {
    Api.get('/users/' + this.parentData)
      .then(response => {
        console.log(response)
        this.user_data = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  data() {
    return {
      parentData: this.$parent.user_id,
      user_data: {}
    }
  }
}
</script>
