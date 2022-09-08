import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/tailwind.css'
import './styles/icons.css'

require('@/store/subscriber')

store.dispatch('authentication/attempt',localStorage.getItem('accesstoken')).then(() =>{
    createApp(App).use(store).use(router).mount('#app')
})