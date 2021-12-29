<script lang="jsx">
import { onBeforeMount, onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick, defineAsyncComponent, defineComponent, } from 'vue'
import useViewport from '@src/use/useViewport'
import useResolveAssets from '@src/use/useResolveAssets'
import { useStore } from 'vuex'
import { router, useRoute } from '@src/routes'
import { isEmpty } from '@src/helpers'
import components from '@src/components'
const { Lightbox, LightboxClose, Icon } = components

export default defineComponent({
    props: {},
    setup(props, {emit}) {
        const srcAssets = useResolveAssets([])
        const route = useRoute()
        const viewport = useViewport()
        const store = useStore()
        const state = reactive({})

        return () => (
            <>
            </>
        )
    },
})
</script>
