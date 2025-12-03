<!--
 * ChatH5.vue – 内嵌模式聊天布局
 * ------------------------------------------
 * 职责：
 * 1. 按「header - body - footer」三段式排布。
 * 2. 提供 header / welcome / sender 三个具名插槽，可完全覆盖默认组件。
 -->
<template>
  <DraggableContainer
    class="chat-h5-draggable"
    mode="h5"
    :draggable="draggable"
    v-bind="draggableOptions"
  >
    <div class="chat-layout-h5">
      <div class="chat-header" ref="headerRef">
        <slot name="header" />
        <template v-if="!$slots.header">
          <HeaderContainer />
        </template>
      </div>
      <div class="chat-body" :style="{ height: `calc(${contentHeight})` }">
        <ChatMessagesContainer v-if="hasMessageList">
          <template v-for="(_, slot) in $slots" #[slot]="props">
            <slot :name="slot" v-bind="props" />
          </template>
        </ChatMessagesContainer>
        <div class="welcome-wrap" v-else>
          <slot name="welcome" />
          <template v-if="!$slots.welcome">
            <WelcomeContainer />
          </template>
        </div>
      </div>
      <div class="chat-footer" ref="footerRef">
        <slot name="sender" />
        <template v-if="!$slots.sender">
          <SenderContainer
            @sendMsg="sendMsg"
            @stopMsg="stopMsg"
            @uploadFiles="uploadFiles"
          >
            <template v-for="(_, slot) in $slots" #[slot]="props">
              <slot :name="slot" v-bind="props" />
            </template>
          </SenderContainer>
        </template>
      </div>
    </div>
  </DraggableContainer>
</template>

<script setup lang="ts">
import HeaderContainer from '../../container/Header/index.vue';
import WelcomeContainer from '../../container/Welcome/index.vue';
import ChatMessagesContainer from '../../container/ChatMessages/index.vue';
import SenderContainer from '../../container/Sender/index.vue';
import DraggableContainer from '../../components/DraggableContainer/index.vue';
import type { IMsChatProps } from '../../types/index';
import useChatLayout from '../hooks/useChatLayout';

const props = defineProps<IMsChatProps>();

console.log('props  H5===', props);

const {
  headerRef,
  footerRef,
  contentHeight,
  hasMessageList,
  sendMsg,
  stopMsg,
  uploadFiles,
} = useChatLayout(props);
</script>

<style scoped lang="less">
@import url('./index.less');
</style>
