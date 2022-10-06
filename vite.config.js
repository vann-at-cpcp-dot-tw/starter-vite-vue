/**
 * 關於 public 資料夾引用, 參考：https://cn.vitejs.dev/guide/assets.html#importing-script-as-a-worker
 * 如果你有下列這些資源：
 * ・不會被原始碼引用（例如 robots.txt）
 * ・必須保持原有檔名（沒有經過 hash）
 * ・或者你壓根不想引入該資源，只是想得到其 URL。
 *
 * 那麼你可以將該資源放在指定的 public 資料夾中，它應位於你的專案根目錄。public 資料夾的資源在開發時能直接通過 / 根路徑訪問到，並且打包時會被完整復制到輸出資料夾的根目錄下。
 * public 資料夾預設是 <root>/public，但可以通過 publicDir 選項 來配置。

 * 請注意：
 * 引入 public 中的資源永遠應該使用根絕對路徑，舉個例子，public/icon.png 應該在源碼中被引用為 /icon.png。
 * public 中的資源不應該被 JavaScript 文件引用。
 *
 * 關於 src 內的資源引用
 * Vus SFC 在 template 模式下，可直接使用 <img src="@src/..." />
 * 但如果在 JSX 模式下，圖片路徑無法直接 src="@src/..." 必須手動 import 資源，範例：
 * import logoUrl from '@src/assets/img/logo.png'
 * <img src={logoUrl}/>
 * 或使用動態引入，如：import.meta.glob('/src/assets/**')
 * 或使用自訂的 useResolveAssets 來批次解析需要的所有路徑，如：
 * const resolvedAssets = useResolveAssets([
      '/src/assets/img/logo.png'
    ])
 */

import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{

  const ENV = loadEnv(mode, process.cwd(), '')

  return {
    base: ENV.APP_BASE || '',
    define: {
      // 字串要包 ""，參考：https://cn.vitejs.dev/config/#define
      VITE_API_BASE: `"${ENV.API_BASE || ''}"`,
      VITE_APP_BASE: `"${ENV.APP_BASE || ''}"`,
      VITE_ASSETS_BASE: `"${ENV.ASSETS_BASE || ENV.APP_BASE || ''}"`,
    },
    plugins: [
      vue(),
      vueJsx({
        enableObjectSlots: true,
        // options are passed on to @vue/babel-plugin-jsx
      }),
      // legacy({
      //   targets: ['defaults', 'not IE 11']
      // }),
      visualizer()
    ],
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `$VITE_ASSETS_BASE: "${ENV.ASSETS_BASE || ''}" \n`
        }
      },
      //  requireModuleExtension: true
    },
    optimizeDeps: {
      exclude: ['jquery']
    },
    build: {
      emptyOutDir: true,
      target: 'es2015',
      manifest: true,
      rollupOptions: {
        // input: {
        //   main: path.resolve(__dirname, './src/main.js'),
        // },
        output: {
          assetFileNames: 'assets/[name]-[hash].[ext]',
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: 'entry/[name]-[hash].js'
        }
      }
    },
    resolve: {
      alias: {
        // vue: 'vue/dist/vue.esm-bundler.js', // open if use .html template
        '@src': path.resolve(__dirname, './src'),
      }
    }
  }
})
