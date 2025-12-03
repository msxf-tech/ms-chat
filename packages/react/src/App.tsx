import React, { useMemo, useImperativeHandle } from 'react';
import Main from './layout/Main';
import {
  ChatStoreContext,
  PushMessageContext,
  ConversationContext,
} from './contexts';
import useChatStore from './hooks/useChatStore';
import useConversation from './hooks/useConversation';
import usePushMessage from './hooks/usePushMessage';
import type { IChatStoreReturn } from './hooks/useChatStore';
import type { IMsChatProps } from './types';

export type MSChatHandle = {
  readonly state: IChatStoreReturn['state'];
  addConversation: ReturnType<typeof useConversation>['addConversation'];
  switchConversation: ReturnType<typeof useConversation>['switchConversation'];
  updateConversation: ReturnType<typeof useConversation>['updateConversation'];
  deleteConversation: ReturnType<typeof useConversation>['deleteConversation'];
  pushMessage: ReturnType<typeof usePushMessage>['pushMessage'];
  setInput: ReturnType<typeof usePushMessage>['setInput'];
  updateSenderPending: ReturnType<typeof usePushMessage>['updateSenderPending'];
};

const MSChat = React.forwardRef<MSChatHandle, IMsChatProps>((props, ref) => {
  const chatStore = useChatStore(props);
  const conversationStore = useConversation(chatStore);
  const pushMessageStore = usePushMessage(chatStore, conversationStore);

  // 暴露给父组件的实例对象
  const exposedMethods = useMemo(
    () => ({
      get state() {
        return chatStore?.state;
      },
      addConversation: conversationStore.addConversation,
      switchConversation: conversationStore.switchConversation,
      updateConversation: conversationStore.updateConversation,
      deleteConversation: conversationStore.deleteConversation,
      pushMessage: pushMessageStore.pushMessage,
      setInput: pushMessageStore.setInput,
      updateSenderPending: pushMessageStore.updateSenderPending,
    }),
    [chatStore, conversationStore, pushMessageStore]
  );

  useImperativeHandle(ref, () => exposedMethods, [exposedMethods]);

  // 把 DOM 引用传给 Main，再单独声明一个 ref
  const innerRef = React.useRef<HTMLDivElement>(null);

  return (
    <ChatStoreContext.Provider value={chatStore}>
      <ConversationContext.Provider value={conversationStore}>
        <PushMessageContext.Provider value={pushMessageStore}>
          <Main {...props} ref={innerRef} />
        </PushMessageContext.Provider>
      </ConversationContext.Provider>
    </ChatStoreContext.Provider>
  );
});

MSChat.displayName = 'MSChat';

export default MSChat;
