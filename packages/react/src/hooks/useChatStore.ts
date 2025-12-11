import { useMemo } from 'react';
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
  const core = useMemo(() => new ChatStore(), []);
  const state = useCreateState();

  // Sync Events
  useSyncEvents(core, state);
  // Sync Props
  useSyncProps(props, core);

  const api = useBindCoreApi(core);

  return {
    state,
    ...api,
  };
}
