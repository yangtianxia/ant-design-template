import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { renderExternalScript } from './template/script'
import ejs from 'ejs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pluginImporter from 'vite-plugin-importer'
import externalGlobals from 'rollup-plugin-external-globals'
import autoprefixer from 'autoprefixer'
// @ts-ignore
import pkg from './package.json'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

const external = ['vue', 'vue-router', 'axios', 'qs', 'viewerjs']

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
            __VERSION__: pkg.version
          },
          tags: [
            ...renderExternalScript(
              mode,
              pkg.dependencies,
              external
            ),
            {
              injectTo: 'body-prepend',
              tag: 'div',
              attrs: {
                id: 'app'
              },
              children: ejs.render(
                ejs.fileLoader(resolve('./template/spin.html')).toString()
              )
            }
          ]
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
        generateScopedName: mode === 'development' ? '[local]_[hash:base64:8]' : '[hash:base64:6]',
        globalModulePaths: [/\.module\.[sc|sa|le|c]ss$/i]
      },
      postcss: {
        plugins: [autoprefixer()]
      }
    },
    build: {
      rollupOptions: {
        external,
        plugins: [
          externalGlobals({
            qs: 'Qs',
            vue: 'Vue',
            axios: 'axios',
            viewerjs: 'Viewer',
            'vue-router': 'VueRouter'
          })
        ]
      }
    }
  }
})
