<template>
  <div class="bg text-black-50  forms">
    <b-container >
      <b-row align-h="center">
          <b-col xl="6" md="8" class="form-container">           <create-acc-form />
 </b-col>
      </b-row>
    </b-container>
    </div>
</template>

<style scoped>
.bg {
  background: #b1e693;
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

@media screen and (max-width:575px){
      .form-container{
    display: block;
    padding-top: 2rem;
    }

}

</style>

<script>
import CreateAccForm from '../components/CreateAccForm'

export default {
  components: {
    createAccForm: CreateAccForm
  }
}
</script>
