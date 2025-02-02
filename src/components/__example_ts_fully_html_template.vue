<script setup lang="ts">
import { reactive, nextTick } from 'vue'
import { useStore } from 'vuex'
import { isEmpty } from '@src/helpers'

interface IProps {}
const props = defineProps<IProps>()
// defineProps<IProps>() 和 withDefaults(defineProps<IProps>(), {}）請擇一使用，有要指定預設值的話，才使用後者，因為若 withDefaults 內的 props 屬性是空的話，會編譯失敗。
// const props = withDefaults(defineProps<IProps>(), {})
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
