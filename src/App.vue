<template>
  <div class="main">
    <h1>算账管理</h1>
    <a-steps :current="current" direction="vertical">
      <a-step title="选择参与人">
        <!-- <span slot="title">Finished</span> -->
      </a-step>
      <a-step title="消费金额统计" />
      <a-step title="计算结果" />
    </a-steps>
    <dynamic-form v-if="current === 0" v-model="userList"></dynamic-form>
    <dynamic-form-cost
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
    <a-button
      v-if="current !== 0"
      style="margin-left: 20px"
      size="large"
      @click="current -= 1"
      >上一步</a-button
    >
    <a-button
      key="current"
      v-if="current === 0"
      style="margin-left: 20px"
      size="large"
      type="primary"
      @click="current += 1"
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
    const form = ref([{ key: 1 }]);
    const userList = ref([{ key: 1, name: "使用者1" }]);
    const current = ref(0);
    const total = ref(0);
    const res = ref({});
    const onSubmit = () => {
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
        res.value[item.coster] -= item.cost;
        all += item.cost;
        return all;
      }, 0);
      console.log(res.value);
      current.value += 1;
      total.value = totalCost;
    };
    return {
      form,
      current,
      userList,
      onSubmit,
      total,
      res,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
  padding: 0 20px;
  text-align: center;
}
</style>
