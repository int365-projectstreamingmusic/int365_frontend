import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import HomeTest from '../views/HomeTest.vue'
import Playlist from '../views/PlaylistPage.vue'
import Favorite from '../views/FavoritePage.vue'
import AllSong from '../views/AllSong.vue'
import MyPlaylist  from '../views/MyPlaylist.vue'
import OnePlaylist  from '../views/OnePlaylist.vue'
import AccountProfile from '../views/AccountProfile.vue'

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
    path:'/accountprofile',
    name:'accountprofile',
    component: AccountProfile
  },
  {
    path: '/allsong',
    name: 'allsong',
    component: AllSong    
  },
  {
    path: '/myplaylist',
    name: 'myplaylist',
    component: MyPlaylist
  },
  {
    path: '/oneplaylist',
    name: 'onePlaylist',
    component: OnePlaylist
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
