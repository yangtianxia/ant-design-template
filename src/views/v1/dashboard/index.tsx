import { Button as AButton } from 'ant-design-vue'

import Bem from '@txjs/bem'
import { defineComponent } from 'vue'

import less from './index.module.less'

const [name, bem] = Bem('dashboard', less)

export default defineComponent({
  name,

  setup () {
    return () => (
      <div class={bem()}>
        <AButton type="primary">button</AButton>
      </div>
    )
  }
})