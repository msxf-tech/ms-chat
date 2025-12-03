import React from 'react';
import { Button } from 'antd';
import ConversationItem from './components/ConversationItem';
import {
  IConversationProps,
  Conversation as IConversation,
} from '../../types/index';
import './index.less';

const Conversation: React.FC<IConversationProps> = ({
  conversationId,
  conversationList,
  onAddConversation,
  onSwitchConversation,
  onUpdateConversation,
  onDeleteConversation,
}) => {
  const handleAddConversation = async () => {
    onAddConversation?.();
  };

  const handleSwitchConversation = (conversation: IConversation) => {
    onSwitchConversation?.(conversation);
  };

  const handleUpdateConversation = (conversation: IConversation) => {
    onUpdateConversation?.(conversation);
  };

  const handleDeleteConversation = (conversationId: string) => {
    onDeleteConversation?.(conversationId);
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <Button
          className="icon-new"
          type="primary"
          onClick={handleAddConversation}
        >
          + 新建
        </Button>
        <ul>
          {conversationList?.map((conversation: IConversation) => (
            <ConversationItem
              key={conversation.conversationId}
              conversation={conversation}
              active={conversation.conversationId === conversationId}
              onSwitchConversation={handleSwitchConversation}
              onDeleteConversation={handleDeleteConversation}
              onUpdateConversation={handleUpdateConversation}
            />
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Conversation;
