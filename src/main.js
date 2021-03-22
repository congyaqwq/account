import { createApp } from 'vue'
import App from './App.vue'
import { Button, Input, Select, InputNumber, Form, Icon, Steps, message } from 'ant-design-vue'

import '@/style/flex.less'

const app = createApp(App)
app.use(Button).use(Input).use(Form).use(Icon).use(Steps).use(Select).use(InputNumber)
app.config.globalProperties.$message = message
app.mount('#app')
