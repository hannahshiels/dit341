import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Tips from './views/Tips.vue'
import Ads from './views/Ads.vue'
import Start from './views/Start.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tips',
      name: 'tips',
      component: Tips
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/ads',
      name: 'ads',
      component: Ads
    },
    {
      path: '/start',
      name: 'start',
      component: Start
    }
  ]
})
