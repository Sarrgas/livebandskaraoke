import Vue from 'vue'
import Router from 'vue-router'
import QueuePage from '../views/QueuePage.vue'
import SongsPage from '../views/SongsPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'queue',
      component: QueuePage,
    },
    {
      path: '/songs',
      name: 'songs',
      component: SongsPage
    }
  ]
})
