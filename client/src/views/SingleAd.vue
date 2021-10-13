<template>
    <div>
      <div class="row mt-3">
        <div class="col-md-8 bg-secondary">
        <h3 class="d-flex justify-content-center">Ad id:</h3>
        <h3 class="d-flex justify-content-center">{{ $route.params.id }}</h3>
        <h3 class="d-flex justify-content-center">Type: {{ this.type }}</h3>
        <h3 class="d-flex justify-content-center">Description: {{ this.description }}</h3>
        <h3 class="d-flex justify-content-center">Date posted: {{ this.datePosted }}</h3>
        <h3 class="d-flex justify-content-center">Uploaded by: {{ this.uploadedBy }}</h3>
        <h3 class="d-flex justify-content-center">User name: {{ this.userName}}</h3>
        <h3 class="d-flex justify-content-center">Contact number: {{ this.contactNumber }}</h3>
        <h3 class="d-flex justify-content-center">Contact address: {{ this.contactAddress }}</h3>
        <h3 class="d-flex justify-content-center">Comments:</h3>
        <h3 v-for="comment in comments" v-bind:key="comment"
        class="d-flex justify-content-center">{{ comment }}
        </h3>
        </div>
        <div class="col-md-4 bg-secondary">
          <post-comment/>
        </div>
      </div>
      </div>
</template>

<script>
import { Api } from '@/Api'
import PostComment from '../components/PostComment.vue'

export default {
  components: { PostComment },
  data() {
    return {
      id: this.$route.params.id,
      userName: 'Generic',
      type: 'Generic',
      description: 'Generic',
      contactNumber: 'Generic',
      contactAddress: 'Generic',
      datePosted: 'Generic',
      comments: [],
      uploadedBy: 'Generic'
    }
  },
  mounted() {
    Api.get('/ads/' + this.id)
      .then(response => {
        this.uploadedBy = response.data.uploaded_by
        this.getAdInfo()
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    getAdInfo() {
      Api.get('/users/' + this.uploadedBy + '/ads/' + this.id)
        .then(response => {
          this.type = response.data.ad_type
          this.description = response.data.ad_description
          this.datePosted = response.data.ad_date_posted
          this.uploadedBy = response.data.uploaded_by
          this.contactNumber = response.data.ad_contact[0].number
          this.contactAddress = response.data.ad_contact[0].address
          this.comments = response.data.comments
          this.getUserInfo()
        })
        .catch(error => {
          console.log(error)
        })
    },
    getUserInfo() {
      Api.get('/users/' + this.uploadedBy)
        .then(response => {
          this.userName = response.data.name
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
