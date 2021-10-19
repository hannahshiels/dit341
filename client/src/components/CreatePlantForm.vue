<template>
  <div>
    <div><h2>Create a plant</h2></div>

    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Enter plant name"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.plant_name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Enter plant image link"
        label-for="input-2"
      >
        <b-form-input id="input-2" v-model="form.img"></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Enter plant description"
        label-for="input-3"
      >
        <b-form-textarea
          id="input-3"
          v-model="form.description"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group label="Water schedule:">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="form.water_schedule"
        >
          <b-form-checkbox value="Monday">Monday</b-form-checkbox>
          <b-form-checkbox value="Tuesday">Tuesday</b-form-checkbox>
          <b-form-checkbox value="Wednesday">Wednesday</b-form-checkbox>
          <b-form-checkbox value="Thursday">Thursday</b-form-checkbox>
          <b-form-checkbox value="Friday">Friday</b-form-checkbox>
          <b-form-checkbox value="Saturday">Saturday</b-form-checkbox>
          <b-form-checkbox value="Sunday">Sunday</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-form-group label="Fertilizer schedule:">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="form.fertilizer_schedule"
        >
          <b-form-checkbox value="Monday">Monday</b-form-checkbox>
          <b-form-checkbox value="Tuesday">Tuesday</b-form-checkbox>
          <b-form-checkbox value="Wednesday">Wednesday</b-form-checkbox>
          <b-form-checkbox value="Thursday">Thursday</b-form-checkbox>
          <b-form-checkbox value="Friday">Friday</b-form-checkbox>
          <b-form-checkbox value="Saturday">Saturday</b-form-checkbox>
          <b-form-checkbox value="Sunday">Sunday</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button size="lg" type="submit">Create Plant</b-button>
      <div v-if="err" class="text-danger mt-4 text-center">
        <p>Plant creation failed.</p>
      </div>
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
        plant_name: '',
        img: '',
        description: '',
        water_schedule: [],
        fertilizer_schedule: []
      },
      user_id: this.$parent.$parent.user_id,
      err: false
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const plant = {
        plant_name: this.form.plant_name,
        plant_description: [
          { img: this.form.img },
          { description: this.form.description }
        ],
        water_schedule: this.form.water_schedule,
        fertilizer_schedule: this.form.fertilizer_schedule,
        owned_by: this.user_id,
        garden: this.$route.params.id
      }
      this.createPlant(plant)
    },
    createPlant(plant) {
      Api.post('/gardens/' + this.$route.params.id + '/plants', plant)
        .then(response => {
          const status = JSON.stringify(response.status)
          if (status === '201') {
            Router.push('/gardens/' + this.$route.params.id)
          }
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          this.err = true
          if (error.message === 'Network Error') {
            this.$parent.$parent.networkErrorMessage()
          }
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
