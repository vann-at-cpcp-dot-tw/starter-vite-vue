<script>
import { onBeforeMount, onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick, defineAsyncComponent, defineComponent, } from 'vue'
import useViewport from '@src/use/useViewport'
import { useStore } from 'vuex'
import { router, useRoute } from '@src/routes'

export default {
    setup(){
        const route = useRoute()
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
    }
}
</script>

<template>
    <router-view v-slot="{ Component, route }">
        <keep-alive>
            <component :is="Component" v-if="route?.meta?.keepAlive" :key="route.name" />
        </keep-alive>
        <component :is="Component" v-if="!route?.meta?.keepAlive" :key="route.name" />
    </router-view>
</template>