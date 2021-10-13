<template>
<div class="tips">
    <div class="text-center text-white" v-if="tips.length == 0" >  <p> Sorry, there are no tips ☹️ </p> </div>
  <b-card-group deck class="center">
    <div v-for="tip in tips" v-bind:key="tip._id">
            <tip v-bind:tip="tip"/>
            </div>
      </b-card-group>
</div>
</template>

<script>
// @ is an alias to /src
import Tip from '../components/Tip.vue'
import { Api } from '@/Api'

export default {
  name: 'tips',
  components: {
    tip: Tip
  },
  mounted() {
    Api.get('/tips')
      .then(response => {
        console.log(response)
        this.tips = response.data.tips
      })
      .catch(error => {
        this.tips = []
        console.log(error)
      })
  },
  data() {
    return {
      tips: []
    }
  }
}

</script>

<style scoped>
.tips {
  min-height: 100vh;
  background: #b1e693;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center {
  justify-content: center;
  align-items: center;
}

.card-deck {
  margin-left: 0;
  margin-right:0 ;
}

@media screen and (max-width:575px) {

  .card-deck{
    padding: 1rem 0;
  }
}

</style>
