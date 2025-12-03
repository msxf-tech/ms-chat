<!--
 * Chat 主入口组件
 * ----------------
 * 职责：
 * 1. 统一承载聊天布局（Main.vue）。
 * 2. 初始化并注入全局状态（useChatStore）。
 * 3. 暴露给父组件：当前 state 与 _pushMessageStore 方法 & _conversationStore 方法。
 * 
 * 组件调用链：App.vue → Main.vue → (ChatPC | ChatH5 | ChatBubble) -> container(hooks) -> components
-->
<template>
  <Main v-bind="{ ...$attrs, ...props }">
    <template v-for="(_, slot) in $slots" #[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
  </Main>
</template>

<script setup lang="ts">
import Main from './layout/Main.vue';
import useChatStore, { chatStoreProvide } from './hooks/useChatStore';
import usePushMessage, { pushMessageProvide } from './hooks/usePushMessage';
import useConversation, { conversationProvide } from './hooks/useConversation';
import type { IMsChatProps } from './types/index';

const props = defineProps<IMsChatProps>();

const _chatStore = useChatStore(props);

chatStoreProvide(_chatStore);

const _conversationStore = useConversation(_chatStore);
const _pushMessageStore = usePushMessage(_chatStore);

pushMessageProvide(_pushMessageStore);
conversationProvide(_conversationStore);

defineExpose({
  get state() {
    return _chatStore?.state;
  },
  addConversation: _conversationStore.addConversation,
  switchConversation: _conversationStore.switchConversation,
  updateConversation: _conversationStore.updateConversation,
  deleteConversation: _conversationStore.deleteConversation,
  pushMessage: _pushMessageStore.pushMessage,
  updateSenderPending: _pushMessageStore.updateSenderPending,
  setInput: _pushMessageStore.setInput,
});
</script>
