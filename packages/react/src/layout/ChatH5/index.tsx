import React from 'react';
import { useChatLayout } from '../hooks/useChatLayout';
import type { IMsChatProps } from '../../types';
import HeaderContainer from '../../container/Header/index';
import ChatMessagesContainer from '../../container/ChatMessages/index';
import SenderContainer from '../../container/Sender/index';
import WelcomeContainer from '../../container/Welcome/index';
import DraggableContainer from '../../components/DraggableContainer/index';
import './index.less';

const ChatH5: React.FC<IMsChatProps> = (props) => {
  const { draggable = false, draggableOptions = {}, ...chatProps } = props;

  const {
    headerRef,
    footerRef,
    contentHeight,
    hasMessageList,
    onSendMsg,
    onStopMsg,
    onUploadFiles,
    renderSlot,
    scopeSlots,
  } = useChatLayout(chatProps);

  const chatContent = (
    <div className="chat-layout-h5">
      <div className="chat-header" ref={headerRef}>
        {renderSlot('header', <HeaderContainer />)}
      </div>
      <div className="chat-body" style={{ height: `calc(${contentHeight})` }}>
        {hasMessageList ? (
          <ChatMessagesContainer {...scopeSlots} />
        ) : (
          <div className="welcome-wrap">
            {renderSlot('welcome', <WelcomeContainer onSendMsg={onSendMsg} />)}
          </div>
        )}
      </div>
      <div className="chat-footer" ref={footerRef}>
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
  );

  // 如果不启用拖拽，直接返回聊天内容
  if (!draggable) {
    return chatContent;
  }

  // 启用拖拽时，用 DraggableContainer 包裹
  return (
    <DraggableContainer mode="h5" draggable={draggable} {...draggableOptions}>
      {chatContent}
    </DraggableContainer>
  );
};

export default ChatH5;
