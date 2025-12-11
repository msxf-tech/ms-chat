import React from 'react';
import type { IMsChatProps } from '../../types';
import ChatH5 from '../ChatH5/index';
import { useChatPanel } from '../hooks/useChatPanel';
import './index.less';

const defaultIconBgUrl =
  'http://poweragent.msxf.local/abp-static/imgs/avatar/agent/light_purple.svg';

const ChatBubble: React.FC<IMsChatProps> = (props) => {
  const { bubbleOptions, ...chatProps } = props;

  const { visible, toggleChat, rect } = useChatPanel();

  return (
    <div>
      <div
        className="chat-toggle"
        style={{
          backgroundImage: `url(${
            bubbleOptions?.iconBgUrl || defaultIconBgUrl
          })`,
        }}
        onClick={toggleChat}
        aria-label="打开对话"
      >
        {bubbleOptions?.iconTitle}
      </div>
      {visible && (
        <ChatH5
          draggable={true}
          draggableOptions={{
            showCloseButton: true,
            initialPosition: { x: rect.x, y: rect.y },
            initialSize: { width: rect.w, height: rect.h },
            minSize: { width: 375, height: 667 },
            onClose: toggleChat,
          }}
          {...chatProps}
        />
      )}
    </div>
  );
};

export default ChatBubble;
