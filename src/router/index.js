import { createRouter, createWebHistory } from 'vue-router'
import HomeTest from '../views/HomeTest.vue'
import Playlist from '../views/PlaylistPage.vue'
import Favorite from '../views/FavoritePage.vue'
import AllSong from '../views/AllSong.vue'
import MyPlaylist  from '../views/MyPlaylist.vue'
import OnePlaylist  from '../views/OnePlaylist.vue'
import AccountProfile from '../views/AccountProfile.vue'
import ManageReport from '../views/ManageReport.vue'
import LogIn from '../views/LogIn.vue'

const routes = [
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
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/managereport',
    name: 'managereport',
    component: ManageReport

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
