import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import introduce from "@/views/introduce.vue";
import AboutView from "@/views/AboutView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: introduce
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/smart',
    name: 'smart',
    component: () => import('../views/demo')
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: () => import('../views/introduce')
  },
  {
    path: '/analyse',
    name: 'analyse',
    component: () => import('../views/analyse')
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('../views/tools')
  },
  {
    path: '/repair',
    name: 'repair',
    component: () => import('../views/repair')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
