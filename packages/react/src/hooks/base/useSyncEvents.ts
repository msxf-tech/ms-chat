import { useRef, useEffect } from 'react';
import {
  configEventTypes,
  queryEventTypes,
  conversationEventTypes,
  currentConversationEventTypes,
  messageListEventTypes,
} from '../../utils/constant';
import type { ChatStore } from '../../types';
import type { ChatState } from './useCreateState.ts';

export function useSyncEvents(core: ChatStore, state: ChatState) {
  const stateRef = useRef(state);
  const coreRef = useRef(core);

  // 保持 refs 最新
  useEffect(() => {
    stateRef.current = state;
    coreRef.current = core;
  });

  useEffect(() => {
    // 更新 config
    const refreshConfig = () => {
      stateRef.current.setChatConfig(coreRef.current.getConfig());
    };
    // 更新输入框内容
    const refreshQuery = () => {
      stateRef.current.setMsgInput(coreRef.current.getMsgInput());
    };
    // 更新左侧会话列表
    const refreshConversations = () => {
      stateRef.current.setConversations(() =>
        coreRef.current.getAllConversations()
      );
    };
    // 更新当前会话
    const refreshCurrentConversations = () => {
      stateRef.current.setCurrentConversation(
        coreRef.current.getCurrentConversation()
      );
    };
    // 更新消息列表
    const refreshMessageList = () => {
      stateRef.current.setMessageList(coreRef.current.getAllMessages());
    };

    // 监听
    configEventTypes.forEach((type) =>
      coreRef.current.configStore.on(type, refreshConfig)
    );
    queryEventTypes.forEach((type) =>
      coreRef.current.msgInputStore.on(type, refreshQuery)
    );
    conversationEventTypes.forEach((type) =>
      coreRef.current.conversationsStore.on(type, refreshConversations)
    );
    currentConversationEventTypes.forEach((type) =>
      coreRef.current.conversationsStore.on(type, refreshCurrentConversations)
    );
    messageListEventTypes.forEach((type) =>
      coreRef.current.messageListStore.on(type, refreshMessageList)
    );

    return () => {
      queryEventTypes.forEach((type) =>
        coreRef.current.msgInputStore.off(type, refreshQuery)
      );
      currentConversationEventTypes.forEach((type) =>
        coreRef.current.conversationsStore.off(
          type,
          refreshCurrentConversations
        )
      );
      conversationEventTypes.forEach((type) =>
        coreRef.current.conversationsStore.off(type, refreshConversations)
      );
      messageListEventTypes.forEach((type) =>
        coreRef.current.messageListStore.off(type, refreshMessageList)
      );
    };
  }, [core]);
}
