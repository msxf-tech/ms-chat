import React, { useContext } from 'react';
import ChatMessagesComponent from '../../components/ChatMessages/index';
import { ChatStoreContext } from '../../contexts';

interface ChatMessagesContainerProps {
  [scopeSlot: string]: any;
}

const ChatMessagesContainer: React.FC<ChatMessagesContainerProps> = (
  scopeSlots
) => {
  const store = useContext(ChatStoreContext);
  const messageList = store?.state?.messageList || [];
  const config = {
    bubble: store?.state?.chatConfig?.bubble
  };
  return <ChatMessagesComponent data={messageList} config={config} {...scopeSlots} />;
};

export default ChatMessagesContainer;
