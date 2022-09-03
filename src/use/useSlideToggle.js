import { ref, reactive, watch, onMounted } from 'vue'

export default function(passState = {}){
  const togglerRef = ref(null)
  const contentRef = ref(null)

  const state = reactive({
    status: 'off',
    ...passState,
  })

  watch(()=>[togglerRef.value, contentRef.value], ()=>{

    $(togglerRef.value).off('click')

    if (!togglerRef.value || !contentRef.value){
      return
    }

    $(togglerRef.value).on('click', function(){

      if (passState?.onBeforeToggle){
        passState.onBeforeToggle()
      }

      if (state.status == 'on'){

        $(contentRef.value).slideUp(()=>{
          state.status = 'off'
          if (passState?.onAfterToggle){
            passState.onAfterToggle()
          }
        })

      } else {

        $(contentRef.value).slideDown(()=>{
          state.status = 'on'
          if (passState?.onAfterToggle){
            passState.onAfterToggle()
          }
        })
      }
    })

  }, {
    immediate: true,
  })

  return {
    togglerRef: togglerRef,
    contentRef: contentRef,
    state: state,
  }
}
