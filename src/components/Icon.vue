<script>
import { defineAsyncComponent } from "vue"

// 以 file system 自動引入
const componentModules = import.meta.glob('./__icons/*.{vue,jsx}')
const components = {}

for (const path in componentModules) {
    const name = path.split('/').pop().replace(/\.\w+$/, '')
    components[name] = defineAsyncComponent({
        loader: componentModules[/* @vite-ignore */ `${path}`]
    })
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
