import { Spin } from 'ant-design-vue'

import Bem from '@txjs/bem'
import { defineComponent, computed } from 'vue'
import { useParent } from '@vant/use'
import { USE_APP_KEY } from '@/hooks'
import { truthProp } from '../utils'

const [name, bem] = Bem('app')

export default defineComponent({
  name,
  
  setup() {
    
  }
})