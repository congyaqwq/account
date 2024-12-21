<template>
  <div class="quick-input-container">
    <a-button @click="handleChangeVisible">
      AI 文本转换
    </a-button>
    <a-modal
      v-model:visible="visible"
      :title="modalTitle"
      @ok="handleSubmit"
      :okButtonProps="okButtonProps"
      :cancelText="cancelText"
      :okText="okText"
      :maskClosable="false"
      @cancel="handleCancel"
    >
      <a-textarea
        v-model:value="text"
        autofocus
        :rows="10"
        :placeholder="placeholder"
        :disabled="isLoading"
      />
      <template #footer>
        <div class="modal-footer">
          <a-spin v-if="isLoading" />
          <div class="modal-buttons">
            <a-button @click="handleCancel">{{ cancelText }}</a-button>
            <a-button
              type="primary"
              :loading="isLoading"
              :disabled="!text.trim()"
              @click="handleSubmit"
            >
              {{ okText }}
            </a-button>
          </div>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { message } from "ant-design-vue";

export default {
  name: "QuickInput",
  props: {
    onAI: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    // Constants
    const API_ENDPOINT = "/gpt/workflows/run";
    const modalTitle = "提示";
    const cancelText = "取消";
    const okText = "确认";
    const placeholder = "推荐使用语音输入";

    // Reactive state
    const text = ref("");
    const visible = ref(false);
    const isLoading = ref(false);

    // Computed properties
    const okButtonProps = computed(() => ({
      disabled: isLoading.value || !text.value.trim(),
      text: okText,
    }));

    // Methods
    function handleChangeVisible() {
      visible.value = !visible.value;
      if (!visible.value) {
        text.value = "";
      }
    }

    function handleCancel() {
      text.value = "";
      visible.value = false;
    }

    async function handleSubmit() {
      if (!text.value.trim()) return;

      try {
        isLoading.value = true;
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: {
              input_text: text.value.trim(),
            },
            user: "Smart",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resData = await response.json();
        const { userList, costs, total } = JSON.parse(
          resData.data.outputs.result
        );

        props.onAI(userList, costs, total);
        message.success("处理成功");
        handleCancel();
      } catch (error) {
        console.error("Error processing data:", error);
        message.error("处理失败，请重试");
      } finally {
        isLoading.value = false;
      }
    }

    return {
      // Constants
      modalTitle,
      cancelText,
      okText,
      placeholder,
      // State
      text,
      visible,
      isLoading,
      // Computed
      okButtonProps,
      // Methods
      handleChangeVisible,
      handleCancel,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.quick-input-container {
  margin-bottom: 30px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.modal-buttons {
  display: flex;
  gap: 8px;
}
</style>
