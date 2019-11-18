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
  },
  {
    path: '/login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/newpwd',
    component: () => import('../views/newpwd.vue')
  },
  {
    path: '/person',
    component: () => import('../views/person.vue')
  },
  {
    path: '/comment',
    component: () => import('../views/comment.vue'),
    children:[
      {
        path:'/comment/mycomt',
        component: () => import('../views/mycomt.vue'),
      },
      {
        path:'/comment/outcomt',
        component: () => import('../views/outcomt.vue'),
      },
      {
        path:'/comment',
       redirect:"/comment/mycomt"
      }
    ]
  },
  {
    path: '/myLove',
    component: () => import('../views/myLove.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
