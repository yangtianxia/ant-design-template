import extend from 'extend'
import uaBrowser from 'ua-browser'

const __ENV__ = uaBrowser()

export const useEnv = () => {
  return extend({}, __ENV__)
}