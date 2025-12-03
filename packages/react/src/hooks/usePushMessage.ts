import { useState, useRef } from 'react';
import type { Message } from '../types';
import type { IChatStoreReturn } from './useChatStore';
import type { IConversationReturn } from './useConversation';

export interface IPushMessageReturn {
  pushMessage: (message: Message, isStreamPending?: boolean) => Promise<void>;
  setInput: (query: string) => Promise<void>;
  updateSenderPending: (status: boolean) => void;
  pending: boolean;
}

export default function usePushMessage(
  chatStore?: IChatStoreReturn,
  conversationStore?: IConversationReturn
): IPushMessageReturn {
  const [pending, setPending] = useState(false);
  const preMessageIdRef = useRef<string>('');

  const handleLoadingMessage = (message: Message) => {
    if (message.type !== 'loading') return;
    chatStore?.addMessage(message);
  };

  const handleUserMessage = async (message: Message) => {
    if (message.role !== 'user' || message.type === 'loading') return;
    chatStore?.addMessage(message);
    chatStore?.initMsgInput();

    chatStore?.addMessage({
      id: `${Date.now()}`,
      type: 'loading',
      role: 'system',
      conversationId: chatStore.state.currentConversation?.conversationId || '',
    });
  };

  const handleSystemMessage = async (message: Message) => {
    if (message.role !== 'system' || message.type === 'loading') return;

    // 删除所有 loading 消息
    (chatStore?.state.messageList || [])
      .filter((msg) => msg.type === 'loading')
      .forEach((msg) => msg?.id && chatStore?.deleteMessage(msg.id));

    if (message.id === preMessageIdRef.current) {
      chatStore?.updateMessages(message.id, message);
    } else {
      chatStore?.addMessage(message);
    }

    preMessageIdRef.current = message.id || ''; // 立即更新

    const { isActive, isStream } = message;
    if (isStream) {
      if (isActive) {
        setPending(true);
      } else {
        setPending(false);
      }
    }
  };

  const pushMessage = async (message: Message): Promise<void> => {
    if (
      !conversationStore?.curConversationId &&
      conversationStore?.addConversation
    ) {
      await conversationStore?.addConversation();
    }
    setTimeout(async () => {
      message.conversationId =
        chatStore?.state?.currentConversation?.conversationId;
      handleLoadingMessage(message);
      await handleUserMessage(message);
      await handleSystemMessage(message);
    });
  };

  const setInput = async (query: string): Promise<void> => {
    chatStore?.setMsgInput({ query });
  };

  /**
   * 更新按钮pending状态
   * @param status 按钮状态
   */
  const updateSenderPending = (status: boolean): void => {
    if (!status) {
      (chatStore?.state.messageList || [])
        .filter((msg) => msg.type === 'loading')
        .map((msg: Message) => msg?.id && chatStore?.deleteMessage(msg.id));
    }
    setPending(status);
  };

  return { pushMessage, setInput, updateSenderPending, pending };
}
