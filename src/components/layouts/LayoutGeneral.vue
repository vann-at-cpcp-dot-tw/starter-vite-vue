<script lang="jsx">
import { onBeforeMount, onMounted, onBeforeUnmount, ref, reactive, computed, watch, nextTick, defineAsyncComponent, defineComponent, } from 'vue'
import useViewport from '@src/use/useViewport'
import { useStore } from 'vuex'
import { router, useRoute } from '@src/routes'
import { isEmpty } from '@src/helpers'
import components from '@src/components'
const { Lightbox, LightboxClose, Icon } = components

const Header = defineAsyncComponent(()=> import('@src/components/template-parts/Header.vue'))
const Footer = defineAsyncComponent(()=> import('@src/components/template-parts/Footer.vue'))

export default defineComponent({
    props: {},
    setup(props, {emit, slots}) {
        const route = useRoute()
        const viewport = useViewport()
        const store = useStore()
        const state = reactive({})

        return () => (
            <div className="w-full h-full flex flex-col flex-nowrap">
                <Header />

                <main className="grow">
                    { typeof slots.default === 'function' ?slots.default() :null }
                </main>

                <Footer />
            </div>
        )
    },
})
</script>
