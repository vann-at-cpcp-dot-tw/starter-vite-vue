import { defineAsyncComponent } from 'vue'

const componentModules = import.meta.glob('./**/*.vue')
const components = {}
const ignoreComponentNames = ['__sample'] //填入不需要的檔名, ex: ['Index', '__sample']
const ignoreComponentPathes = ['./icons'] // 填入不需要的資料夾, ex: ['./icons']

for (const path in componentModules) {

  const name = path.split('/').pop().replace(/\.\w+$/, '')

  if( ignoreComponentPathes.findIndex((ignorePath)=>path.includes(ignorePath)) > -1 ){
    continue
  }

  if( ignoreComponentNames.includes(name) ){
    continue
  }

  components[name] = defineAsyncComponent({
      loader: componentModules[/* @vite-ignore */ `${path}`]
  })

}

export default {
  ...components,
  Icon: defineAsyncComponent(()=> import('@src/components/icons/Index.vue'))
}
