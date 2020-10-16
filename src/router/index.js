import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Register from '../components/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
  },
  {
    path: '/dashBoard',
    name: 'DashBoard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/DashBoard.vue'),
    beforeEnter(to, from, next){
      store.dispatch('redirectToLogin', next)
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
