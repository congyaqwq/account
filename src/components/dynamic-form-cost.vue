<template>
  <div>
    <div class="icon-wrap">
      <a-button
        class="btn"
        type="primary"
        @click="
          form.data.push({
            key: ~~(Math.random() * 100000),
            part: [],
          })
        "
        >添加</a-button
      >
    </div>
    <a-form :model="form" ref="submitForm" v-bind="formItemLayout">
      <div v-for="(it, i) in form.data" :key="it.key" class="item">
        <a-form-item
          class="form-item"
          label="消费人"
          :name="['data', i, 'coster']"
          :rules="{ required: true, message: '请选择', type: 'number' }"
        >
          <a-select placeholder="请选择" v-model:value="it.coster" @change="$emit('update:modelValue', form.data)">
            <a-select-option v-for="it in userList" :key="it.key">{{ it.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          class="form-item"
          label="金额"
          :name="['data', i, 'cost']"
          :rules="{ required: true, message: '请输入' }"
        >
          <a-input
            type="number"
            placeholder="请输入"
            allowClear
            v-model:value="it.cost"
            @change="$emit('update:modelValue', form.data)"
          />
        </a-form-item>
        <a-form-item
          class="form-item"
          label="参与人"
          :name="['data', i, 'part']"
          :rules="{
            required: true,
            message: '请选择',
            type: 'array',
            trigger: ['change', 'blur'],
          }"
        >
          <div class="between-flex middle-flex check-box">
            <a-checkbox-group
              v-model:value="it.part"
              :options="computedUserList"
              @change="$emit('update:modelValue', form.data)"
            >
              <!-- <a-select-option v-for="it in userList" :key="it.key">{{ it.name }}</a-select-option> -->
            </a-checkbox-group>
            <DeleteOutlined v-if="form.data.length !== 1" class="delete center-flex" @click="form.data.splice(i, 1)" />
          </div>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
export default {
  components: {
    DeleteOutlined,
  },
  props: {
    modelValue: { type: Array, default: () => [] },
    userList: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    const form = computed({
      get: () => ({ data: props.modelValue }),
      set: (val) => emit('update:modelValue', val.data),
    })
    const submitForm = ref(null)
    const computedUserList = computed(() => {
      return props.userList.map((it) => ({ label: it.name, value: it.key }))
    })
    const onSubmit = async () => {
      return await submitForm.value
        .validate()
        .then(() => {
          return true
        })
        .catch((error) => {
          console.log('error', error)
          return false
        })
    }
    return {
      form,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      onSubmit,
      submitForm,
      computedUserList,
    }
  },
}
</script>

<style lang="less" scoped>
.icon-wrap {
  text-align: left;
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
  align-self: end;
  width: 30px;
  height: 30px;
}
/deep/ .ant-form-item {
  margin-bottom: 10px;
}
.check-box {
  min-height: 40px;
  margin-bottom: 10px;
}
/deep/ .ant-checkbox-group-item {
  margin: 5px;
}
</style>
