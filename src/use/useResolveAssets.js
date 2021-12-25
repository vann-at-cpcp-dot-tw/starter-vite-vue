import { onBeforeMount, reactive } from 'vue'
export default function(QueueToBeResolved=[]){

    const srcAssetsPromises = import.meta.glob('/src/assets/**')
    const resolvedAssets = reactive({})

    onBeforeMount(()=>{
        QueueToBeResolved.forEach((path)=>{

            srcAssetsPromises[path]().then((result)=>{

                resolvedAssets[path] = result.default

            })

        })
    })

    return resolvedAssets
}
