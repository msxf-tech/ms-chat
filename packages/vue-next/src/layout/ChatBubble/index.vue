<!--
 * ChatBubble.vue – 悬浮气泡入口
 * ----------------------------
 * 职责：
 * 1. 右下角固定气泡按钮，点击切换聊天面板显隐。
 * 2. 内部嵌套 ChatH5 组件。
 -->
<template>
  <div>
    <div
      class="chat-toggle"
      :style="{
        backgroundImage: `url(${bubbleOptions?.iconBgUrl || defaultIconBgUrl})`,
      }"
      @click="toggleChat"
      aria-label="打开对话"
    >
      {{ bubbleOptions?.iconTitle }}
    </div>
    <!-- 使用 ChatH5 组件并启用拖拽 -->
    <ChatH5
      v-if="visible"
      v-bind="$attrs"
      :draggable="true"
      :draggable-options="{
        initialPosition: { x: rect.x, y: rect.y },
        initialSize: { width: rect.w, height: rect.h },
        minSize: { width: 300, height: 500 },
        showCloseButton: true,
        onClose: toggleChat,
      }"
    >
      <template v-for="(_, slot) in $slots" #[slot]="props">
        <slot :name="slot" v-bind="props" />
      </template>
    </ChatH5>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IMsChatProps } from '../../types/index';
import useDraggable from '../hooks/useChatBubble';
import ChatH5 from '../ChatH5/index.vue';

const props = defineProps<IMsChatProps>();

const { visible, toggleChat, rect } = useDraggable();

const defaultIconBgUrl = computed(() => {
  return (
    props.bubbleOptions?.iconBgUrl ||
    'http://poweragent.msxf.local/abp-static/imgs/avatar/agent/light_purple.svg'
  );
});
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
