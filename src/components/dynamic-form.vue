<template>
  <div class="icon-wrap">
    <PlusSquareOutlined style="font-size: 2rem" @click="add" />
  </div>
  <a-form layout="horizontal" :model="form" v-bind="formItemLayout">
    <div
      v-for="(it, i) in modelValue"
      :key="it.key"
      class="item middle-flex between-flex"
    >
      <a-form-item class="form-item" label="名字">
        <div class="middle-flex">
          <a-input
            placeholder="请输入"
            v-model:value="form[i].name"
            @change="$emit('update:modelValue', form)"
          />
          <DeleteOutlined
            class="delete center-flex"
            @click="form.splice(i, 1)"
          />
        </div>
      </a-form-item>
    </div>
  </a-form>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    DeleteOutlined,
    PlusSquareOutlined,
  },
  props: {
    modelValue: Array,
    default: () => [],
  },
  setup(props, { emit }) {
    const form = computed({
      get: () => {
        return props.modelValue;
      },
      set: (val) => {
        emit("update:modelValue", val);
      },
    });
    const add = () => {
      form.value = [
        ...form.value,
        {
          key: ~~(Math.random() * 100000),
          name: `使用者${form.value.length + 1}`,
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
    };
  },
};
</script>

<style lang="less" scoped>
.icon-wrap {
  text-align: left;
  svg {
    width: 100%;
    height: 100%;
  }
}
.item {
  .form-item {
    flex: 1;
  }
}
.delete {
  width: 30px;
  height: 30px;
}
</style>