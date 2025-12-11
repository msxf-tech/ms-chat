<template>
  <div class="sender">
    <div class="sender-top">
      <slot name="sender-top" />
    </div>
    <div class="sender-textarea-wrap">
      <div class="sender-header">
        <slot name="sender-header" />
      </div>
      <textarea class="sender-textarea" :disabled="disabled" :value="query" :placeholder="placeholder"
        :maxlength="maxlength" @input="handleInputChange" @keyup="handleKeyUp" @keydown="handleKeyDown" @focus="onfocus"
        autoSize />
      <div class="sender-pop" v-if="!hidden">
        <n-icon size="24" :depth="3" @click="openUpload">
          <Attach />
        </n-icon>
        <n-popover trigger="hover" placement="top-start">
          <template #trigger>
            <div v-if="!pending" class="sender-pop-trigger"
              :class="(query.length && !pending) ? 'sender-pop-trigger2' : ''" @click="handleSendMessage">
            </div>
            <div v-else class="sendBtnPending-wrap">
              <div class="sendBtnPending cursor-pointer rounded-md" @click="handleStopSend"></div>
              <div class="sendBtnPending-bg"></div>
            </div>
          </template>
          <div>
            <div>发送 Enter</div>
            <div>换行 Shift Enter</div>
          </div>
        </n-popover>
      </div>
      <div class="sender-footer">
        <slot name="sender-footer" />
      </div>
    </div>
    <Upload v-model:showUpload="showUpload" @upload="uploadFiles" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { NPopover, NIcon } from 'naive-ui';
import { Attach } from '@vicons/ionicons5';
import Upload from './Upload.vue';

interface IInput {
  maxlength?: number,
  pending: boolean,
  hidden: boolean,
  disabled: boolean,
  placeholder: string,
  onfocus: (e: FocusEvent) => void,
  query: string,
}

interface Props {
  input: IInput
}

const props = withDefaults(defineProps<Props>(), {
  input: () => {
    return {
      pending: false,
      hidden: false,
      disabled: false,
      placeholder: '',
      onfocus: () => { },
      query: '',
    }
  }
});

const emit = defineEmits<{
  'update:query': [msgInput: Record<'query', string>]
  'sendMsg': []
  'stopMsg': []
  'uploadFiles': [files: unknown[]]
}>();

const showUpload = ref(false);

const openUpload = () => showUpload.value = true;

const uploadFiles = (files: unknown[]) => {
  emit('uploadFiles', files);
};

/**
 * textarea maxlength
 */
const maxlength = computed(() => {
  const maxLen = props.input.maxlength;
  if (maxLen && typeof (maxLen) === 'number' && maxLen >= 0) {
    return maxLen;
  }
  return Number.MAX_SAFE_INTEGER;
});

/**
 * textarea value
 */
const query = computed(() => {
  return props.input.query;
});

/**
 * textarea disabled
 */
const disabled = computed(() => {
  return props.input.disabled;
});

/**
 * 是否隐藏发送按钮
 */
const hidden = computed(() => {
  return props.input.hidden;
});

/**
 * 是否正在请求数据
 */
const pending = computed(() => {
  return props.input.pending;
});

/**
 * textarea placeholder
 */
const placeholder = computed(() => {
  return props.input.placeholder;
});

/**
 * textarea onfocus 触发
 */
const onfocus = computed(() => {
  return props.input.onfocus;
});

/**
 * 监听 textarea oninput 事件 触发query更新事件
 */
const handleInputChange = (e: Event) => {
  const target = e.target as HTMLTextAreaElement;
  emit('update:query', { query: target.value });
};

/**
 * 监听键盘事件 实现Enter发送消息
 * @param {KeyboardEvent} e 键盘事件
 */
const handleKeyUp = (e: KeyboardEvent) => {
  if (e.code === 'Enter') {
    e.preventDefault();
    if (!e.shiftKey) {
      handleSendMessage();
    }
  }
};

/**
 * 监听键盘事件 避免Enter换行
 * @param {KeyboardEvent} e 键盘事件
 */
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.code === 'Enter' && !e.shiftKey) {
    e.preventDefault();
  }
};

/**
 * 发送消息
 */
const handleSendMessage = () => {
  if (!query.value.length || disabled.value) return;
  emit('sendMsg');
};

/**
 * 暂停消息请求
 */
const handleStopSend = () => {
  emit('stopMsg');
};

</script>
<style scoped lang="less">
@import url('./index.less');
</style>
