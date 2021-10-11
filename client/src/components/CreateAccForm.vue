<template>
  <div>

    <div> <h2> Create an account </h2> </div>

    <b-form @submit="onSubmit">

      <b-form-group id="input-group-1" label="Enter email" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

        <b-form-group id="input-group-2" label="Enter name" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Enter password" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.password"
          required
        ></b-form-input>
      </b-form-group>

    <b-form-group id="input-group-4" label="Confirm password" label-for="input-4">
        <b-form-input
          id="input-4"
          type="password"
          v-model="form.passwordConfirm"
          required
        ></b-form-input>
         <b-form-invalid-feedback :state="validation">
        Passwords must match.
      </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-5">
         <b-form-checkbox v-model="form.admin" id="admin" value="admin">Admin</b-form-checkbox>
      </b-form-group>

      <b-button size="lg" type="submit" >Create Account</b-button>
      <div v-if="createAccFailed" class="text-danger mt-4 text-center"> <p> Account creation failed. </p> </div>
    </b-form>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Router from '@/router'

export default {

  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        passwordConfirm: '',
        admin: ''
      },
      createAccFailed: false
    }
  },
  computed: {
    validation() {
      return this.form.password === this.form.passwordConfirm
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      if (this.form.password === this.form.passwordConfirm) {
        const user = {
          email: this.form.email,
          name: this.form.name,
          password: this.form.password,
          role: this.form.admin
        }
        this.createAccount(user)
      }
    },
    createAccount(user) {
      Api.post('/users', user)
        .then(response => {
          const status = JSON.stringify(response.status)
          if (status === '201') {
            Router.push('/login')
          }
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          this.createAccFailed = true
        })
    }
  }
}
</script>

<style scoped>

h2 {
  text-align: center;
}

.btn {
  display: flex;
  margin: 0 auto;
  border: 4px solid var(--dark);
  background: #D57A66;
}

.btn:hover {
    background: #CF664F;
}
@media screen and (max-width:575px){
  h2{
    text-align: left;
    }
}

</style>
