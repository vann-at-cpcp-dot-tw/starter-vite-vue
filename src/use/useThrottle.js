import { throttle } from 'lodash-es'
export default function useThrottle(delay = 500, options = {}){
  return throttle(function(callback = function(){}){
    callback()
  }, delay, options)
}
