import type { UploadFile } from 'antd/es/upload/interface';
import { Conversation, Message, ChatConfig } from '@ms-chat/core';

interface IMsChatProps {
  mode?: 'pc' | 'h5' | 'bubble';
  conversationId?: string;
  conversations?: Conversation[];
  messageList?: Message[];
  chatConfig?: ChatConfig;
  draggable?: boolean; // 是否启用拖拽功能
  draggableOptions?: {
    initialPosition?: { x: number; y: number }; // 拖拽初始位置
    initialSize?: { width: number; height: number }; // 拖拽初始尺寸
    minSize?: { width: number; height: number }; // 拖拽最小尺寸
    showCloseButton?: boolean;
    disableResizing?: boolean;
    onClose?: () => void;
  };
  bubbleOptions?: {
    iconTitle?: string;
    iconBgUrl?: string;
  };
  slots?: {
    conversation?: React.ReactNode;
    header?: React.ReactNode;
    welcome?: React.ReactNode;
    sender?: React.ReactNode;
    [scopeSlot: string]: any;
  };
  onAddConversation?: () => void;
  onSwitchConversation?: (conversation: Conversation) => void;
  onUpdateConversation?: (conversation: Conversation) => void;
  onDeleteConversation?: (conversationId: string) => void;
  onSendMsg?: (query: string) => void;
  onStopMsg?: () => void;
  onUploadFiles?: (files: UploadFile[]) => void;
}

export type { IMsChatProps };
