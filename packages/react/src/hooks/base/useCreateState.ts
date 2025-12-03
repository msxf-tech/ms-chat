import { useState } from 'react';
import type { MsgInput, Conversation, Message, ChatConfig } from '../../types';

// Setter 类型
export interface ChatStateSetters {
  setMsgInput: React.Dispatch<React.SetStateAction<MsgInput>>;
  setCurrentConversation: React.Dispatch<
    React.SetStateAction<Conversation | null>
  >;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  setMessageList: React.Dispatch<React.SetStateAction<Message[]>>;
  setChatConfig: React.Dispatch<React.SetStateAction<ChatConfig>>;
}

// State 类型
export type ChatState = {
  msgInput: MsgInput;
  currentConversation: Conversation | null;
  conversations: Conversation[];
  messageList: Message[];
  chatConfig: ChatConfig;
} & ChatStateSetters;

export const useCreateState = (): ChatState => {
  const [msgInput, setMsgInput] = useState<MsgInput>({ query: '' });
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [chatConfig, setChatConfig] = useState<ChatConfig>({} as ChatConfig);

  return {
    msgInput,
    currentConversation,
    conversations,
    messageList,
    chatConfig,
    setMsgInput,
    setCurrentConversation,
    setConversations,
    setMessageList,
    setChatConfig,
  };
};
