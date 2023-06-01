import type { VNode as _VNode, ComponentPublicInstance } from 'vue'

export interface CustomShim<T> {
  new (...args: any[]): {
    $props: T
  }
}

export type VNodeChildAtom = _VNode | string | number | boolean | null | undefined | void;

export type VueNode = VNodeChildAtom | VNodeChildAtom[] | JSX.Element

export type VNode= (...args: any) => VueNode