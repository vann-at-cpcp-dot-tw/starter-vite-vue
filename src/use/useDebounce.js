import { debounce } from 'lodash-es'
export default function useDebounce(delay = 500, options = {}){
  return debounce(function(callback = function(){}){
    callback()
  }, delay, options)
}
