import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomeTest from '../views/HomeTest.vue'
import Playlist from '../views/PlaylistPage.vue'
import Favorite from '../views/FavoritePage.vue'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/',
    name: 'hometest',
    component: HomeTest
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: Playlist
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
