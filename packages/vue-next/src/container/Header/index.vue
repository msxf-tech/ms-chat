<template>
  <Header v-if="!headerHidden" :title="curConversationName"/>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import Header from '../../components/Header/index.vue';
  import { chatStoreInject } from '../../hooks/useChatStore';
  const chatStore = chatStoreInject();
  // 当前会话标题
  const curConversationName = computed(() => {
    return chatStore?.state?.chatConfig?.header?.options?.title;
  });
  const headerHidden = computed(() => {
    return chatStore?.state?.chatConfig?.header?.hidden;
  });
</script>

<style scoped></style>
