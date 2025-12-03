<template>
  <ChatMessages :data="messageList" :config="config">
    <template v-for="(_, slot) in $slots" #[slot]="props">
      <slot :name="slot" v-bind="props"/>
    </template>
  </ChatMessages>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue';
import { chatStoreInject } from '../../hooks/useChatStore';
import ChatMessages from '../..//components/ChatMessages/index.vue';

const chatStore = chatStoreInject();
const messageList = computed(() => {
  return chatStore.state.messageList;
});
const config = computed(() => {
  return {
    bubble: chatStore.state.chatConfig?.bubble
  };
});
</script>

<style scoped></style>
