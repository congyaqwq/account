<template>
    <div class="main">
        <h1>多人账单 {{ version }}</h1>
        <quick-by-input :onAI="handleByAI"></quick-by-input>
        <p class="danger">最近更新：手机端浏览器可添加至桌面图标</p>
        <a-steps class="steps" :current="current" size="small">
            <a-step title="选择参与人"></a-step>
            <a-step title="消费金额统计" />
            <a-step title="结果" />
        </a-steps>
        <div class="content column-flex">
            <dynamic-form v-show="current === 0" v-model="userList" @onAI="handleByAI"></dynamic-form>
            <dynamic-form-cost ref="costForm" v-if="current === 1" :userList="userList" v-model="form"></dynamic-form-cost>
            <res-output v-if="current === 2" :total="total" :res="res" :userList="userList"></res-output>
            <div class="btn-group">
                <a-button v-if="current !== 0" style="margin-left: 20px" size="large" @click="toPrev">上一步</a-button>
                <a-button key="current" v-if="current === 0" style="margin-left: 20px" size="large" type="primary"
                    @click="toNext">下一步</a-button>
                <a-button key="current" v-if="current == 1" style="margin-left: 20px" size="large" type="primary"
                    @click="onSubmit">下一步</a-button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { version } from './config/index'
import { get, set } from '@/utils/localData.js'

import DynamicForm from './components/dynamic-form.vue'
import DynamicFormCost from './components/dynamic-form-cost.vue'
import ResOutput from './components/res-output.vue'
import QuickByInput from './components/quick-by-input.vue'

export default {
    name: 'App',
    components: {
        DynamicForm,
        DynamicFormCost,
        ResOutput,
        QuickByInput
    },
    setup() {
        const form = ref([{ key: 1, part: [] }])
        const userList = ref([{ key: 1, name: '使用者1' }])
        const current = ref(0)
        const total = ref(0)
        const res = ref({})
        // ref使用，记得return
        const costForm = ref()

        const handleByAI = (newUserList, newForm, newTotal)=>{
            userList.value = newUserList
            form.value = newForm
            total.value = newTotal
        } 

        const toNext = () => {
            if (current.value == 0) {
                // 存到本地
                set('account_user_list', userList.value, 60 * 24 * 1000)
            }
            current.value += 1
            // 数组去重和无效值
            const userNameMap = userList.value.reduce((all, item) => {
                all[item.name] = item.key
                return all
            }, {})
            userList.value = userList.value.filter((it) => it.name && Object.values(userNameMap).includes(it.key))
            // 金额统计去除无效值
            form.value.forEach((it) => {
                if (it.part && it.part.length) {
                    const userKeyList = userList.value.map((it) => it.key)
                    it.part = it.part.filter((i) => userKeyList.includes(i))
                }
            })
        }
        const toPrev = () => {
            current.value -= 1
        }
        const onSubmit = async () => {
            // 表单校验
            if (!(await costForm.value.onSubmit())) return
            const d = [...form.value]
            res.value = userList.value.reduce((all, item) => {
                all[item.key] = 0
                return all
            }, {})
            const totalCost = d.reduce((all, item) => {
                const average = item.cost / item.part.length
                item.part.forEach((it) => {
                    res.value[it] += average
                })
                res.value[item.coster] -= Number(item.cost)
                all += Number(item.cost)
                return all
            }, 0)
            current.value += 1
            total.value = totalCost
        }
        onMounted(() => {
            const cache = get('account_user_list')
            if (cache) {
                userList.value = cache
            }
        })
        return {
            costForm,
            form,
            current,
            userList,
            onSubmit,
            total,
            res,
            toNext,
            toPrev,
            version,
            handleByAI
        }
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: center;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    flex-direction: column;
    min-height: 100vh;
    box-sizing: border-box;
}

.danger {
    margin-bottom: 20px;
    color: crimson;
}

.steps {
    /* width: auto;
    display: flex !important;

    .ant-steps-item-tail {
        display: none;
    } */
}

.content {
    margin-top: 20px;
    justify-content: space-between;
    min-height: 60vh;
}

.ant-steps-vertical .ant-steps-item {
    display: inline-block;
}

.ant-steps-vertical>.ant-steps-item>.ant-steps-item-container>.ant-steps-item-tail {
    height: 0;
}

.ant-form-item-label {
    /* padding: 0; */
    line-height: 40px;
}
</style>
