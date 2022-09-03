<script setup>
import { useSlots, onBeforeMount, onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick, defineAsyncComponent, useCssModule } from 'vue'
import useViewport from '@src/use/useViewport'
import { useStoreState, useStoreGetters } from '@src/use/useStoreMappers'
import { useStore } from 'vuex'
import { useQuery } from 'vue-query'
import { router, useRoute } from '@src/routes'
import { isEmpty } from '@src/helpers'

const props = defineProps({})
const emit = defineEmits([])
const route = useRoute()
const viewport = useViewport()
const store = useStore()
const state = reactive({})
const $style = useCssModule()
</script>

<template>
    <div></div>
</template>

<style lang="sass" module>
</style>
