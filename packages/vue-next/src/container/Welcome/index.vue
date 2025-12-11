<template>
  <Welcome :content="config?.welcome?.options?.content" @setInput="setItemToInput" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Welcome from '../../components/Welcome/index.vue';
import { chatStoreInject } from '../../hooks/useChatStore';
import { pushMessageInject } from '../../hooks/usePushMessage';

const chatStoreHook = chatStoreInject();

const { setInput } = pushMessageInject();

const config = computed(() => {
  return chatStoreHook.state.chatConfig;
});

const setItemToInput = async (item: string) => {
  setInput(item);
};
</script>

<style scoped></style>
