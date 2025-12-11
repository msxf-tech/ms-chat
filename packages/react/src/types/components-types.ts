import type { UploadFile } from 'antd/es/upload/interface';
import type { Conversation, Message, BubbleItem, Bubble } from '@ms-chat/core';

export interface IMarkdownCardProps {
  content: string | Array<{ content: string; type?: string }>;
  bubbleCardMdExt?: (params: IMarkdownCardProps) => React.ReactNode;
}

export interface IChatBubbleProps {
  role?: string;
  bubble?: BubbleItem;
  content: string;
  type: string;
  bubbleHeader?: (params: IChatBubbleProps) => React.ReactNode;
  bubbleFooter?: (params: IChatBubbleProps) => React.ReactNode;
  bubbleCardExt?: (params: IChatMessageCardProps) => React.ReactNode;
  bubbleCardMdExt?: (params: IMarkdownCardProps) => React.ReactNode;
}

export interface IChatMessageCardProps {
  content: string;
  type: string;
  bubbleCardExt?: (params: IChatMessageCardProps) => React.ReactNode;
  bubbleCardMdExt?: (params: IMarkdownCardProps) => React.ReactNode;
}

export interface IChatMessagesProps {
  data: Message[];
  config: {
    bubble?: Bubble;
  };
  bubbleHeader?: (params: IChatBubbleProps) => React.ReactNode;
  bubbleFooter?: (params: IChatBubbleProps) => React.ReactNode;
  bubbleCardExt?: (params: IChatMessageCardProps) => React.ReactNode;
  bubbleCardMdExt?: (params: IMarkdownCardProps) => React.ReactNode;
}

export interface IConversationProps {
  conversationId?: string;
  conversationList?: Conversation[];
  onAddConversation?: () => void;
  onSwitchConversation?: (conversation: Conversation) => void;
  onUpdateConversation?: (conversation: Conversation) => void;
  onDeleteConversation?: (conversationId: string) => void;
}

export interface IHeaderProps {
  title?: string;
}

export interface ISenderProps {
  input: {
    maxlength?: number;
    pending: boolean;
    hidden: boolean;
    disabled: boolean;
    placeholder: string;
    onfocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    query: string;
  };
  senderTop?: React.ReactNode;
  senderHeader?: React.ReactNode;
  senderFooter?: React.ReactNode;
  onUpdateQuery?: (query: string) => void;
  onSendMsg?: (query: string) => void;
  onStopMsg?: () => void;
  onUploadFiles?: (files: UploadFile[]) => void;
}

export interface IWelcomeProps {
  content: {
    title: string;
    describe: string;
    prompt: {
      title: string;
      list: string[];
    };
  };
  onSetInput: (item: string) => void;
}
