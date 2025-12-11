import { ref, provide, inject, nextTick, type Ref } from 'vue';
import type { Message } from '../types';
import type { IChatStoreReturn } from './useChatStore';

type IPushMessageReturn = {
  pushMessage: (message: Message, isStreamPending: boolean) => Promise<void>;
  setInput: (query: string) => Promise<void>;
  pending: Ref<boolean>;
  updateSenderPending: (status: boolean) => void;
};

export default function usePushMessage(
  _chatStore?: IChatStoreReturn
): IPushMessageReturn {
  // preMessageId 上一条回复消息的id
  let preMessageId: string = '';

  // 按钮状态
  const pending = ref(false);

  // 处理loading消息
  const handleLoadingMessage = (message: Message) => {
    if (message.type !== 'loading') return;
    _chatStore?.addMessage(message);
  };

  // 处理用户消息
  const handleUserMessage = async (message: Message) => {
    if (message.role !== 'user' || message.type === 'loading') return;
    _chatStore?.addMessage(message);
    _chatStore?.initMsgInput();
    pending.value = true;
    await nextTick();
    _chatStore?.addMessage({
      id: `${Date.now()}`,
      type: 'loading',
      conversationId:
        _chatStore.state.currentConversation?.conversationId || '',
    });
  };

  // 处理系统消息
  const handleSystemMessage = async (
    message: Message,
    isStreamPending: boolean,
  ) => {
    if (message.role !== 'system' || message.type === 'loading') return;
    (_chatStore?.state.messageList || [])
      .filter((message) => message.type === 'loading')
      .map((message) => _chatStore?.deleteMessage(message.id as string));
    await nextTick();
    message.id === preMessageId
      ? _chatStore?.updateMessages(message.id, message)
      : _chatStore?.addMessage(message);
    preMessageId = message.id || '';
    // 流式消息pending中
    if (isStreamPending) return;
    pending.value = false;
  };

  /**
   * 用户pushMessage api
   * @param message 消息
   * @param isStreamPending 流式消息加载中
   */
  const pushMessage = async (
    message: Message,
    isStreamPending: boolean = false,
  ): Promise<void> => {
    message.conversationId =
      _chatStore?.state.currentConversation?.conversationId;
    handleLoadingMessage(message);
    await handleUserMessage(message);
    await handleSystemMessage(message, isStreamPending);
  };

  const setInput = async (query: string): Promise<void> => {
    _chatStore?.setMsgInput({ query });
  };

  /**
   * 更新按钮pending状态
   * @param status 按钮状态
   */
  const updateSenderPending = (status: boolean): void => {
    if (!status) {
      (_chatStore?.state.messageList || [])
        .filter((message) => message.type === 'loading')
        .map((message) => _chatStore?.deleteMessage(message.id as string));
    }
    pending.value = status;
  };
  return { pushMessage, pending, updateSenderPending, setInput };
}

export const PUSH_MESSAGE_STORE_KEY = Symbol('push-message');

export function pushMessageProvide(store: IPushMessageReturn) {
  return provide(PUSH_MESSAGE_STORE_KEY, store);
}

export function pushMessageInject(): IPushMessageReturn {
  return inject(PUSH_MESSAGE_STORE_KEY) || usePushMessage();
}
