import { createApp } from 'vue'
import store from '@src/store/index'
import { router } from '@src/routes'
import { VueQueryPlugin } from 'vue-query'

import App from './App.vue'
import '@src/styles/main.sass'
import '@src/styles/tailwind.css'

import components from '@src/components'
import * as methods from '@src/helpers'

// 新增物件原型 replaceAll 方法 (支援舊手機)
if (!String.prototype.replaceAll){
  String.prototype.replaceAll = function(str, newStr){

    function escapeRegExp(string){
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }

    return this.replace(new RegExp(escapeRegExp(str), 'g'), newStr)
  }
}

// https://vitejs.dev/config/#build-polyfillmodulepreload
// using workaround https://github.com/vitejs/vite/issues/4786
if (import.meta.env.MODE !== 'development'){
  import('vite/modulepreload-polyfill')
}

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
  mounted(el, isFocus){
    if( isFocus.value !== false ){
      el.focus()
    }
  }
})
.mount('#app')