<script>
import { defineAsyncComponent } from "vue"

// 以 file system 自動引入
const componentModules = import.meta.glob('./*.vue')
const components = {}
const ignoreComponentNames = ['__sample', 'Index']

for (const path in componentModules) {

  const name = path.split('/').pop().replace(/\.\w+$/, '')

  if( !ignoreComponentNames.includes(name) ){
    components[name] = defineAsyncComponent({
        loader: componentModules[/* @vite-ignore */ `${path}`]
    })
  }

}

export default {
    props: {
        type: {
            type: String,
        },
    },
    components,
}
</script>
<template>
    <component :is="type"></component>
</template>
