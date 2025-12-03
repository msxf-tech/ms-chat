<template>
  <div class="chat-bubble-content-markdown">
    <div v-for="(item, idx) in strr" :key="idx">
      <div v-if="item.type">
        <slot name="mdExt" v-bind="item" />
      </div>
      <div v-else v-html="markdown.render(item.content)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
import type { IMarkdownMessageProps } from '@ms-chat/core';

const props = defineProps<IMarkdownMessageProps>();
const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true,
}).use(MarkdownItHighlightjs);
const strr = computed(() => {
  if (!props.content) return [];
  return Array.isArray(props.content)
    ? props.content
    : [{ content: props.content }];
});
</script>

<style scoped>
.chat-bubble-content-markdown {
  padding-left: 10px;
}
:deep(pre) {
  white-space: pre-wrap;
  word-break: break-all;
  overflow-wrap: break-word;
}

</style>
