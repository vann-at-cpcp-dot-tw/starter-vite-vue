<script lang="jsx">
import { onBeforeMount, onMounted, onBeforeUnmount, onUnmounted, ref, reactive, computed, watch, nextTick, defineAsyncComponent, defineComponent, Teleport } from 'vue'
import useViewport from '@src/use/useViewport'
import { useStore } from 'vuex'
import { router, useRoute } from '@src/routes'

export default defineComponent({
    props: {
        maxWidth: {
            type: String,
        },
        onRefReady: {
            type: Function,
            default: ()=>function(){}
        },
        styles: {
            type: Object,
            default: ()=>({
                wrapper: {},
                inner: {},
            })
        },
        onMounted: {
            type: Function,
            default: ()=>{}
        }
    },
    setup(props, { attrs, emit, slots }){
        const route = useRoute()
        const viewport = useViewport()
        const store = useStore()
        const state = reactive({})

        watch(()=>store.state.lightbox, ()=>{
            if (store.state.lightbox){
                $('body').addClass('lb-open')
            } else {
                $('body').removeClass('lb-open')
            }
        }, {
            immediate: true,
        })

        onBeforeUnmount(()=>{
            store.commit('lightbox', null)
        })

        return ()=>{
            return store.state.lightbox === attrs.id
                ? (<Teleport to="body">
                    <div class="lightbox" data-el="lightbox" {...attrs}
                    ref={(e)=>{
                        props.onRefReady(e)
                    }}
                    style={{
                        ...(props.styles?.wrapper || {})
                    }}>
                        <img src="" onError={()=>{ props?.onMounted?.() }} />
                        {
                            typeof slots.inner === 'function'
                                ? slots.inner()
                                : <div class="inner"
                                style={{
                                    maxWidth: props?.maxWidth,
                                    ...(props.styles?.inner || {})
                                }}>
                                    { slots?.default?.()}
                                </div>
                        }
                    </div>
                </Teleport>)
                : null
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
  background-color: rgba(0,0,0,0.8)
  overflow: auto
  padding: 30px 20px

  >.inner
    width: 100%
    max-width: 380px
    padding: 0px
    margin-top: auto
    margin-bottom: auto
    position: relative
    height: auto
</style>
