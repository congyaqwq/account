import { createApp } from 'vue'
import App from './App.vue'
import { Button, Input, Select, InputNumber, Radio, Form, Icon, Steps, message, Checkbox } from 'ant-design-vue'

import '@/style/flex.less'
import './registerServiceWorker'

const app = createApp(App)
app.use(Button).use(Input).use(Form).use(Icon).use(Steps).use(Select).use(InputNumber).use(Radio).use(Checkbox)
app.config.globalProperties.$message = message
app.mount('#app')
