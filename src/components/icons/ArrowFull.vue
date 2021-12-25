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
        <path :class="`${classes.path}`" :fill="state.fill" fill-rule="evenodd" d="M5.792 10.992h10.09l-3.797-3.656c-.164-.152-.246-.334-.246-.545 0-.21.073-.395.22-.554.146-.158.325-.237.536-.237.21 0 .398.07.562.21l5.168 4.993c.164.152.247.337.247.554 0 .217-.083.401-.247.554l-5.203 5.01c-.152.14-.328.21-.527.21-.223 0-.41-.082-.563-.246-.152-.152-.225-.334-.22-.545.007-.21.086-.392.238-.545l3.797-3.656H5.775c-.2 0-.375-.07-.528-.21-.152-.142-.234-.311-.246-.51-.012-.223.062-.417.22-.58.158-.165.349-.247.571-.247z" transform="translate(-551.000000, -452.000000) translate(455.000000, 258.000000) translate(24.000000, 146.000000) translate(0.000000, 48.000000) translate(72.000000, 0.000000)"/>
    </svg>
</template>
