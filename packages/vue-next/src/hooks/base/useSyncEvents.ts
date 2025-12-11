/**
 * useSyncEvents.ts – 同步 Core 事件到响应式 state
 * --------------------------------------------------
 * 职责：
 * 1. 监听 Core 内各模块事件，把最新数据同步到 reactive state。
 * 2. 返回解绑函数，在组件卸载时统一移除监听。
 *
 * 用法：
 * const unBind = useSyncEvents(core, state);
 * onScopeDispose(unBind);
 */

import type { ChatState } from './useCreateState';
import {
  CHATCONFIG_ACTION_TYPE,
  QUERY_ACTION_TYPE,
  CONVERSATION_ACTION_TYPE,
  CURRENT_CONVERSATION_ACTION_TYPE,
  MESSAGE_ACTION_TYPE,
} from '@ms-chat/core';
import type { ChatStore } from '../../types';

export function useSyncEvents(core: ChatStore, state: ChatState) {
  // 输入框
  const configEventTypes = [
    CHATCONFIG_ACTION_TYPE.INIT,
    CHATCONFIG_ACTION_TYPE.UPDATE,
    CHATCONFIG_ACTION_TYPE.DELETE,
  ] as const;

  const refreshConfig = () => {
    state.chatConfig = core.getConfig();
  };

  configEventTypes.forEach((type) => core.configStore.on(type, refreshConfig));

  // 输入框
  const queryEventTypes = [
    QUERY_ACTION_TYPE.INIT,
    QUERY_ACTION_TYPE.SET,
  ] as const;

  const refreshQuery = () => {
    state.msgInput = core.getMsgInput();
  };

  queryEventTypes.forEach((type) => core.msgInputStore.on(type, refreshQuery));

  // 左侧会话列表
  const conversationEventTypes = [
    CONVERSATION_ACTION_TYPE.INIT,
    CONVERSATION_ACTION_TYPE.ADD,
    CONVERSATION_ACTION_TYPE.DELETE,
    CONVERSATION_ACTION_TYPE.UPDATE,
  ] as const;

  const refreshConversations = () => {
    state.conversations = core.getAllConversations();
  };

  conversationEventTypes.forEach((type) =>
    core.conversationsStore.on(type, refreshConversations),
  );

  // 当前会话
  const currentConversationEventTypes = [
    CURRENT_CONVERSATION_ACTION_TYPE.SET,
  ] as const;

  const refreshCurrentConversations = () => {
    state.currentConversation = core.getCurrentConversation();
  };

  currentConversationEventTypes.forEach((type) =>
    core.conversationsStore.on(type, refreshCurrentConversations),
  );

  // 消息列表
  const messageListEventTypes = [
    MESSAGE_ACTION_TYPE.INIT,
    MESSAGE_ACTION_TYPE.ADD,
    MESSAGE_ACTION_TYPE.ADDS,
    MESSAGE_ACTION_TYPE.DELETE,
    MESSAGE_ACTION_TYPE.DELETE_IDX,
    MESSAGE_ACTION_TYPE.DELETES,
    MESSAGE_ACTION_TYPE.UPDATE,
  ] as const;

  const refreshMessageList = () => {
    state.messageList = core.getAllMessages();
  };

  messageListEventTypes.forEach((type) =>
    core.messageListStore.on(type, refreshMessageList),
  );

  const unBineEvents = () => {
    queryEventTypes.forEach((type) =>
      core.msgInputStore.off(type, refreshQuery),
    );
    currentConversationEventTypes.forEach((type) =>
      core.conversationsStore.off(type, refreshCurrentConversations),
    );
    conversationEventTypes.forEach((type) =>
      core.conversationsStore.off(type, refreshConversations),
    );
    messageListEventTypes.forEach((type) =>
      core.messageListStore.off(type, refreshMessageList),
    );
  };

  return unBineEvents;
}
