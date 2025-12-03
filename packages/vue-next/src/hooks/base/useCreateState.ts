/**
 * useCreateState.ts – 创建全局状态
 * -------------------------------------
 * 职责：
 * 1. 返回状态的响应式对象。
 *
 * 用法：
 * const state = useCreateState();
 */

import { reactive } from 'vue';
import type { MsgInput, Conversation, Message, ChatConfig } from '../../types';

export interface ChatState {
  msgInput: MsgInput;
  currentConversation: Conversation | null;
  conversations: Conversation[];
  messageList: Message[];
  chatConfig: ChatConfig;
}

export const useCreateState = () =>
  reactive<ChatState>({
    msgInput: { query: '' },
    currentConversation: null,
    conversations: [],
    messageList: [],
    chatConfig: {} as ChatConfig,
  });
