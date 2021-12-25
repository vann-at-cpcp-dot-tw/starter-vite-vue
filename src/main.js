import { createApp } from 'vue'
import store from '@src/store/index'
import { router } from '@src/routes'

import App from './App.vue'
import '@src/styles/main.sass'
import '@src/styles/tailwind.css'

createApp(App)
.use(store)
.use(router)
.directive('focus', {
    mounted(el, isFocus) {
        if( isFocus.value !== false ){
            el.focus()
        }
    }
})
.mount('#app')

window.store = store