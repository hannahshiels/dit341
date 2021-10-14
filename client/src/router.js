import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Tips from './views/Tips.vue'
import Ad from './views/SingleAd.vue'
import Ads from './views/Ads.vue'
import Start from './views/Start.vue'
import Settings from './views/Settings.vue'
import Gardens from './views/Gardens.vue'
import Plants from './views/Plants.vue'
import Garden from './views/SingleGarden.vue'
import Plant from './views/SinglePlant.vue'
import CreateGarden from './views/CreateGarden.vue'
import EditGarden from './views/EditGarden.vue'

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
    },
    {
      path: '/gardens',
      name: 'gardens',
      component: Gardens
    },
    {
      path: '/gardens/:id',
      name: 'garden',
      component: Garden
    },
    {
      path: '/gardens/:gardenID/plants',
      name: 'plants',
      component: Plants
    },
    {
      path: '/gardens/:gardenID/plants/:plantID',
      name: 'plant',
      component: Plant
    },
    {
      path: '/create-a-garden',
      name: 'createGarden',
      component: CreateGarden
    },
    {
      path: '/gardens/:id/edit',
      name: 'editGarden',
      component: EditGarden
    }
  ]
})
