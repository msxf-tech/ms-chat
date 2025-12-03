import { useEffect, useRef } from 'react';
import type { ChatStore, IMsChatProps } from '../../types';

interface SyncItem<T> {
  selector: (props: IMsChatProps | undefined) => T;
  updater: (value: T) => void;
  shouldUpdate: (prev: T | undefined, current: T) => boolean;
}

export function useSyncProps(props: IMsChatProps | undefined, core: ChatStore) {
  const prevPropsRef = useRef<IMsChatProps | undefined>();
  const initializedRef = useRef(false);

  useEffect(() => {
    const syncMap: SyncItem<any>[] = [
      {
        selector: (p) => p?.chatConfig,
        updater: (v) => {
          core.initConfig(v);
        },
        shouldUpdate: (prev, current) => {
          return JSON.stringify(prev) !== JSON.stringify(current);
        },
      },
      {
        selector: (p) => p?.conversations,
        updater: (conversations) => {
          if (!conversations) return;
          core.initCurrentConversation(conversations);
        },
        shouldUpdate: (prev, current) => {
          return JSON.stringify(prev) !== JSON.stringify(current);
        },
      },
      {
        selector: (p) => p?.conversationId,
        updater: (conversationId) => {
          if (!conversationId) return;
          core.setCurrentConversation(conversationId);
        },
        shouldUpdate: (prev, current) => {
          return prev !== current;
        },
      },
      {
        selector: (p) => p?.messageList,
        updater: (v) => core.initMessages(v),
        shouldUpdate: (prev, current) => {
          return JSON.stringify(prev) !== JSON.stringify(current);
        },
      },
    ];

    const prevProps = prevPropsRef.current;
    const isInitialRun = !initializedRef.current;

    syncMap.forEach(({ selector, updater, shouldUpdate }) => {
      const currentValue = selector(props);
      const prevValue = prevProps ? selector(prevProps) : undefined;
      // 首次运行或值发生变化时执行更新
      if (
        isInitialRun ||
        (currentValue && shouldUpdate(prevValue, currentValue))
      ) {
        updater(currentValue);
      }
    });

    prevPropsRef.current = props;
    initializedRef.current = true;
  }, [props, core]);
}
