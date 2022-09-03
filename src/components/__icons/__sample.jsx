
import { reactive, watch, defineComponent } from 'vue'
export default defineComponent({
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
    return ()=><svg class={`inline ${props.classes.svg}`}
    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
    style={{
      width: typeof props.width === 'number' ?`${props.width}px` :props.width,
      height: typeof props.height === 'number' ?`${props.height}px` :props.height
    }}
    onMouseover={()=>{
      if( props.hover.fill ){
        state.fill = props.hover.fill
      }
    }}
    onMouseleave={()=>{
      state.fill = props.fill
    }}>
      <path class={`${props.classes.path}`}
      fill={state.fill}
      fill-rule="evenodd" d="M9 15.586L19.293 5.293a1 1 0 0 1 1.414 1.414l-11 11a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L9 15.586z" />
    </svg>
  }
})


