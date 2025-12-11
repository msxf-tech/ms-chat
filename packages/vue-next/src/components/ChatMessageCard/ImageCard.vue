<template>
  <div>
    <n-image :width="width" :src="url" />
  </div>
</template>

<script setup lang="ts">
import { NImage } from 'naive-ui';
import type { IImageMessageProps } from '@ms-chat/core';

const props = withDefaults(defineProps<IImageMessageProps>(), {
  width: 100,
});
</script>

<style scoped></style>
