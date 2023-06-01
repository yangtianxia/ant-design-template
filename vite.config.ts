import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pluginImporter from 'vite-plugin-importer'
import autoprefixer from 'autoprefixer'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      proxy: {
        [env.VITE_PROXY_API]: {
          target: env.VITE_API,
          changeOrigin: true,
          ws: true,
          rewrite: (path: string) => path.replace(new RegExp(`^${env.VITE_PROXY_API}`), '')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx({
        isCustomElement: (tag) => tag.startsWith('custom')
      }),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            injectSpin: `
              <div class="spin">
                <div class="spin-dot">
                  ${new Array(4).fill(0).map(() => '<div></div>').join('')}
                </div>
              </div>
            `,
            injectScript: ''
          }
        }
      }),
      pluginImporter({
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: (name) => `${name}/style`
      })
    ],
    resolve: {
      alias: {
        '~': resolve('./'),
        '@': resolve('./src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          relativeUrls: true,
          javascriptEnabled: true,
          charset: false,
          additionalData: `
            @import "./src/style/antd.less";
            @import "./src/style/vars.less";
          `,
          modifyVars: {
            '@prefix': env.VITE_PREFIX
          }
        }
      },
      modules: {
        auto: true,
        generateScopedName:
          mode === 'development'
            ? '[local]_[hash:base64:8]'
            : '[hash:base64:6]',
        globalModulePaths: [
          /\.module\.[sc|sa|le|c]ss$/i
        ]
      },
      postcss: {
        plugins: [
          autoprefixer()
        ]
      }
    }
  }
})
