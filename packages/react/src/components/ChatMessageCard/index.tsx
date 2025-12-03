import React from 'react';
import { getMessageComponent } from '@ms-chat/core';
import type { IChatMessageCardProps } from '../../types/index';

const ChatMessageCard: React.FC<IChatMessageCardProps> = (props) => {
  const { type, bubbleCardExt, ...restProps } = props;

  if (type === 'ext' && bubbleCardExt) {
    return <div>{bubbleCardExt(props)}</div>;
  }

  const ComponentToRender = getMessageComponent(type);

  if (!ComponentToRender) {
    return <div>未知消息类型 {type}</div>;
  }

  return (
    <div className="chat-message-card">
      <ComponentToRender {...restProps} type={type} />
    </div>
  );
};

export default ChatMessageCard;
