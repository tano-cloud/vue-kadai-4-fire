import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../components/Register.vue'
import firebase from '@/firebase/firestore'

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
      firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
          next('/login');
        } else {
          next();
        }
      });
    }
  
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
