<template>
  <b-form class=" p-2" @submit="onSubmit">
  <b-form-group id="input-group-1" label="Content" label-for="input-1">
    <b-form-textarea
      id="content"
      v-model="form.commentContent"
      required
    ></b-form-textarea>
  </b-form-group>
  <b-button class="d-flex ml-auto mr-auto" size="lg" type="submit" variant="danger">Post Comment</b-button>
  </b-form>
</template>

<style scoped>

.bg-alpha {
  background: rgba(255,255,255,0.3) ;
}

</style>

<script>

import { Api } from '@/Api'

export default {
  data() {
    return {
      form: {
        comment_content: '',
        date_posted: new Date().toISOString().slice(0, 10)
      },
      log_user_id: this.$parent.$parent.user_id,
      ad_id: this.$parent.id
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      console.log('Hello')
      console.log(this.log_user_id)
      const comment = {
        comment_content: this.form.commentContent,
        date_posted: this.form.date_posted,
        posted_by: this.log_user_id,
        ad: this.ad_id
      }
      this.createComment(comment)
    },
    createComment(comment) {
      if (this.log_user_id === '') {
        console.log('Not logged in')
        this.notLoggedInMessage()
      } else {
        Api.post('/users/' + this.log_user_id + '/ads/' + this.ad_id + '/comments', comment)
          .then(response => {
            const status = JSON.stringify(response.status)
            if (status === '201') {
              this.createdCommentMessage()
            }
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    createdCommentMessage(append = false) {
      this.$bvToast.toast('Comment created', {
        title: 'Comment creation',
        variant: 'success',
        solid: true,
        autoHideDelay: 2000
      })
    },
    notLoggedInMessage(append = false) {
      this.$bvToast.toast('You need to be logged in to create a comment', {
        title: 'Not logged in',
        variant: 'danger',
        solid: true,
        autoHideDelay: 2000
      })
    }
  }
}
</script>
