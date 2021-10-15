<template>
  <div>
    <div><h2>Create a garden</h2></div>

    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Enter size of garden"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.size"
          type="number"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Enter soil level"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.soil_level"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Enter direction of garden"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.direction"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Enter image (optional) "
        label-for="input-4"
      >
        <b-form-input id="input-4" v-model="form.img_link"></b-form-input>
      </b-form-group>

      <b-button size="lg" type="submit">Create Garden</b-button>
    </b-form>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
}

.btn {
  display: flex;
  margin: 0 auto;
  border: 4px solid var(--dark);
  background: #d57a66;
}

.btn:hover {
  background: #cf664f;
}
@media screen and (max-width: 575px) {
  h2 {
    text-align: left;
  }
}
</style>

<script>
import { Api } from '@/Api'
import Router from '@/router'

export default {
  data() {
    return {
      user_id: this.$parent.$parent.user_id,
      form: {
        size: '',
        soil_level: '',
        direction: '',
        img_link: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const garden = {
        size: this.form.size,
        soil_level: this.form.soil_level,
        direction: this.form.direction,
        img_link: this.form.img_link,
        owned_by: this.user_id
      }
      this.createGarden(garden)
    },
    createGarden(garden) {
      Api.post('/gardens', garden)
        .then(response => {
          const status = JSON.stringify(response.status)
          if (status === '201') {
            Router.push('/gardens')
          }
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
