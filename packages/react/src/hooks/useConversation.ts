import { useState, useEffect, useCallback } from 'react';
import { generateUUID } from '../utils/tools';
import type { IChatStoreReturn } from './useChatStore';
import type { Conversation } from '../types';

export interface IConversationReturn {
  conversationList: Conversation[];
  curConversationId?: string;
  addConversation: (params?: Conversation) => Promise<Conversation>;
  switchConversation: (conversation: Conversation) => string;
  updateConversation: (params: { conversationId: string; name: string }) => {
    conversationId: string;
    name: string;
  };
  deleteConversation: (conversationId: string) => {
    conversationId: string;
    defaultConversation: Conversation | undefined;
  };
}

export default function useConversation(
  chatStore?: IChatStoreReturn
): IConversationReturn {
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [curConversationId, setCurConversationId] = useState<string>();

  // 新增会话
  const addConversation = useCallback(
    async (params?: Conversation): Promise<Conversation> => {
      const conversationId = generateUUID();
      let addParams: Conversation = {
        conversationId,
        name: '新对话',
        createTime: new Date(),
      };
      if (params) {
        addParams = params;
      }
      chatStore?.addConversation(addParams);
      setTimeout(() => {
        chatStore?.setCurrentConversation(conversationId);
        chatStore?.initMessages([]);
      }, 0);
      return addParams;
    },
    [chatStore]
  );

  // 切换会话
  const switchConversation = useCallback(
    (conversation: Conversation) => {
      const conversationId = conversation?.conversationId;
      chatStore?.setCurrentConversation(conversationId);
      return conversationId;
    },
    [chatStore]
  );

  // 更新会话
  const updateConversation = useCallback(
    (params: { conversationId: string; name: string }) => {
      const { conversationId, name } = params;
      chatStore?.updateConversation(conversationId, { name });
      return params;
    },
    [chatStore]
  );

  // 删除会话
  const deleteConversation = useCallback(
    (conversationId: string) => {
      chatStore?.deleteConversation(conversationId);
      const defaultConversation = chatStore?.getAllConversations()?.[0];
      if (defaultConversation) {
        switchConversation(defaultConversation);
      }
      return { conversationId, defaultConversation };
    },
    [chatStore, switchConversation]
  );

  useEffect(() => {
    const conversations = chatStore?.state.conversations || [];
    setConversationList(conversations);
  }, [chatStore?.state.conversations]);

  useEffect(() => {
    const conversationId = chatStore?.state.currentConversation?.conversationId;
    setCurConversationId(conversationId);
  }, [chatStore?.state.currentConversation?.conversationId]);

  return {
    conversationList,
    curConversationId,
    addConversation,
    switchConversation,
    updateConversation,
    deleteConversation,
  };
}
