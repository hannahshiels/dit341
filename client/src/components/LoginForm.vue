<template>
  <div>
    <div class="mb-auto"> <h2> Login </h2> </div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Enter email"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Enter password" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button size="lg" type="submit" variant="danger">Login</b-button>
      <div class="mt-2 text-center text-danger" v-if="loginFailed"> <p>Login failed. Check your info.</p>  </div>
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
        password: ''
      },
      show: true,
      loginFailed: false
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const user = {
        email: this.form.email,
        password: this.form.password
      }
      this.login(user)
    },
    login(user) {
      Api.post('/login', user)
        .then(response => {
          console.log(response)
          const status = JSON.stringify(response.status)
          if (status === '200') {
            Router.push('/')
          }
        })
        .catch(error => {
          console.log(error)
          this.loginFailed = true
        })
    }
  }
}
</script>

<style scoped>
.btn {
  display: flex;
  margin: 0 auto;
  border: 4px solid var(--dark);
}
h2  {
  text-align: center;
}

 .mb-auto{
   margin-bottom: auto;
 }

 @media screen and (max-width:575px){
  h2{
    text-align: left;
    }
}

</style>
