import Vue from 'vue'
import Router from 'vue-router'
import SingPage from '../views/SingPage.vue'
import SongsPage from '../views/SongsPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      alias: '/sing',
      name: 'sing',
      component: SingPage
    },
    {
      path: '/songs',
      name: 'songs',
      component: SongsPage
    }
  ]
})
