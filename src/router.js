import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'RoomList',
      component: () => import('@/components/DrawBoard')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/Room.vue')
    }
  ]
})
