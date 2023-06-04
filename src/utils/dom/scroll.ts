import { raf, useRect } from '@vant/use'
import { isNil } from '@txjs/bool'

export const getScrollTop = (el: ScrollElement) => {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset
  return Math.max(top, 0)
}

export const setScrollTop = (el: ScrollElement, value: number) => {
  if ('scrollTop' in el) {
    el.scrollTop = value
  } else {
    el.scrollTo(el.scrollX, value)
  }
}

export const getRootScrollTop = () => {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

export const setRootScrollTop = (value: number) => {
  setScrollTop(window, value)
  setScrollTop(document.body, value)
}

export const getElementTop = (el: ScrollElement, scoller?: ScrollElement) => {
  if (el === window) {
    return 0
  }

  const scrollTop = scoller ? getScrollTop(scoller) : getRootScrollTop()
  return useRect(el).top + scrollTop
}

/** 横向滚动 */
export const scrollLeftTo = (
  scroller: Element,
  to: number,
  duration: number,
  callback?: Callback
) => {
  let count = 0
  const from = scroller.scrollLeft
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16)

  function animate() {
    scroller.scrollLeft += (to - from) / frames

    if (++count < frames) {
      raf(animate)
    } else if (callback) {
      raf(callback)
    }
  }

  animate()
}

/** 纵向滚动 */
export const scrollTopTo = (
  scroller: Element,
  to: number,
  duration: number,
  callback?: Callback
) => {
  let current = getScrollTop(scroller)

  const isDown = current < to
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16)
  const step = (to - current) / frames

  function animate() {
    current += step

    if ((isDown && current > to) || (!isDown && current < to)) {
      current = to
    }

    setScrollTop(scroller, current)

    if ((isDown && current < to) || (!isDown && current > to)) {
      raf(animate)
    } else if (callback) {
      raf(callback)
    }
  }

  animate()
}

/**
 * 元素相对窗口滚动比例
 *
 * @example
 * ```ts
 * getScrollRate(40, 20) // 0.5
 * ```
 */
export const getScrollRate = (value: number, scrollTo?: number) => {
  if (isNil(scrollTo)) {
    scrollTo = window.scrollY
  }

  return Math.min(
    Math.floor((scrollTo / value) * 100) / 100,
    1
  )
}