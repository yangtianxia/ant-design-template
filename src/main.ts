import 'dayjs/locale/zh-cn'

import Bem from '@txjs/bem'
import dayjs from 'dayjs'

import App from '@/App'
import router from '@/router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { message, notification } from 'ant-design-vue'

// BEM配置
Bem.config({
  debugger: true,
  prefixer: {
    page: import.meta.env.VITE_PREFIX,
    comp: import.meta.env.VITE_PREFIX
  }
})

// DAYJS语言配置
dayjs.locale('zh-cn')

// MESSAGE配置
message.config({
  duration: 2,
  top: '12px'
})

// NOTIFICATION配置
notification.config({
  duration: 3,
  top: '80px'
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
