import { createApp } from 'vue'
import store from '@src/store/index'
import { router } from '@src/routes'
import { VueQueryPlugin } from 'vue-query'

import App from './App.vue'
import '@src/styles/main.sass'
import '@src/styles/tailwind.css'

import components from '@src/components'
import * as methods from '@src/helpers'

createApp(App)
.mixin({
    data(){
        return {
            window,
        }
    },
    components,
    methods
})
.use(store)
.use(router)
.use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    },
})
.directive('focus', {
    mounted(el, isFocus) {
        if( isFocus.value !== false ){
            el.focus()
        }
    }
})
.mount('#app')