/**
 * useBindCoreApi.ts – 绑定 Core 核心方法
 * ------------------------------------------
 * 职责：
 * 1. 按名称列表从 Core 实例提取核心方法。
 * 2. 统一绑定 this 后返回，供外部直接调用。
 *
 * 用法：
 * const api = useBindCoreApi(core);
 */

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
}
