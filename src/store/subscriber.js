import store from '@/store'
import axios from 'axios'

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'authentication/SET_TOKEN':
            if (mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
                localStorage.setItem('accesstoken', mutation.payload)
            } else{
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('accesstoken')
            }
    }
})