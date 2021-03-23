<template>
  <div class="icon-wrap between-flex middle-flex">
    <a-button class="btn" type="primary" @click="add">添加</a-button>
    <a-radio-group v-model:value="autoInsert">
      <a-radio-button :value="1">自动填充</a-radio-button>
      <a-radio-button :value="0">关闭自动填充</a-radio-button>
    </a-radio-group>
  </div>
  <a-form :model="form" v-bind="formItemLayout">
    <div
      v-for="(it, i) in form"
      :key="it.key"
      class="item middle-flex between-flex"
    >
      <a-form-item class="form-item" label="名字">
        <div class="middle-flex">
          <a-input
            placeholder="请输入"
            v-model:value="form[i].name"
            @change="change(form)"
          />
          <DeleteOutlined
            v-if="form.length !== 1"
            class="delete center-flex"
            @click="form.splice(i, 1)"
          />
        </div>
      </a-form-item>
    </div>
  </a-form>
</template>

<script>
import { computed, ref } from "vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    DeleteOutlined,
  },
  props: {
    modelValue: Array,
    default: () => [],
  },
  setup(props, { emit }) {
    const index = ref(1);
    const autoInsert = ref(1);
    const form = computed({
      get: () => {
        return props.modelValue;
      },
      set: (val) => {
        change(val);
      },
    });
    const change = (val) => {
      emit("update:modelValue", val);
    };
    const add = () => {
      form.value = [
        ...form.value,
        {
          key: ~~(Math.random() * 100000),
          name: autoInsert.value ? `使用者${++index.value}` : "",
        },
      ];
    };
    return {
      form,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      add,
      autoInsert,
      change,
    };
  },
};
</script>

<style lang="less" scoped>
.icon-wrap {
  .btn {
    margin: 10px 0;
  }
}
.item {
  padding: 10px 0;
  border-bottom: 1px solid #efefef;
  &:last-child {
    border-bottom: none;
  }
  .form-item {
    flex: 1;
  }
}
.delete {
  width: 30px;
  height: 30px;
}
/deep/ .ant-form-item {
  margin-bottom: 10px;
}
</style>