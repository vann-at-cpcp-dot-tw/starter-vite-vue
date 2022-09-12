import { defineAsyncComponent } from 'vue'

// 以 file system 自動引入
const componentModules = import.meta.glob('./**/*.{vue,jsx}')
const components = {}


for (const path in componentModules){

  // icons 是在 Icon.vue 裡面用 component:is 的方式引入，故跳過
  if( path.includes('./__icons') ){
    continue
  }

  let componentName = path.replaceAll('./', '').replaceAll('.vue', '').replaceAll('.jsx', '').replaceAll('/', '')

  components[componentName] = defineAsyncComponent({
    loader: componentModules[/* @vite-ignore */ `${path}`]
  })
}


export default components
