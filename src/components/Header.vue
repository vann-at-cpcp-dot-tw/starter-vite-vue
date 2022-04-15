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

        return () => (<header>
            <div className="text-center">This is Header</div>
        </header>)
    },
})
</script>
