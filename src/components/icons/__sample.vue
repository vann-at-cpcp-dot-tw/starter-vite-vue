<script>
import { reactive, watch } from 'vue'
export default {
    props: {
        width: {
            type: [String, Number],
            default: 24
        },
        height: {
            type: [String, Number],
            default: 'auto'
        },
        fill: {
            type: String,
            default: '#444'
        },
        hover: {
            type: Object,
            default: ()=>({
                fill: ''
            })
        },
        classes: {
            type: Object,
            default: ()=>({
                svg: '',
                icon: '',
            })
        },
    },
    setup(props){
        const state = reactive({
            fill: props.fill,
        })
        watch(()=>props.fill, (newVal)=>{
            state.fill = newVal
        })
        return {
            state
        }
    }
}
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    :class="`inline ${classes.svg}`"
    :style="{
        width: typeof width === 'number' ?`${width}px` :width,
        height: typeof height === 'number' ?`${height}px` :height
    }"
    @mouseover="()=>{
        if( hover.fill ){
            state.fill = hover.fill
        }

    }"
    @mouseleave="()=>{
        state.fill = fill
    }">
        <path
        :class="`icon ${classes.icon}`"
        :fill="state.fill"
        d="M12.364 4.636h-4.91a.818.818 0 0 0-.818.819v13.09c0 .452.367.819.819.819h9.818a.818.818 0 0 0 .818-.819v-8.181h-4.91a.818.818 0 0 1-.817-.819V4.636zM14 5.793v2.934h2.934L14 5.793zM13.182 3c.217 0 .425.086.578.24l5.728 5.727c.153.153.24.361.24.578v9A2.455 2.455 0 0 1 17.272 21H7.455A2.455 2.455 0 0 1 5 18.545V5.455A2.455 2.455 0 0 1 7.455 3h5.727z"/>
    </svg>
</template>
