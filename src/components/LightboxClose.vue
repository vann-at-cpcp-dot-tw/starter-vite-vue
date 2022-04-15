<script lang="jsx">
import { onBeforeMount, onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick, defineAsyncComponent, defineComponent, } from 'vue'
import useViewport from '@src/use/useViewport'
import { useStore } from 'vuex'
import { router, useRoute } from '@src/routes'
import { isEmpty } from '@src/helpers'

export default defineComponent({
  props: {},
  setup(props, {emit}) {
    const route = useRoute()
    const viewport = useViewport()
    const store = useStore()
    const state = reactive({})

    function lightboxClickHandler(e){
      if( $(e.target).data('el') == 'lightbox'){
        store.commit('lightbox', null)
      }
    }

    onBeforeMount(()=>{
      $('body').on('click', lightboxClickHandler)
    })

    onBeforeUnmount(()=>{
      $('body').off('click', lightboxClickHandler)
    })

    return () => (
      <div className="flex justify-end absolute right-2 top-2">
        <div className="btn"
        onClick={()=>{
          store.commit('lightbox', null)
        }}>
          <i class="bi bi-x-lg text-[22px]"></i>
        </div>
      </div>
    )
  },
})
</script>
