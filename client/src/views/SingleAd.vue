<template>
    <div>
        <h3 class="d-flex justify-content-center">Ad id:</h3>
        <h3 class="d-flex justify-content-center">{{ $route.params.id }}</h3>
        <h3 class="d-flex justify-content-center">Type: {{ this.type }}</h3>
        <h3 class="d-flex justify-content-center">Description: {{ this.description }}</h3>
        <h3 class="d-flex justify-content-center">Date posted: {{ this.datePosted }}</h3>
        <h3 class="d-flex justify-content-center">Uploaded by: {{ this.uploadedBy }}</h3>
        <h3 class="d-flex justify-content-center">Contact number: {{ this.contactNumber }}</h3>
        <h3 class="d-flex justify-content-center">Contact address: {{ this.contactAddress }}</h3>
      </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      id: this.$route.params.id,
      type: 'Generic',
      description: 'Generic',
      contactNumber: 'Generic',
      contactAddress: 'Generic',
      datePosted: 'Generic',
      uploadedBy: 'Generic'
    }
  },
  mounted() {
    Api.get('/users/6159e42b86f6ad3ed2cf3811/ads/' + this.id)
      .then(response => {
        console.log(response)
        this.type = response.data.ad_type
        this.description = response.data.ad_description
        this.datePosted = response.data.ad_date_posted
        this.uploadedBy = response.data.uploaded_by
        this.contactNumber = response.data.ad_contact[0].number
        this.contactAddress = response.data.ad_contact[1].address
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
