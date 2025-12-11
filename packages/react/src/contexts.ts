import { createContext } from 'react';
import type { IChatStoreReturn } from './hooks/useChatStore';
import type { IPushMessageReturn } from './hooks/usePushMessage';
import type { IConversationReturn } from './hooks/useConversation';

export const ChatStoreContext = createContext<IChatStoreReturn | null>(null);
export const PushMessageContext = createContext<IPushMessageReturn | null>(null);
export const ConversationContext = createContext<IConversationReturn | null>(null);