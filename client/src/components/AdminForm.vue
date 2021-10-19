<template>
  <div class="mt-4">
    <h2 class="font-weight-bold text-white">Delete User Content</h2>
    <p class="text-white-50 pb-4">As an admin, you may delete user content.</p>
    <div class="d-flex">
      <b-button
        class="text-align btn btn-lg btn-danger ml-auto mr-auto"
        @click="deleteTips"
      >
        Delete All Tips
      </b-button>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      user_id: this.$parent.$parent.user_id
    }
  },
  methods: {
    deleteTips() {
      Api.delete('/tips')
        .then(response => {
          console.log(response)
          this.successfulMsg()
        })
        .catch(error => {
          console.log(error)
          if (error.message === 'Network Error') {
            this.$parent.networkErrorMessage()
          }
        })
    },
    successfulMsg(append = false) {
      this.$bvToast.toast('Deletion of tips successful.', {
        title: 'Tips successfully deleted',
        variant: 'success',
        solid: true,
        autoHideDelay: 2000
      })
    }
  }
}
</script>
