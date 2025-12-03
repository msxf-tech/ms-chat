<template>
  <div class="chat-bubble" :class="[`chat-bubble-${role}`]">
    <div class="chat-avatar">
      <n-avatar
        v-if="bubble?.avatar && bubble?.avatar.src"
        round
        size="small"
        :src="bubble?.avatar.src"
      />
      <n-avatar round size="small" v-else>
        <n-icon size="20">
          <PersonOutline />
        </n-icon>
      </n-avatar>
    </div>
    <div
      class="chat-bubble-content-wrapper"
      :class="[`chat-bubble-content-wrapper-${role}`]"
    >
      <div class="chat-bubble-content-header">
        <slot v-if="$slots['bubble-header']" name="bubble-header"></slot>
        <div v-else-if="bubble?.name" class="bubble-name">
          {{ bubble?.name }}
        </div>
      </div>
      <div class="chat-bubble-content" :class="[`chat-bubble-content-${role}`]">
        <ChatMessageCard :content="content" :type="type">
          <template v-for="(_, slot) in $slots" #[slot]="props">
            <slot :name="slot" v-bind="props" />
          </template>
        </ChatMessageCard>
        <div class="chat-bubble-actions">
          <n-button tertiary circle text @click="copyText(content)">
            <template #icon>
              <n-icon size="14"><CopyOutline /> </n-icon>
            </template>
            <span class="chat-bubble-actions-copy-text">复制</span>  
          </n-button>
        </div>
      </div>

      <div class="chat-bubble-content-footer">
        <slot v-if="$slots['bubble-footer']" name="bubble-footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NAvatar, NIcon, NButton } from 'naive-ui';
import { PersonOutline, CopyOutline } from '@vicons/ionicons5';
import ChatMessageCard from '../ChatMessageCard/index.vue';

interface Iprops {
  role?: string;
  bubble?: {};
  content: string;
  type: string;
  // 消息信息 content + config里的bubble
}
const props = withDefaults(defineProps<Iprops>(), {});
const copyText = (textToCopy: string) => {
  navigator.clipboard
    .writeText(textToCopy) // 将文本写入剪贴板
    .then(() => {
    })
    .catch(() => {
      console.log('复制失败，请手动复制！');
    });
};
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
