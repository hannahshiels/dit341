import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Tips from './views/Tips.vue'
import Ad from './views/SingleAd.vue'
import Ads from './views/Ads.vue'
import Start from './views/Start.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start
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
      path: '/ads/:id',
      name: 'ad',
      component: Ad
    },
    {
      path: '/ads',
      name: 'ads',
      component: Ads
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
