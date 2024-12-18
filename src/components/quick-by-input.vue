<template>
  <div class="hello">
    <a-textarea
      :value="text"
      rows="2"
      @change="text = $event.target.value"
    ></a-textarea>
    <a-button @click="getData" :disabled="isLoading">一键计算，建议使用文字转语音</a-button>
    <div v-show="isLoading">Loading...</div>
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
    console.log(props,'props')
    const text = ref("");
    const isLoading = ref(false);
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
      const resData  = await res.json()
      console.log(resData)
      const { userList, costs, total } = JSON.parse(resData.data.outputs.result);
      props.onAI(userList, costs, total);
      isLoading.value = false;
      text.value = "";
    }
    return {
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
