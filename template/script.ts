import { pick } from '@txjs/shared'

export const renderExternalScript = (mode: string, dependencies: Record<string, string>, external: string[]) => {
  const dev = mode === 'development'

  dependencies = pick(dependencies, external)

  return Object.keys(dependencies)
    .map((name) => ({
      name,
      version: dependencies[name].replace(/^\^/, '')
    }))
    .map(({ name, version }) => {
      let targetUrl

      switch (name) {
        case 'vue':
          targetUrl = `vue.global${dev ? '' : '.prod.min'}`
          break
        case 'vue-router':
          targetUrl = `vue-router.global${dev ? '' : '.prod'}.min`
          break
        case 'viewerjs':
          targetUrl = 'viewer.min'
          break
        default:
          targetUrl = `${name}.min`
          break
      }

      return {
        injectTo: 'body' as any,
        tag: 'script',
        attrs: {
          rel: 'dns-prefetch',
          defer: true,
          type: 'text/javascript',
          src: `https://cdn.staticfile.org/${name}/${version}/${targetUrl}.js`
        }
      }
    })
}