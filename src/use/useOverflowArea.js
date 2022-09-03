import { ref, reactive, watch, onMounted } from 'vue'

// TODO: 檢測是否有捲軸 & 捲軸方向的程式設計需優化
export default function(passState = {}, direction = 'x'){

  const overflowElRef = ref(null)

  const state = reactive({
    hasScroll: false,
    scrollPos: 'start',
    ...passState,
  })

  const updateScrollBar = function(){
    switch (direction){
      case 'x':
        state.hasScroll = overflowElRef.value?.scrollWidth > overflowElRef.value?.clientWidth
        break

      case 'y':
        state.hasScroll = overflowElRef.value?.scrollHeight > overflowElRef.value?.clientHeight
        break
    }
  }

  watch(()=>overflowElRef.value, (newVal)=>{

    if (newVal === null){
      return
    }

    updateScrollBar()

    $(overflowElRef.value).off('scroll')

    $(overflowElRef.value).on('scroll', ()=>{

      // updateScrollBar()

      if (!state.hasScroll){
        return
      }

      switch (direction){
        case 'x':{
          const scrollLeft = overflowElRef?.value?.scrollLeft
          if (scrollLeft == 0){
            state.scrollPos = 'start'
          } else if (scrollLeft > 0 && scrollLeft < (overflowElRef.value?.scrollWidth) - (overflowElRef.value?.clientWidth)){
            state.scrollPos = 'center'
          } else if (scrollLeft >= (overflowElRef.value?.scrollWidth) - (overflowElRef.value?.clientWidth)){
            state.scrollPos = 'end'
          }
          break
        }

        case 'y':{
          const scrollTop = overflowElRef?.value?.scrollTop
          if (scrollTop == 0){
            state.scrollPos = 'start'
          } else if (scrollTop > 0 && scrollTop < (overflowElRef.value?.scrollHeight) - (overflowElRef.value?.clientHeight)){
            state.scrollPos = 'center'
          } else if (scrollTop >= (overflowElRef.value?.scrollHeight) - (overflowElRef.value?.clientHeight)){
            state.scrollPos = 'end'
          }
          break
        }
      }

    })

  }, {
    immediate: true,
  })

  onMounted(()=>{
    $(window).on('load', function(){
      updateScrollBar()
    })

    let resizeTimer
    $(window).on('resize', function(){
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(()=>{
        updateScrollBar()
      }, 250)
    })
  })

  return {
    updateScrollBar,
    ref: overflowElRef,
    state: state,
  }
}
