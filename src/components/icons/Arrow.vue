<script>
import { reactive, computed, watch } from 'vue'
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
                path: '',
            })
        },
        direction: {
            type: String,
            default: 'right',
        }
    },
    setup(props){
        const state = reactive({
            fill: props.fill,
            rotate: computed(()=>{
                switch(props.direction){
                    case 'right':
                        return 'rotate(0deg)'

                    case 'left':
                        return 'rotate(180deg)'

                    case 'up':
                        return 'rotate(-90deg)'

                    case 'down':
                        return 'rotate(90deg)'
                }
            })
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
        height: typeof height === 'number' ?`${height}px` :height,
        transform: state.rotate,
    }"
    @mouseover="()=>{
        if( hover.fill ){
            state.fill = hover.fill
        }
    }"
    @mouseleave="()=>{
        state.fill = fill
    }">
        <path :class="`${classes.path}`" :fill="state.fill" fillRule="evenodd" d="M9.293 6.707a1 1 0 1 1 1.414-1.414l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 1 1-1.414-1.414L14.586 12 9.293 6.707z"/>
    </svg>
</template>
