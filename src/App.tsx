import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ConfigProvider } from 'ant-design-vue'

import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  setup () {
    return () => (
      <ConfigProvider locale={zhCN}>
        <RouterView />
      </ConfigProvider>
    )
  }
})