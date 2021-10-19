<template>
  <div class="bg-info text-black-50 single-ad">
    <div class="row d-flex justify-content-center pt-4">
      <div class="col-md-8 bg-alpha p-0 m-2">
        <div class="bg-alpha  ">
          <h3 class="d-flex justify-content-center ">Type: {{ ad.ad_type }}</h3>
        </div>
        <h3 class="d-flex justify-content-center">
          Description: {{ ad.ad_description }}
        </h3>
        <div class="bg-alpha ">
          <h3 class="d-flex justify-content-center">
            Uploaded by: {{ ad.uploaded_by.name }}
          </h3>
        </div>
        <h3 class="d-flex justify-content-center">
          Contact number: {{ ad.ad_contact[0].number }}
        </h3>
        <div class="bg-alpha">
          <h3 class="d-flex justify-content-center">
            Contact address: {{ ad.ad_contact[1].address }}
          </h3>
        </div>
        <h3 class="d-flex justify-content-center">
          Date posted: {{ ad.ad_date_posted }}
        </h3>
        <div class="bg-alpha p-2">
          <h4 class="d-flex justify-content-center text-white">Comments:</h4>
          <h3
            v-for="comment in complete_comments"
            v-bind:key="comment"
            class="d-flex justify-content-center p-2 text-light text-center ml-auto mr-auto border-bottom border-gray"
          >
            Date posted: {{ comment.comment_date }} <br />
            Author: {{ comment.comment_author }} <br />
            {{ comment.comment_content }}
          </h3>
        </div>
      </div>
      <div class="col-md-3 m-2 bg-alpha">
        <post-comment />
      </div>
    </div>
  </div>
</template>

<style scoped>
.single-ad {
  min-height: 100vh;
}

.bg-alpha {
  background: rgba(255, 255, 255, 0.3);
}

.row {
  margin: 0;
}
</style>

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
        if (error.message === 'Network Error') {
          this.$parent.networkErrorMessage()
        }
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
          if (error.message === 'Network Error') {
            this.$parent.networkErrorMessage()
          }
        })
    },
    fillCommentList() {
      for (let i = 0; i < this.ad.comments.length; i++) {
        console.log(this.complete_comments[i])
        this.addFullComment(this.ad.comments[i]._id, i)
      }
    },
    addFullComment(commentID, i) {
      Api.get(
        '/users/' +
          this.uploadedBy +
          '/ads/' +
          this.id +
          '/comments/' +
          commentID
      )
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
          if (error.message === 'Network Error') {
            this.$parent.networkErrorMessage()
          }
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
          this.complete_comments[index].comment_author = 'Deleted user'
          if (error.message === 'Network Error') {
            this.$parent.networkErrorMessage()
          }
        })
    }
  }
}
</script>
