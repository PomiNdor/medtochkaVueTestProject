import Vue from 'vue'
import VueRouter from 'vue-router'
import CatalogView from '../views/CatalogView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: CatalogView
  },
  {
    path: '/favorites',
    name: 'favorites',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/FavoritesView.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
