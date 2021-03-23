<template>
  <div class="main">
    <h1>多人账单 V1.0.0</h1>
    <a-steps class="steps" :current="current" direction="vertical" size="small">
      <a-step title="选择参与人"> </a-step>
      <a-step title="消费金额统计" />
      <a-step title="结果" />
    </a-steps>
    <dynamic-form v-if="current === 0" v-model="userList"></dynamic-form>
    <dynamic-form-cost
      ref="costForm"
      v-if="current === 1"
      :userList="userList"
      v-model="form"
    ></dynamic-form-cost>
    <res-output
      v-if="current === 2"
      :total="total"
      :res="res"
      :userList="userList"
    ></res-output>
  </div>
  <div class="btn-group">
    <a-button
      v-if="current !== 0"
      style="margin-left: 20px"
      size="large"
      @click="toPrev"
      >上一步</a-button
    >
    <a-button
      key="current"
      v-if="current === 0"
      style="margin-left: 20px"
      size="large"
      type="primary"
      @click="toNext"
      >下一步</a-button
    >
    <a-button
      key="current"
      v-if="current == 1"
      style="margin-left: 20px"
      size="large"
      type="primary"
      @click="onSubmit"
      >下一步</a-button
    >
  </div>
</template>

<script>
import { ref } from "vue";
import DynamicForm from "./components/dynamic-form.vue";
import DynamicFormCost from "./components/dynamic-form-cost.vue";
import ResOutput from "./components/res-output.vue";

export default {
  name: "App",
  components: {
    DynamicForm,
    DynamicFormCost,
    ResOutput,
  },
  setup() {
    const form = ref([{ key: 1, part: [] }]);
    const userList = ref([{ key: 1, name: "使用者1" }]);
    const current = ref(0);
    const total = ref(0);
    const res = ref({});
    // ref使用，记得return
    const costForm = ref();

    const toNext = () => {
      current.value += 1;
      // 数组去重和无效值
      const userNameMap = userList.value.reduce((all, item) => {
        all[item.name] = item.key;
        return all;
      }, {});
      userList.value = userList.value.filter(
        (it) => it.name && Object.values(userNameMap).includes(it.key)
      );
      // 金额统计去除无效值
      form.value.forEach((it) => {
        if (it.part && it.part.length) {
          const userKeyList = userList.value.map((it) => it.key);
          it.part = it.part.filter((i) => userKeyList.includes(i));
        }
      });
    };
    const toPrev = () => {
      current.value -= 1;
    };
    const onSubmit = async () => {
      // 表单校验
      if (!(await costForm.value.onSubmit())) return;
      const d = [...form.value];
      res.value = userList.value.reduce((all, item) => {
        all[item.key] = 0;
        return all;
      }, {});
      const totalCost = d.reduce((all, item) => {
        const average = item.cost / item.part.length;
        item.part.forEach((it) => {
          res.value[it] += average;
        });
        res.value[item.coster] -= Number(item.cost);
        all += Number(item.cost);
        return all;
      }, 0);
      current.value += 1;
      total.value = totalCost;
    };
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
    };
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
}
.ant-steps-vertical .ant-steps-item {
  display: inline-block;
}
.ant-steps-vertical
  > .ant-steps-item
  > .ant-steps-item-container
  > .ant-steps-item-tail {
  height: 0;
}
.ant-form-item-label {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
