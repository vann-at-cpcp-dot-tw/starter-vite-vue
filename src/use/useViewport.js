import { onMounted, reactive } from 'vue'
export default function(){
    const viewport = reactive({
        width: 0,
        height: 0,
    })

    function updateViewportData(){
        viewport.width = window.innerWidth
        viewport.height = window.innerHeight
    }

    onMounted(()=>{

        updateViewportData()

        let resizeTimer
        $(window).on('resize', function(e){
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(function(){
                updateViewportData()
            }, 250)
        })
    })

    return viewport
}
