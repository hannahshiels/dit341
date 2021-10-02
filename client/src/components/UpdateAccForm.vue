<template>
  <div>
    <h2>Update Account Information</h2>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-1" label="Email" label-for="input-1">
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
      <b-button type="submit" class="btn-lg" variant="primary">Update</b-button>
    </b-form>

  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      user_id: this.$parent.$parent.user_id,
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
      Api.put('users/' + this.user_id, this.form)
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
