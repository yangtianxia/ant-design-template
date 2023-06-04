import { isNil, isNumeric } from '@txjs/bool'

/**
 * css样式单位
 *
 * @example
 * ```ts
 * addUnit(12)
 * // => 12px
 * addUnit('10px')
 * // => 10px
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

/**
 * 转换IOS时间格式
 * - 修复由 `-` 符在IOS下无法识别为有效日期问题
 *
 * @example
 * ```ts
 * toIOSDate('2008-08-08')
 * // => 2008/08/08
 * toIOSDate('2012.02.15')
 * // => 2012.02.15
 * ```
 */
export function toIOSDate(value: string) {
  if (value.includes('-')) {
    return value.replace(/-/g, '/')
  }

  return value
}