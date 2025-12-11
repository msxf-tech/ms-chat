import { useMemo } from 'react';
import type { ChatStore } from '../../types';

type CoreMethodNames =
  | 'initMsgInput'
  | 'setMsgInput'
  | 'setCurrentConversation'
  | 'addConversation'
  | 'deleteConversation'
  | 'updateConversation'
  | 'getConversation'
  | 'getAllConversations'
  | 'addMessage'
  | 'deleteMessage'
  | 'updateMessages'
  | 'initMessages';

export type CoreMethodsPick = Pick<ChatStore, CoreMethodNames>;

export function useBindCoreApi(core: ChatStore): CoreMethodsPick {
  return useMemo(() => {
    const coreMethods = [
      'initMsgInput',
      'setMsgInput',
      'setCurrentConversation',
      'addConversation',
      'deleteConversation',
      'updateConversation',
      'getConversation',
      'getAllConversations',
      'addMessage',
      'deleteMessage',
      'updateMessages',
      'initMessages',
    ] as const;

    const api = {} as CoreMethodsPick;

    coreMethods.forEach((key) => {
      api[key] = core[key].bind(core) as any;
    });

    return api;
  }, [core]);
}