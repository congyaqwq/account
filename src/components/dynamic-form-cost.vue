<template>
  <div class="icon-wrap">
    <PlusSquareOutlined
      style="font-size: 2rem"
      @click="
        form.push({
          key: ~~(Math.random() * 100000),
          name: `使用者${form.length + 1}`,
        })
      "
    />
  </div>
  <a-form layout="horizontal" :model="form" v-bind="formItemLayout">
    <div v-for="(it, i) in form" :key="it.key" class="item">
      <a-form-item class="form-item" label="消费人">
        <a-select
          placeholder="请选择"
          v-model:value="form[i].coster"
          @change="$emit('update:modelValue', form)"
        >
          <a-select-option v-for="it in userList" :key="it.key">{{
            it.name
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item class="form-item" label="金额">
        <a-input
          type="number"
          placeholder="请输入"
          v-model:value="form[i].cost"
          @change="$emit('update:modelValue', form)"
        />
      </a-form-item>
      <a-form-item class="form-item" label="参与人">
        <div class="between-flex middle-flex">
          <a-select
            placeholder="请选择"
            v-model:value="form[i].part"
            mode="multiple"
            @change="$emit('update:modelValue', form)"
          >
            <a-select-option v-for="it in userList" :key="it.key">{{
              it.name
            }}</a-select-option>
          </a-select>
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
    modelValue: { type: Array, default: () => [] },
    userList: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    const form = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val),
    });
    return {
      form,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
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