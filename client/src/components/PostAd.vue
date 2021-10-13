<template>
  <b-form class="bg-secondary" @submit="onSubmit">
    <div class="row justify-content-md-center">
  <b-form-group class="col-md-6" id="input-group-1" label="Description" label-for="input-1">
    <b-form-input
      id="description"
      type="text"
      v-model="form.description"
      required
    ></b-form-input>
  </b-form-group>
  </div>
  <div class="row justify-content-md-center">
  <b-form-group class="col-md-6" id="input-group-2" label="Type" label-for="input-2">
    <b-form-input
      id="type"
      type="text"
      v-model="form.type"
      required
    ></b-form-input>
  </b-form-group>
  </div>
  <div class="row justify-content-md-center">
  <b-form-group class="col-md-6" id="input-group-3" label="Contact Number" label-for="input-3">
    <b-form-input
      id="contactNumber"
      type="text"
      v-model="form.contactNumber"
      required
    ></b-form-input>
  </b-form-group>
  </div>
  <div class="row justify-content-md-center">
  <b-form-group class="col-md-6" id="input-group-4" label="Contact Address" label-for="input-4">
    <b-form-input
      id="contactAddress"
      type="text"
      v-model="form.contactAddress"
      required
    ></b-form-input>
  </b-form-group>
  </div>
  <div class="row justify-content-md-center">
  <b-form-group class="col-md-6" id="input-group-5" label="Date Posted" label-for="input-5">
    <b-form-input
      id="datePosted"
      type="text"
      v-model="form.datePosted"
      required
    ></b-form-input>
  </b-form-group>
  </div>
  <div class="row justify-content-md-center">
  <b-button size="lg" type="submit" variant="danger">Post Ad</b-button>
  </div>
  </b-form>

</template>

<script>

import { Api } from '@/Api'

export default {
  data() {
    return {
      form: {
        ad_description: '',
        ad_type: '',
        contactNumber: '',
        contactAddress: '',
        ad_date_posted: ''
      },
      log_user_id: this.$parent.user_id
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const ad = {
        ad_description: this.form.description,
        ad_type: this.form.type,
        ad_contact: {
          number: this.form.contactNumber,
          address: this.form.contactAddress
        },
        ad_date_posted: this.form.datePosted,
        uploaded_by: this.log_user_id
      }
      this.createAd(ad)
    },
    createAd(ad) {
      if (this.log_user_id === '') {
        console.log('Not logged in')
        this.notLoggedInMessage()
      } else {
        Api.post('/users/' + this.log_user_id + '/ads', ad)
          .then(response => {
            const status = JSON.stringify(response.status)
            if (status === '201') {
              this.createdAdMessage()
            }
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    createdAdMessage(append = false) {
      this.$bvToast.toast('Ad created', {
        title: 'Ad creation',
        variant: 'success',
        solid: true,
        autoHideDelay: 2000
      })
    },
    notLoggedInMessage(append = false) {
      this.$bvToast.toast('You need to be logged in to create an ad', {
        title: 'Not logged in',
        variant: 'danger',
        solid: true,
        autoHideDelay: 2000
      })
    }
  }
}
</script>
