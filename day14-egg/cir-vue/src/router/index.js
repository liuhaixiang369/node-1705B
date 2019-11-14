import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component:()=>import('../views/login.vue')
  },
  {
    path: '/home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/my',
    component: () => import('../views/my.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
