<script lang="jsx">
import { onBeforeMount, onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick, defineAsyncComponent, defineComponent, Teleport, } from 'vue'
import useViewport from '@src/use/useViewport'
import { useStore } from 'vuex'
import { router, useRoute } from '@src/routes'
import { isEmpty } from '@src/helpers'

export default defineComponent({
  props: {
    id: String,
    maxWidth: String,
  },
  setup(props, {emit, slots}) {
    const route = useRoute()
    const viewport = useViewport()
    const store = useStore()
    const state = reactive({})

    watch(()=>store.state.lightbox, ()=>{
      if( store.state.lightbox ){
        $('body').addClass('lb-open')
      }
    }, {
      immediate: true,
    })


    return ()=>{
        return store.state.lightbox == props.id
        ?(<Teleport to="body">
          <div className="lightbox" data-el="lightbox" id={props?.id}>
              <div className="inner" style={{maxWidth: props?.maxWidth}}>
                <div className="content">
                  { typeof slots.default === 'function' ?slots.default() :null }
                </div>
              </div>
            </div>
        </Teleport>)
        :null
    }
  },
})
</script>

<style lang="sass">
.lightbox
  position: fixed
  width: 100%
  height: 100%
  left: 0
  top: 0
  z-index: 9999
  overflow: auto
  display: flex
  justify-content: center
  align-items: flex-start
  background-color: rgba(25,25,25,0.8)
  overflow: auto
  padding: 30px 20px

  >.inner
    width: 100%
    max-width: 680px
    margin-top: auto
    margin-bottom: auto
    position: relative
    background: white
    >.content
      position: relative
      @apply lg:px-8 lg:py-6 p-6
</style>
