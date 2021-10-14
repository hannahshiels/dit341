<template>
    <div>
      <div class="row mt-3">
        <div class="col-md-8 bg-secondary">
        <div class="bg-white border border-primary">
        <h3 class="d-flex justify-content-center">Type: {{ this.type }}</h3>
        </div>
        <h3 class="d-flex justify-content-center">Description: {{ this.description }}</h3>
        <div class="bg-white border border-primary">
        <h3 class="d-flex justify-content-center">Uploaded by: <br> {{ this.userName }}</h3>
        </div>
        <h3 class="d-flex justify-content-center">Contact number: {{ this.contactNumber }}</h3>
        <div class="bg-white border border-primary">
        <h3 class="d-flex justify-content-center">Contact address: {{ this.contactAddress }}</h3>
        </div>
        <h3 class="d-flex justify-content-center">Date posted: {{ this.datePosted }}</h3>
        <div class="col-md-10 align-self-center bg-dark">
        <h4 class="d-flex justify-content-center text-white">Comments:</h4>
        <h3 v-for="(comment, index) in complete_comments" v-bind:key="comment"
        class="d-flex text-light"><br>{{ index + 1 }}: <br>
        Content: {{ comment.comment_content }} <br>
        Date posted: {{ comment.comment_date }} <br>
        Author: {{ comment.comment_author }}
        </h3>
        </div>
        </div>
        <div class="col-md-4 bg-dark">
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
      complete_comments: [],
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
          this.fillCommentList()
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
    },
    fillCommentList() {
      for (let i = 0; i < this.comments.length; i++) {
        console.log(this.complete_comments[i])
        this.addFullComment(this.comments[i], i)
      }
    },
    addFullComment(commentID, i) {
      Api.get('/users/' + this.uploadedBy + '/ads/' + this.id + '/comments/' + commentID)
        .then(response => {
          const currentComment = {
            comment_content: response.data.comment_content,
            comment_date: response.data.date_posted,
            comment_author: response.data.posted_by
          }
          this.complete_comments.push(currentComment)
          this.getUserName(currentComment.comment_author, i)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getUserName(userID, index) {
      Api.get('/users/' + userID)
        .then(response => {
          const userName = response.data.name
          this.complete_comments[index].comment_author = userName
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
