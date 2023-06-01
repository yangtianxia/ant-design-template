import { isNil, isNumeric } from '@txjs/bool'

/**
 * css样式添加
 *
 * @example
 * ```ts
 * addUnit(12)
 * // => 12rpx
 * addUnit('10px')
 * // => 10rpx
 * addUnit(10, 2)
 * // => 20rpx
 * ```
 */
export function addUnit(value?: Numeric) {
  if (isNil(value)) {
    return
  }

  if (isNumeric(value)) {
    return `${value}px`
  }

  return value
}