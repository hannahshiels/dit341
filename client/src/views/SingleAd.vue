<template>
    <div>
      <div class="row mt-3">
        <div class="col-md-8 bg-secondary">
        <div class="bg-white border border-primary">
        <h3 class="d-flex justify-content-center">Type: {{ ad.ad_type }}</h3>
        </div>
        <h3 class="d-flex justify-content-center">Description: {{ ad.ad_description }}</h3>
        <div class="bg-white border border-primary">
        <h3 class="d-flex justify-content-center">Uploaded by: {{ ad.uploaded_by.name }}</h3>
        </div>
        <h3 class="d-flex justify-content-center">Contact number: {{ ad.ad_contact[0].number }}</h3>
        <div class="bg-white border border-primary">
        <h3 class="d-flex justify-content-center">Contact address: {{ ad.ad_contact[1].address }}</h3>
        </div>
        <h3 class="d-flex justify-content-center">Date posted: {{ ad.ad_date_posted }}</h3>
        <div class="col-md-10 align-self-center bg-dark">
        <h4 class="d-flex justify-content-center text-white">Comments:</h4>
        <h3 v-for="(comment) in complete_comments" v-bind:key="comment"
        class="d-flex text-light text-center ml-auto mr-auto">
        Date posted: {{ comment.comment_date }} <br>
        Author: {{ comment.comment_author }} <br>
        {{ comment.comment_content }}
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
      userName: '',
      ad: null,
      complete_comments: [],
      uploadedBy: ''
    }
  },
  mounted() {
    Api.get('/ads/' + this.$route.params.id)
      .then(response => {
        this.uploadedBy = response.data.ad.uploaded_by._id
        this.ad = response.data.ad
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
          console.log()
          console.log(response)
          this.fillCommentList()
        })
        .catch(error => {
          console.log(error)
        })
    },
    fillCommentList() {
      for (let i = 0; i < this.ad.comments.length; i++) {
        console.log(this.complete_comments[i])
        this.addFullComment(this.ad.comments[i]._id, i)
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
