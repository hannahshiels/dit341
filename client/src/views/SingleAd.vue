<template>
    <div>
        <h3>Ad id:</h3>
        <h3>{{ $route.params.id }}</h3>
        <h3>Type: {{ this.type }}</h3>
        <h3>Description: {{ this.description }}</h3>
        <h3>Date posted: {{ this.datePosted }}</h3>
        <h3>Uploaded by: {{ this.uploadedBy }}</h3>
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
      // contactNumber: '',
      // contactAddress: '',
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
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
