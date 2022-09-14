<script lang="jsx">
import { onBeforeMount, onMounted, onBeforeUnmount, toRef, toRefs, ref, reactive, computed, watch, nextTick, defineAsyncComponent, defineComponent, useCssModule } from 'vue'
import useViewport from '@src/use/useViewport'
import { useStore } from 'vuex'
import { useStoreState, useStoreGetters } from '@src/use/useStoreMappers'
import { useQuery } from 'vue-query'
import { router, useRoute } from '@src/routes'
import { isEmpty } from '@src/helpers'

export default defineComponent({
  props: {},
  setup(props, { emit, slots }){
    const route = useRoute()
    const viewport = useViewport()
    const store = useStore()
    const state = reactive({})
    // const $style = useCssModule()
    return ()=><div>
    </div>
  },
})
</script>

<style lang="sass" module>
</style>

<!-- <style lang="sass" module>
</style> -->
