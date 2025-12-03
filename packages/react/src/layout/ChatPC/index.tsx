import React, { useContext } from 'react';
import { useChatLayout } from '../hooks/useChatLayout';
import type { IMsChatProps } from '../../types';
import { ChatStoreContext } from '../../contexts';
import ConversationContainer from '../../container/Conversation/index';
import HeaderContainer from '../../container/Header/index';
import ChatMessagesContainer from '../../container/ChatMessages/index';
import SenderContainer from '../../container/Sender/index';
import WelcomeContainer from '../../container/Welcome/index';
import DraggableContainer from '../../components/DraggableContainer/index';
import './index.less';

const ChatPC: React.FC<IMsChatProps> = (props) => {
  const { draggable = false, draggableOptions = {}, ...chatProps } = props;

  const {
    headerRef,
    footerRef,
    contentHeight,
    hasMessageList,
    onAddConversation,
    onDeleteConversation,
    onSwitchConversation,
    onUpdateConversation,
    onSendMsg,
    onStopMsg,
    onUploadFiles,
    renderSlot,
    scopeSlots,
  } = useChatLayout(chatProps);

  const chatStore = useContext(ChatStoreContext);
  const conversationHidden = chatStore?.state?.chatConfig?.conversation?.hidden;

  const chatContent = (
    <div className="chat-layout">
      {!conversationHidden && (
        <div className="chat-side">
          {renderSlot(
            'conversation',
            <ConversationContainer
              onSwitchConversation={onSwitchConversation}
              onAddConversation={onAddConversation}
              onDeleteConversation={onDeleteConversation}
              onUpdateConversation={onUpdateConversation}
            />
          )}
        </div>
      )}
      <div className="chat-main">
        <div className="main-header" ref={headerRef}>
          {renderSlot('header', <HeaderContainer />)}
        </div>
        <div className="main-body" style={{ height: `calc(${contentHeight})` }}>
          {hasMessageList ? (
            <ChatMessagesContainer {...scopeSlots} />
          ) : (
            <div className="welcome-wrap">
              {renderSlot(
                'welcome',
                <WelcomeContainer onSendMsg={onSendMsg} />
              )}
            </div>
          )}
        </div>
        <div className="main-footer" ref={footerRef}>
          {renderSlot(
            'sender',
            <SenderContainer
              {...scopeSlots}
              onSendMsg={onSendMsg}
              onStopMsg={onStopMsg}
              onUploadFiles={onUploadFiles}
            />
          )}
        </div>
      </div>
    </div>
  );

  // 如果不启用拖拽，直接返回聊天内容
  if (!draggable) {
    return chatContent;
  }

  // 启用拖拽时，用 DraggableContainer 包裹
  return (
    <DraggableContainer mode="pc" draggable={draggable} {...draggableOptions}>
      {chatContent}
    </DraggableContainer>
  );
};

export default ChatPC;
