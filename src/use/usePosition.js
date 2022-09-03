import { ref, reactive, watch, onMounted} from 'vue'

export default function(){
  const elRef = ref(null)
  const state = reactive({
    x: 0,
    y: 0,
    inViewport: {
      elTop: 0,
      elBottom: 0,
    }
  })


  watch(()=>elRef.value, ()=>{
    window.elRef = elRef
    if( elRef.value ){

      $(window).on('scroll', function(){

        state.x = $(elRef.value).offset().left - $(window).scrollLeft()
        state.y = $(elRef.value).offset().top - $(window).scrollTop()
        state.elTop = Math.round(($(elRef.value).offset().top-$(window).scrollTop()) * 100 / $(window).height())

        const elBottomPos = $(elRef.value).offset().top - $(elRef.value).outerHeight()
        state.elBottom = Math.round( 100*(elBottomPos-$(window).scrollTop()) / ($(window).height()+$(elRef.value).outerHeight()) )
      })

    }
  })

  return {
    elRef: elRef,
    state: state,
  }
}
