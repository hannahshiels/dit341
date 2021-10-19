<template>
  <div class="gray-background">
    <b-container class="p-2">
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
      <b-row class="mt-4" v-if="isAdmin" align-h="center">
        <b-col xl="6" md="8" sm="12">
          <admin-form />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>

.gray-background {
  background: #49525A;
  min-height: 100vh;
}

.row {
  margin: 0;
}

</style>

<script>
import { Api } from '@/Api'
import Router from '@/router'
import UpdateAccForm from '../components/UpdateAccForm'
import AdminForm from '../components/AdminForm'

export default {
  mounted() {
    this.getUserData()
    this.restrictAccess()
  },
  components: {
    UpdateAccForm,
    AdminForm
  },
  data() {
    return {
      user_id: this.$parent.user_id,
      user_data: null,
      isAdmin: false
    }
  },
  methods: {
    restrictAccess() {
      if (this.user_id === '') {
        Router.push('/')
      }
    },
    onClick() {
      this.deleteAccount()
      this.$parent.setAuthenticated(false)
      this.$parent.setID('')
      Router.push('/')
    },
    getUserData() {
      Api.get('users/' + this.user_id)
        .then(response => {
          console.log(response)
          this.user_data = response.data
          if (this.user_data.role === 'admin') {
            this.isAdmin = true
          }
        })
        .catch(error => {
          console.log(error)
          if (error.message === 'Network Error') {
            this.$parent.networkErrorMessage()
          }
        })
    },
    deleteAccount() {
      Api.delete('users/' + this.user_id)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          if (error.message === 'Network Error') {
            this.$parent.networkErrorMessage()
          }
        })
    }
  }
}
</script>
