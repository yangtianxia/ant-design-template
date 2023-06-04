import type { ResultProps, ResultOption } from '@/components/result'

import { ref, type Ref, type InjectionKey } from 'vue'
import { useChildren } from '@vant/use'
import { toString, isString } from '@txjs/bool'
import { useExpose } from '@/components/composables'

interface AppStateOption {
  loading?: boolean
  status?: ResultProps
}

export interface AppStateProvide {
  loading: Ref<boolean>
  status: Ref<ResultProps | undefined>
}

export const USE_APP_KEY: InjectionKey<AppStateProvide> = Symbol('use-app')

export const useApp = (options?: AppStateOption) => {
  const loading = ref(options?.loading ?? true)
  const status = ref<ResultProps | undefined>(options?.status)
  const { linkChildren } = useChildren(USE_APP_KEY)

  const reload = (error: ResultOption, callback?: Callback) => {
    if (isString(error)) {
      error = {
        status: 'error',
        desc: error
      }
    } else if (toString(error) === 'Error') {
      error = {
        status: 'error',
        desc: (error as Error).message
      }
    }

    if (callback) {
      error.refresh = () => {
        loading.value = true
        status.value = undefined
        callback?.()
      }
    }

    status.value = error
  }

  const state = { loading, status, reload }

  linkChildren(state)
  useExpose(state)

  return state
}