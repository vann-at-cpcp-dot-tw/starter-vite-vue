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
        fill-rule="evenodd" d="M12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm7 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM5 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
    </svg>
</template>
