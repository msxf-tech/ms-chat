import type {
  ChatStore,
  MsgInput,
  Conversation,
  Message,
  ChatConfig,
} from '@ms-chat/core';

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
  sendMsg?: (query: string) => any;
  stopMsg?: (...args: any[]) => any;
  uploadFiles?: (files: unknown[]) => any;
  onSwitchConversation?: (...args: any[]) => any;
  onAddConversation?: (...args: any[]) => any;
  onDeleteConversation?: (...args: any[]) => any;
  onUpdateConversation?: (...args: any[]) => any;
}

export type {
  ChatStore,
  MsgInput,
  Conversation,
  Message,
  ChatConfig,
  IMsChatProps,
};
