<script setup>
import { useSlots, onBeforeMount, onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick, defineAsyncComponent, useCssModule } from 'vue'
import useViewport from '@src/use/useViewport'
import { useStore } from 'vuex'
import { useQuery } from 'vue-query'
import { router, useRoute } from '@src/routes'
import { isEmpty  } from '@src/helpers'

const props = defineProps({})
const emit = defineEmits([])
const route = useRoute()
const viewport = useViewport()
const store = useStore()
const state = reactive({})
const $style = useCssModule()

watch(()=>{ return {...route} }, (newVal)=>{
    //FB 登入會自動附加奇怪的 hash，由此移除
    if( route.hash && route.hash === '#_=_'){
        router.push({
            hash: '',
            query: route.query
        })
    }

    nextTick(()=>{
        window.scrollTo(0, 0)
    })
})
</script>

<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive>
            <component :is="Component" v-if="route?.meta?.keepAlive" :key="route.name" />
        </keep-alive>
        <component :is="Component" v-if="!route?.meta?.keepAlive" :key="route.name" />
    </router-view>
</template>



<style lang="sass" module>
</style>
