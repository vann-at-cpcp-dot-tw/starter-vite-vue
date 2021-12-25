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
            default: '#71a875'
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
                path: '',
            })
        }
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
    <svg :class="`inline ${classes.svg}`" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="width:24px;"
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
        <path :class="`${classes.path}`" :fill="state.fill" fill-rule="evenodd" d="M9 15.586L19.293 5.293a1 1 0 0 1 1.414 1.414l-11 11a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L9 15.586z"/>
    </svg>

</template>
