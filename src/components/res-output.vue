<template>
    <div>
        <a-radio-group class="radio" v-model:value="type">
            <a-radio-button value="detail"> 消费明细 </a-radio-button>
            <a-radio-button value="transfer"> 快速转账 </a-radio-button>
        </a-radio-group>
        <div class="tips">*差值小于0.01</div>
    </div>
    <div v-if="type === 'detail'">
        <h2>总消费：{{ total }}</h2>
        <div class="res-output">
            <div class="item center-flex" v-for="(value, key) in res" :key="key">
                <div class="name">{{ userMap[key] }}</div>
                <div class="price">
                    <b>{{ value > 0 ? "出" : "获" }}</b>
                </div>
                <div>{{ Math.abs(value).toFixed(2) }}元</div>
            </div>
        </div>
    </div>
    <transfer-account v-if="type === 'transfer'" :res="res" :userMap="userMap"></transfer-account>
</template>

<script>
import { computed, ref } from "vue";

import TransferAccount from "./transfer-account.vue";

export default {
    components: {
        TransferAccount,
    },
    props: {
        total: {
            type: Number,
            default: 0,
        },
        res: {
            type: Object,
            default: () => ({}),
        },
        userList: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const type = ref("detail");
        const userMap = computed(() => {
            return props.userList.reduce((total, item) => {
                total[item.key] = item.name;
                return total;
            }, {});
        });
        return {
            userMap,
            type,
        };
    },
};
</script>

<style lang="less" scoped>
.res-output {
    font-size: 20px;
}

.price {
    margin: 0 20px;
}

.radio {
    margin-bottom: 15px;
}
</style>
