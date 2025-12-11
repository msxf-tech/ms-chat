<template>
  <div>
    {{ content }}
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import type { ITextMessageProps } from '@ms-chat/core';

defineProps<ITextMessageProps>();
onMounted(() => {
});

</script>

<style lang='less' scoped>
</style>