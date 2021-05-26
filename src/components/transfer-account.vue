<template>
  <div v-html="resStr"></div>
</template>

<script>
export default {
  props: {
    res: {
      type: Object,
      default: () => ({}),
    },
    userMap: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    let pay = [];
    let receive = [];
    let resStr = "";
    Object.keys(props.res).forEach((it) => {
      if (props.res[it] > 0) pay.push({ id: it, val: props.res[it] });
      if (props.res[it] < 0) receive.push({ id: it, val: -props.res[it] });
    });
    // 计算某个元素在数组中的最小差值
    const minSub = (num, arr2) => {
      let arr = arr2.map((it) => Math.abs(it.val - num));
      let target = arr.sort((a, b) => a - b)[0];
      return arr.indexOf(target);
    };
    const strJoin = (payMan, getMan, amount) => {
      resStr += `<div class="row"><strong>${payMan}</strong> 给 <strong>${getMan}</strong>转账<strong>${amount.toFixed(2)}</strong>元</div>`;
    };
    const getRes = (arr) => {
      if (arr.every((it) => it.val < 0.01)) return;
      if (!arr || !arr.length) return;
      console.log(arr, 1);
      arr.forEach((it, i) => {
        const index = minSub(it.val, receive);
        if (index == -1) return;
        const payUser = props.userMap[it.id];
        const receiveUser = props.userMap[receive[index].id];
        if (it.val - receive[index].val > 0) {
          strJoin(payUser, receiveUser, receive[index].val);
          it.val = it.val - receive[index].val;
          receive.splice(index, 1);
        } else if (it.val - receive[index].val < 0) {
          strJoin(payUser, receiveUser, it.val);
          receive[index].val = receive[index].val - it.val;
          arr.splice(i, 1);
        } else {
          strJoin(payUser, receiveUser, it.val);
          receive.splice(index, 1);
          arr.splice(i, 1);
        }
      });
      return getRes(arr);
    };
    getRes(pay);
    return {
      resStr,
    };
  },
};
</script>

<style lang="less">
.row {
  margin: 10px 0;
  font-size: 20px;
}
</style>