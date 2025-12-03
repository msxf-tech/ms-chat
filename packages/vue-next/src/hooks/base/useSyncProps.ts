/**
 * useSyncProps.ts – 同步外部 props → Core
 * ------------------------------------------
 * 职责：
 * 1. 监控 props, 变化时立即把最新值同步到 Core 对应方法。
 * 3. 首次挂载立即执行一次初始同步。
 * 4. 返回统一解绑函数，组件卸载时停止监听。
 *
 * 用法：
 * const unSync = useSyncProps(props, core);
 * onScopeDispose(unSync);
 */

import { watch, onMounted } from 'vue';
import type { ChatStore, IMsChatProps } from '../../types';

interface SyncItem<T> {
  selector: () => T;
  updater: (value: T) => void;
}

export function useSyncProps(props: IMsChatProps | undefined, core: ChatStore) {
  const syncMap: SyncItem<any>[] = [
    {
      selector: () => props?.chatConfig,
      updater: (v) => core.initConfig(v),
    },
    {
      selector: () => [props?.conversations, props?.conversationId] as const,
      updater: ([conversations, conversationId]) => {
        if (!conversations) return;
        core.initCurrentConversation(conversations);
        if (conversationId) {
          core.setCurrentConversation(conversationId);
        }
      },
    },
    {
      selector: () => props?.messageList,
      updater: (v) => core.initMessages(v),
    },
  ];

  const stopHandles = syncMap.map(({ selector, updater }) =>
    watch(selector, (next) => next && updater(next), {
      deep: true,
      immediate: true,
    }),
  );

  function runInitialSync() {
    syncMap.forEach(({ selector, updater }) => {
      const val = selector();
      val && updater(val);
    });
  }

  onMounted(runInitialSync);

  return () => stopHandles.forEach((fn) => fn());
}
