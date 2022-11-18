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
import AddMusic from '../views/AddMusic.vue'

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
    path: '/oneplaylist/:id',
    name: 'onePlaylist',
    component: OnePlaylist,
    props:true
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
  },
  {
    path: '/addmusic',
    name: 'addmusic',
    component: AddMusic
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
