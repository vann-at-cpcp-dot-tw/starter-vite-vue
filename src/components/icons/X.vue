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
    <svg :class="`inline ${classes.svg}`" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
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
        <path :class="`icon ${classes.icon}`" :fill="state.fill" fill-rule="evenodd" d="M13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 1.414-1.414L12 10.586l5.293-5.293a1 1 0 0 1 1.414 1.414L13.414 12z"/>
    </svg>

</template>
