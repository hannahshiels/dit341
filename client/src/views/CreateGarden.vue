<template>
  <div class="bg text-black-50 forms">
    <b-container>
      <b-row align-h="center">
        <b-col class="form-container" xl="6" md="8" sm="12">
          <create-garden-form />
        </b-col>
      </b-row>
    </b-container>
</div>

</template>

<script>
import CreateGardenForm from '../components/CreateGardenForm.vue'
import Router from '@/router'

export default {
  data() {
    return {
      user_id: this.$parent.user_id
    }
  },
  components: {
    CreateGardenForm
  },
  mounted() {
    this.restrictAccess()
  },
  methods: {
    restrictAccess() {
      if (this.user_id === '') {
        Router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.bg {
  background: #b1e693;
}

.form-container {
  min-height:100vh;
}

.form-container{
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container > div {
    width: 100%;
}

@media screen and (max-width:575px){
      .form-container{
    display: block;
    padding-top: 2rem;
    }

}

</style>
