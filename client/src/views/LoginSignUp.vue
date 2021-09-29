<template>
  <div class="bg text-black-50 forms">
    <b-container>
      <b-row align-h="center">
        <b-col class="br form-container" xl="6"  sm="12">
          <create-acc-form />
        </b-col>
        <b-col class="form-container login-form-container" xl="6" md="8" sm="12">
          <login-form />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style scoped>
.bg {
  background: #B1E693;
}

.form-container {
  min-height:100vh;
}

.form-container{
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container > div {
    width: 100%;
}

@media screen and (max-width: 1199px) {

  .form-container {
    display: block;
  min-height:50vh;
  margin: 1rem 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

}

</style>

<script>
import CreateAccForm from '../components/CreateAccForm'
import LoginForm from '../components/LoginForm'

export default {
  components: {
    createAccForm: CreateAccForm,
    loginForm: LoginForm
  }
}
</script>
