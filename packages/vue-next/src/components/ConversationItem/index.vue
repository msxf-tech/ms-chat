<template>
  <li
    :class="['item', active && 'active']"
    @click="$emit('onSwitchConversation')"
    @mouseenter="isShowIcon = true"
    @mouseleave="isShowIcon = false"
  >
    <p class="name">{{ conversation.name }}</p>
    <n-popselect
      v-model:value="selectedItem"
      :options="options"
      trigger="click"
      :on-update:value="handleMenuItemSelect"
    >
      <img v-show="isShowIcon" class="icon-conversation-more" :src="IconMore" />
    </n-popselect>
  </li>
</template>

<script setup lang="ts">
import { ref, h } from 'vue';
import type { Conversation } from '../../types';
import IconMore from '../../assets/more.svg?url';
import { NInput, NPopselect, createDiscreteApi } from 'naive-ui';

const props = defineProps<{ conversation: Conversation; active: boolean }>();
const emits = defineEmits([
  'onSwitchConversation',
  'onDeleteConversation',
  'onUpdateConversation',
]);
const { dialog, message } = createDiscreteApi(['dialog', 'message']);

const isShowIcon = ref(false); // 控制图标是否渲染
const inputValue = ref('');
const selectedItem = ref('');
const options = ref([
  {
    label: '更新名称',
    value: 'updateName',
  },
  {
    label: '删除会话',
    value: 'deleteConversation',
  },
]);

const handleMenuItemSelect = (value: string) => {
  if (value === 'deleteConversation') {
    dialog.info({
      title: '确定删除此会话?',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        const { conversationId, name = '' } = props?.conversation || {};
        emits('onDeleteConversation', conversationId);
        message.success(`已删除会话【${name}】`);
      },
    });
  } else if (value === 'updateName') {
    dialog.info({
      title: '修改对话名',
      positiveText: '确定',
      negativeText: '取消',
      content: () =>
        h(NInput, {
          value: inputValue.value,
          'allow-input': (value: string) => {
            return !value.startsWith(' ') && !value.endsWith(' ');
          },
          'onUpdate:value': (v: string) => (inputValue.value = v),
          placeholder: '请输入内容',
        }),
      onPositiveClick: () => {
        emits('onUpdateConversation', {
          conversationId: props?.conversation?.conversationId,
          name: inputValue.value,
        });
        message.success('修改成功');
      },
    });
  }
};
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
