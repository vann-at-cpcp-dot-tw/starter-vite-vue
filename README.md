# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)


## Vue 開啟 HTML-template 模式的方法：
HTML-template 通常用在與「不是自己切版 & 對方提供靜態切版」的合作情境上，如非像這樣的特殊需要，還是建議採用前後端分離 + Vue router 的作法

+ ### vite.config.js 設置
1. resolve > alias 打開 vue 選項
```
resolve: {
  alias: {
    vue: 'vue/dist/vue.esm-bundler.js',
    // 下略 ...
  }
}
```
2. build > rollupOptions 打開 
```
input: {
  main: path.resolve(__dirname, './src/main.js'),
},
```


+ ### 將各頁面邏輯，作為「component」引入 main.js，並且取消原本的 createApp 如：
```
 // 上略 ...
 
 import App from './App.vue'
 import GameApp from './pages/game/Index.vue'
 
 // createApp(App) // 取消 createApp
createApp({})
.mixin({
  data(){
    return {
      window,
    }
  },
  components: {
    ...components,
    GameApp,
  },
  methods
})

// 下略 ...
```


+ ### 將原本的各頁模板，轉變成純邏輯，template 僅放 slot 並將要用到的參數拋出去給 HTML-tempalte 用：
```
// pages > game > Index.vue
<script setup lang="ts">
import { reactive, nextTick } from 'vue'
import { useStore } from 'vuex'
import { isEmpty } from '@src/helpers'

interface IProps {}
const props = defineProps<IProps>()
const store = useStore()
const state = reactive({})
</script>

<template>
  <slot
  :store="store"
  :state="state"
  :isEmpty="isEmpty"
  :nextTick="nextTick"></slot>
</template>
```


+ ### 修改 HTML 模板檔案：
```
<!DOCTYPE html>
<html>
  <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <!-- dev mode -->
   <script type="module" src="http://localhost:5173/src/main.js"></script>
   <!-- dev mode -->
   
   <!-- prod mode -->
   <!-- <script type="module" crossorigin src="./entry/main.js"></script> -->
   <!-- <link rel="stylesheet" href="./assets2/main.css"> -->
   <!-- prod mode -->
  </head>
  
  <body>
    <div id="app" v-cloak>
      <game-app> <!-- 引入 main.js 的 page component -->
        <template #default="{store, viewport, state}"> <!-- page component 透過 slot 拋到 HTML template 的參數 -->
          ...
          ...
        </template>
      <game-app>
    </div>
  </body>
</html>
```
