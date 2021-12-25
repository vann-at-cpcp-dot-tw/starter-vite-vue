import { createWebHistory, createRouter, useRoute, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'

export {
  useRoute,
  onBeforeRouteUpdate,
  onBeforeRouteLeave
}

export const routes = [
  {
    name: 'home',
    path: '/',
    component: ()=> import('@src/pages/home/Index.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
