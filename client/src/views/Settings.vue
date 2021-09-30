<template>
  <div>
    <b-container class="text-black-50 p-2">
      <b-row align-h="center">
        <b-col xl="6" md="8" sm="12">
          <update-acc-form />
        </b-col>
      </b-row>
      <b-row class="mt-5" align-h="center">
        <b-col class="text-center"  xl="6" md="8" sm="12">
          <b-button @click="onClick" class="btn-lg btn-danger"> Delete Account </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped></style>

<script>
import { Api } from '@/Api'
import Router from '@/router'
import UpdateAccForm from '../components/UpdateAccForm'

export default {
  components: {
    UpdateAccForm
  },
  data() {
    return {
      user_id: this.$parent.user_id
    }
  },
  methods: {
    onClick() {
      this.deleteAccount()
      this.$parent.setAuthenticated(false)
      this.$parent.setID('')
      Router.push('/')
    },
    deleteAccount() {
      Api.delete('users/' + this.user_id)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
