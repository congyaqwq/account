<template>
  <div class="hello">
    <a-button @click="handleChangeVisible">
      文本转换
    </a-button>
    <a-modal v-model:visible="visible" title="提示" @ok="getData" :okButtonProps="{ disabled: isLoading || !text, text: '一键计算' }">
      <a-textarea
        :value="text"
        rows="10"
        @change="text = $event.target.value"
      ></a-textarea>
      <!-- <a-button @click="getData" :disabled="isLoading || !text"
        >一键计算，建议使用文字转语音</a-button
      > -->
      <div v-show="isLoading">Loading...</div>
    </a-modal>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "HelloWorld",
  props: {
    onAI: Function,
  },
  setup(props) {
    const text = ref("");
    const visible = ref(false);
    const isLoading = ref(false);

    function  handleChangeVisible() {
      visible.value = !visible.value;
    }

    async function getData() {
      isLoading.value = true;
      const res = await fetch("/api/gpt/workflows/run", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            input_text: this.text,
          },
          user: "Smart",
        }),
      });
      const resData = await res.json();
      const { userList, costs, total } = JSON.parse(
        resData.data.outputs.result
      );
      props.onAI(userList, costs, total);
      isLoading.value = false;
      text.value = "";
    }
    return {
      visible,
      handleChangeVisible,
      text,
      getData,
      isLoading,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
