import { useMemo } from 'react';
import ChatPC from '../ChatPC/index';
import ChatH5 from '../ChatH5/index';
import ChatBubble from '../ChatBubble/index';
import type { IMsChatProps } from '../../types';

export function useMode(props: IMsChatProps) {
  const currentComponent = useMemo(() => {
    switch (props.mode) {
      case 'h5':
        return ChatH5;
      case 'bubble':
        return ChatBubble;
      default:
        return ChatPC;
    }
  }, [props.mode]);

  return {
    currentComponent,
  };
}
