import { computed, provide, inject } from 'vue';
// import { generateUUID } from '../utils/tools';
import type { IChatStoreReturn } from './useChatStore';

export default function useConversation(_chatStore?: IChatStoreReturn) {
  // 会话列表
  const conversationList = computed(() => {
    const { conversations } = _chatStore?.state || {};
    if (conversations?.length) {
      return conversations;
    }
    return [];
  });

  // 当前会话id
  const curConversationId = computed(() => {
    return _chatStore?.state?.currentConversation?.conversationId;
  });

  // 新增会话
  const addConversation = async (addParams: any) => {
    _chatStore?.addConversation(addParams);
    setTimeout(() => {
      _chatStore?.setCurrentConversation(addParams?.conversationId);
      _chatStore?.initMessages([]);
    }, 0);
    return addParams;
  };

  // 切换会话
  const switchConversation = (conversation: any) => {
    _chatStore?.setCurrentConversation(conversation?.conversationId);
    return conversation?.conversationId;
  };

  // 更新会话
  const updateConversation = (params: any) => {
    const { conversationId, name } = params || {};
    _chatStore?.updateConversation(conversationId, {
      name,
    });
    return params;
  };

  // 删除会话
  const deleteConversation = (conversationId: string) => {
    _chatStore?.deleteConversation(conversationId);
    // const defaultConversation = _chatStore?.getAllConversations()?.[0];
    // switchConversation(defaultConversation);
    return { conversationId };
  };

  return {
    conversationList,
    curConversationId,
    addConversation,
    switchConversation,
    updateConversation,
    deleteConversation,
  };
}

export const CONVERSATION_STORE_KEY = Symbol('conversation');

export function conversationProvide(store: any) {
  return provide(CONVERSATION_STORE_KEY, store);
}

export function conversationInject() {
  return inject(CONVERSATION_STORE_KEY) || useConversation();
}
