// 因為 map 系列在 Vue 3 無法使用（依賴 this），故自己實作
// 參考：https://juejin.cn/post/6999473771253874701

// usage
// const storeState = useState(['name', 'age', 'six'])
// const storeGetters = useGetters(['counter'])
// const homeState = useState('home', ['homeCounter'])

import { computed, toRef } from 'vue'
import { mapGetters, mapState, mapActions, mapMutations, useStore, createNamespacedHelpers } from 'vuex'

const useMapper = (mapper, mapFn, isFn = false)=>{
  const store = useStore()

  const storeStateFns = mapFn(mapper)
  const storeState = {}
  Object.keys(storeStateFns).forEach((fnKey)=>{
    const fn = storeStateFns[fnKey].bind({ $store: store })
    storeState[fnKey] = isFn ? fn : computed(fn)
  })

  return storeState
}

export const useStoreState = (moduleName, mapper)=>{
  let mapperFn = mapState
  if (typeof moduleName === 'string' && moduleName.length > 0){
    mapperFn = createNamespacedHelpers(moduleName).mapState
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}

export const useStoreGetters = (moduleName, mapper)=>{
  let mapperFn = mapGetters
  if (typeof moduleName === 'string' && moduleName.length > 0){
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn)
}

export const useStoreActions = (moduleName, mapper)=>{
  let mapperFn = mapActions
  if (typeof moduleName === 'string' && moduleName.length > 0){
    mapperFn = createNamespacedHelpers(moduleName).mapActions
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn, true)
}

export const useStoreMutations = (moduleName, mapper)=>{
  let mapperFn = mapMutations
  if (typeof moduleName === 'string' && moduleName.length > 0){
    mapperFn = createNamespacedHelpers(moduleName).mapMutations
  } else {
    mapper = moduleName
  }
  return useMapper(mapper, mapperFn, true)
}
