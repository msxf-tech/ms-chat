<template>
  <Sender
    :input="input"
    @update:query="setMsgInput"
    @sendMsg="sendMsg"
    @stopMsg="stopMsg"
    @uploadFiles="uploadFiles"
  >
    <template v-if="$slots['sender-top']" #sender-top>
      <slot name="sender-top" :scope="scope" />
    </template>
    <template v-if="$slots['sender-header']" #sender-header>
      <slot name="sender-header" :scope="scope" />
    </template>
    <template v-if="$slots['sender-footer']" #sender-footer>
      <slot name="sender-footer" :scope="scope" />
    </template>
  </Sender>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Sender from '../../components/Sender/index.vue';
import { chatStoreInject } from '../../hooks/useChatStore';
import { pushMessageInject } from '../../hooks/usePushMessage';

const emits = defineEmits(['sendMsg', 'stopMsg', 'uploadFiles']);

/**
 * 获取 store
 */
const chatStoreHook = chatStoreInject();
const { initMsgInput, setMsgInput } = chatStoreHook;

const pushMessageHook = pushMessageInject();
const { pending } = pushMessageHook;

/**
 * 获取用户配置
 */
const config = computed(() => {
  return chatStoreHook.state.chatConfig;
});

/**
 * 构建 Sender props input
 */
const input = computed(() => {
  const query = chatStoreHook.state.msgInput.query;
  const senderOptions = config.value?.sender?.options;
  return {
    maxlength: senderOptions?.maxlength || Number.MAX_SAFE_INTEGER,
    pending: pending.value || false,
    disabled: senderOptions?.disabled || false,
    hidden: senderOptions?.hidden || false,
    placeholder: senderOptions?.placeholder || '',
    onfocus: senderOptions?.onfocus as (e:FocusEvent) => void || ((e: FocusEvent) => {}),
    query,
  };
});

/**
 * 发送消息事件 Sender emits sendMsg
 */
const sendMsg = () => {
  const query = chatStoreHook.state.msgInput.query;
  emits('sendMsg', query);
};

/**
 * 暂停消息请求 Sender emits stopMsg
 */
const stopMsg = () => {
  emits('stopMsg');
};

/**
 * 处理上传文件
 */
const uploadFiles = (files: unknown[]) => {
  emits('uploadFiles', files);
};

/**
 * 插槽暴露的scope数据
 */
const scope = computed(() => {
  return {
    input,
    initMsgInput,
    setMsgInput,
    sendMsg,
    stopMsg,
    uploadFiles,
  };
});
</script>

<style scoped></style>
