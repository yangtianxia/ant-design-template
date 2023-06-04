import type { VNode } from '../utils'

export type ResultCode = '500' | '404' | 'error' | 'network' | 'search' | 'nodata'

export interface ResultOption {
  status?: ResultCode
  bottom?: VNode | null
  title?: string | VNode | null
  image?: string | VNode | null
  desc?: string | VNode | null
  refresh?(): void
}

export type ResultProps = ResultCode | ResultOption