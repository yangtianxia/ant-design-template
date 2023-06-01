import type { App, Component } from 'vue'
import type { CustomShim } from './types'

import extend from 'extend'
import { camelize } from '@txjs/shared'

type EventShim = CustomShim<{
  onClick?: (event: Event) => void
}>

export type WithInstall<T, U> = T & U & EventShim & {
  install(app: App): void
}

export const withInstall = <T extends Component, U extends object>(comp: T, options?: U) => {
  extend(comp, options)

  ;(comp as Record<string, unknown>).install = (app: App) => {
    const { name } = comp

    if (name) {
      app.component(name, comp)
      app.component(camelize(name), comp)
    }
  }

  return comp as WithInstall<T, Readonly<U>>
}