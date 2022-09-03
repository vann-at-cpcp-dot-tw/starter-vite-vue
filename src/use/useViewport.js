import { onMounted, reactive, onBeforeUnmount } from 'vue'

export default function(){

  const viewport = reactive({
    width: 0,
    height: 0,
    resizeTimer: null
  })

  function updateViewportData(){
    viewport.width = window.innerWidth
    viewport.height = window.innerHeight
  }

  function resizeWatcher(){
    clearTimeout(viewport.resizeTimer)
    viewport.resizeTimer = setTimeout(function(){
      updateViewportData()
    }, 250)
  }

  onMounted(()=>{
    updateViewportData()
    $(window).on('resize', resizeWatcher)
  })

  onBeforeUnmount(()=>{
    $(window).off('resize', resizeWatcher)
  })



  return viewport
}
