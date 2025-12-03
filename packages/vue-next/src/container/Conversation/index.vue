<template>
  <div class="layout">
    <aside class="sidebar">
      <n-button class="icon-new" @click="handleCompAddConversation">
        + 新建
      </n-button>
      <ul>
        <conversation-item
          v-for="conversation in conversationList"
          :key="conversation.conversationId"
          :conversation="conversation"
          :active="conversation.conversationId === curConversationId"
          @onSwitchConversation="handleCompSwitchConversation(conversation)"
          @onDeleteConversation="handleCompDeleteConversation"
          @onUpdateConversation="handleCompUpdateConversation"
        ></conversation-item>
      </ul>
    </aside>
  </div>
</template>

<script setup lang="ts">
import ConversationItem from '../../components/ConversationItem/index.vue';
import { NButton } from 'naive-ui';
import { conversationInject } from '../../hooks/useConversation';

defineOptions({
  name: 'ms-chat-conversation',
});

const emits = defineEmits([
  'onAddConversation',
  'onSwitchConversation',
  'onDeleteConversation',
  'onUpdateConversation',
]);

const conversationHook: any = conversationInject();
const {
  conversationList,
  curConversationId,
} = conversationHook || {};
const handleCompAddConversation = () => {
  emits('onAddConversation');
};

const handleCompSwitchConversation = (conversation: any) => {
  emits('onSwitchConversation', conversation);
};

const handleCompUpdateConversation = (params: any) => {
  emits('onUpdateConversation', params);
};

const handleCompDeleteConversation = (conversationId: any) => {
  emits('onDeleteConversation', conversationId);
};
</script>

<style scoped lang="less">
@import url('./index.less');
</style>
