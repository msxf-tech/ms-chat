import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined, CopyOutlined } from '@ant-design/icons';
import type { IChatBubbleProps } from '../../types/index';
import ChatMessageCard from '../ChatMessageCard/index';
import './index.less';

const ChatBubble: React.FC<IChatBubbleProps> = (props) => {
  const {
    role = 'user',
    bubble = {},
    content,
    type,
    bubbleHeader,
    bubbleFooter,
    ...restProps
  } = props;

  const copyText = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {})
      .catch(() => {
        console.log('复制失败，请手动复制！');
      });
  };

  const getHeader = () => {
    const _bubbleHeader = bubbleHeader && bubbleHeader(props);
    return (
      _bubbleHeader || <div className="bubble-name"> {bubble?.name || ''}</div>
    );
  };

  return (
    <div className={`chat-bubble chat-bubble-${role}`}>
      <div className="chat-avatar">
        {bubble?.avatar?.src ? (
          <Avatar src={bubble?.avatar.src} />
        ) : (
          <Avatar icon={<UserOutlined />} />
        )}
      </div>
      <div
        className={`chat-bubble-content-wrapper chat-bubble-content-wrapper-${role}`}
      >
        <div className="chat-bubble-content-header">{getHeader()}</div>
        <div className={`chat-bubble-content chat-bubble-content-${role}`}>
          <ChatMessageCard content={content} type={type} {...restProps} />
        </div>
        {bubbleFooter ? (
          <div className="chat-bubble-content-footer">
            {bubbleFooter(props)}
          </div>
        ) : (
          <div className="chat-bubble-actions">
            <Button
              type="text"
              icon={<CopyOutlined />}
              size="small"
              onClick={() => copyText(content)}
            >
              复制
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
