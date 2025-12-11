import { createContext } from 'react';
import type { IChatListReturn } from './hooks/useChatList';

export const ChatListContext = createContext<IChatListReturn | null>(null);
