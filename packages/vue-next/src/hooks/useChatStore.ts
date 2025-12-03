/**
 * useChatStore.ts – 聊天全局状态管理
 * ----------------------------------
 * 职责：
 * 1. 创建并初始化 ChatStore 核心实例。
 * 2. 将 props、事件同步到核心，并返回响应式 state 与核心方法。
 * 3. 提供 provide/inject 机制，实现跨层级共享同一 store。
 *
 * 用法：
 * const store = useChatStore(props);   // 根节点创建
 * chatStoreProvide(store);             // 注入
 * const store = chatStoreInject();     // 任意子节点获取
 *
 * 数据流：Core → useSyncEvents & useSyncProps → reactive state → 各 UI 组件
 */

import { provide, inject, onScopeDispose } from 'vue';
import { ChatStore } from '@ms-chat/core';
import { useCreateState } from './base/useCreateState';
import { useSyncEvents } from './base/useSyncEvents';
import { useSyncProps } from './base/useSyncProps';
import { useBindCoreApi } from './base/useBindCoreApi';

import type { ChatState } from './base/useCreateState';
import type { CoreMethodsPick } from './base/useBindCoreApi';

import type { IMsChatProps } from '../types';

export type IChatStoreReturn = {
  state: ChatState;
} & CoreMethodsPick;

export default function useChatStore(props?: IMsChatProps): IChatStoreReturn {
  const core = new ChatStore();
  const state = useCreateState();

  // Sync Events
  const unBind = useSyncEvents(core, state);
  // Sync Props
  const unSync = useSyncProps(props, core);

  onScopeDispose(() => {
    unBind();
    unSync();
  });

  return {
    state,
    ...useBindCoreApi(core),
  };
}

// export const CHAT_STORE_KEY = Symbol('chat-store');

// export function chatStoreProvide(store: IChatStoreReturn) {
//   return provide(CHAT_STORE_KEY, store);
// }

// export function chatStoreInject(): IChatStoreReturn {
//   return inject(CHAT_STORE_KEY) || useChatStore();
// }
