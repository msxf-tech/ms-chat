import React, { useRef, useState } from 'react';
import { Popover, Input, Button, message, Modal } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Conversation } from '../../../../types';
import './index.less';

export interface ConversationItemProps {
  conversation: Conversation;
  active: boolean;
  onSwitchConversation: (conversation: Conversation) => void;
  onUpdateConversation: (conversation: Conversation) => void;
  onDeleteConversation: (conversationId: string) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  active,
  onSwitchConversation,
  onUpdateConversation,
  onDeleteConversation,
}) => {
  const [isShowIcon, setIsShowIcon] = useState(false);
  const inputRef = useRef('');

  const handleMenuItemSelect = (value: string) => {
    if (value === 'deleteConversation') {
      Modal.confirm({
        title: '确定删除此会话?',
        content: '删除后无法恢复',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          onDeleteConversation(conversation.conversationId);
          message.success(`已删除会话【${conversation?.name}】`);
        },
      });
    } else if (value === 'updateName') {
      Modal.confirm({
        title: '修改对话名',
        okText: '确定',
        cancelText: '取消',
        content: (
          <Input
            defaultValue={conversation.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (inputRef.current = e.target.value)
            }
            placeholder="请输入对话名称"
            onPressEnter={() => {
              if (inputRef.current.trim()) {
                onUpdateConversation({
                  conversationId: conversation.conversationId,
                  name: inputRef.current,
                });
                Modal.destroyAll();
              }
            }}
          />
        ),
        onOk: () => {
          if (inputRef.current.trim()) {
            onUpdateConversation({
              conversationId: conversation.conversationId,
              name: inputRef.current,
            });
            message.success('修改成功');
          }
        },
      });
    }
  };

  const menuItems = [
    {
      key: 'updateName',
      label: '更新名称',
      icon: <EditOutlined />,
    },
    {
      key: 'deleteConversation',
      label: '删除会话',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  return (
    <li
      className={`item ${active ? 'active' : ''}`}
      onClick={() => onSwitchConversation(conversation)}
      onMouseEnter={() => setIsShowIcon(true)}
      onMouseLeave={() => setIsShowIcon(false)}
    >
      <div className="name" title={conversation?.name}>
        {conversation?.name}
      </div>
      <Popover
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {menuItems.map((item) => (
              <Button
                key={item.key}
                type="text"
                danger={item.danger}
                icon={item.icon}
                onClick={() => handleMenuItemSelect(item.key)}
                style={{ 'paddingLeft': '10px' }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        }
        trigger="click"
        placement="bottomRight"
      >
        <MoreOutlined
          style={{
            display: isShowIcon ? 'block' : 'none',
            fontSize: 16,
            color: '#666',
            cursor: 'pointer',
          }}
        />
      </Popover>
    </li>
  );
};

export default ConversationItem;
