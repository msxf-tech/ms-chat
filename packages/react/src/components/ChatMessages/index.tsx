import React from 'react';
import List from './components/List/index';
import Empty from './components/Empty/index';
import { ChatListContext } from './contexts';
import { useChatList } from './hooks/useChatList';
import type { IChatMessagesProps } from '../../types/index';
import './index.less';

const ChatMessages: React.FC<IChatMessagesProps> = ({
  data,
  config,
  ...scopeSlots
}) => {
  const store = useChatList({ data, config });

  return (
    <ChatListContext.Provider value={store}>
      <div className="chat-message-list">
        <List {...scopeSlots} />
        <Empty />
      </div>
    </ChatListContext.Provider>
  );
};

export default ChatMessages;


