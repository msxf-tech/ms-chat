<!--
 * ChatPC.vue – PC 端左右分栏聊天布局
 * ---------------------------------
 * 职责：
 * 1. 左侧会话列表（conversation），右侧主聊天区（header + messages + sender）。
 * 2. 提供 conversation / header / welcome / sender 四个具名插槽，可完全覆盖默认组件。
 *
 -->
<template>
  <DraggableContainer
    class="chat-pc-draggable"
    mode="pc"
    :draggable="draggable"
    v-bind="draggableOptions"
  >
    <div class="chat-layout">
      <div class="chat-side">
        <slot name="conversation" />
        <template v-if="!$slots.conversation">
          <ConversationContainer
            ref="conversationRef"
            @onSwitchConversation="onSwitchConversation"
            @onAddConversation="onAddConversation"
            @onDeleteConversation="onDeleteConversation"
            @onUpdateConversation="onUpdateConversation"
          />
        </template>
      </div>
      <div class="chat-main">
        <div class="main-header" ref="headerRef">
          <slot name="header" />
          <template v-if="!$slots.header">
            <HeaderContainer />
          </template>
        </div>
        <div class="main-body" :style="{ height: `calc(${contentHeight})` }">
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
        <div class="main-footer" ref="footerRef">
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
    </div>
  </DraggableContainer>
</template>

<script setup lang="ts">
import ConversationContainer from '../../container/Conversation/index.vue';
import HeaderContainer from '../../container/Header/index.vue';
import WelcomeContainer from '../../container/Welcome/index.vue';
import ChatMessagesContainer from '../../container/ChatMessages/index.vue';
import SenderContainer from '../../container/Sender/index.vue';
import DraggableContainer from '../../components/DraggableContainer/index.vue';
import type { IMsChatProps } from '../../types/index';
import useChatLayout from '../hooks/useChatLayout';

const props = defineProps<IMsChatProps>();

const {
  headerRef,
  footerRef,
  contentHeight,
  hasMessageList,
  onSwitchConversation,
  onAddConversation,
  onDeleteConversation,
  onUpdateConversation,
  sendMsg,
  stopMsg,
  uploadFiles,
} = useChatLayout(props);
</script>

<style scoped lang="less">
@import url('./index.less');
</style>
