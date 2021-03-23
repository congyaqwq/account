<template>
  <h2>总消费：{{ total }}</h2>
  <div class="res-output">
    <div class="item center-flex" v-for="(value, key) in res" :key="key">
      <div class="name">{{ userMap[key] }}</div>
      <div class="price">
        <b>{{ value > 0 ? "出" : "获" }}</b>
      </div>
      <div>{{ Math.abs(value) }}元</div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
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
    const userMap = computed(() => {
      return props.userList.reduce((total, item) => {
        total[item.key] = item.name;
        return total;
      }, {});
    });
    return {
      userMap,
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
</style>