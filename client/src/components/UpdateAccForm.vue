<template>
  <div>
    <h2 class="text-white font-weight-bold mt-4">Settings</h2>
    <p class="text-white-50 pb-4"> You can update your account information, or alternatively delete your account. </p>
    <b-form class="text-white" @submit="onSubmit">
      <b-form-group id="input-group-1"  label="Email" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Name" label-for="input-2">
        <b-form-input id="input-2" v-model="form.name" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Contact number">
        <b-form-input id="input-4" v-model="form.contact_number"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Address">
        <b-form-input id="input-5" v-model="form.address"></b-form-input>
      </b-form-group>
      <b-button type="submit" class="ml-auto btn-lg btn-dark">Update</b-button>
    </b-form>

  </div>
</template>

<style scoped>
.btn {
  display: flex;
  border: 4px solid var(--dark);
  background: #D57A66;
}
</style>

<script>
import { Api } from '@/Api'

export default {
  mounted() {
    this.getUserData()
  },
  data() {
    return {
      user_id: this.$parent.$parent.user_id,
      user_data: null,
      form: {
        email: '',
        name: '',
        password: '',
        role: '',
        dob: '',
        address: '',
        contact_number: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.updateAccountInformation()
    },
    updateAccountInformation() {
      this.form.role = this.user_data_role
      Api.put('users/' + this.user_id, this.form)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getUserData() {
      Api.get('users/' + this.user_id)
        .then(response => {
          console.log(response)
          this.user_data = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
