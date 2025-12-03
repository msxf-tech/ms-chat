/**
 * useMode.ts （布局）切换核心逻辑。
 * ----------------------------------
 * 职责：
 * 1. 根据 props.mode 返回对应的聊天组件：
 * 2. 创建与当前组件实例的 ref 绑定（modeRef），用于透传调用。
 * 3. 统一暴露外层需要的方法，保证外层对子组件无感知差异。
 *
 * 用法：
 * const { currentComponent, modeRef, exposed } = useMode(props);
 */

import { computed } from 'vue';
import ChatPC from '../ChatPC/index.vue';
import ChatH5 from '../ChatH5/index.vue';
import ChatBubble from '../ChatBubble/index.vue';
import type { IMsChatProps } from '../../types/index';

export default function useMode(props: IMsChatProps) {
  const currentComponent = computed(() => {
    switch (props.mode) {
      case 'h5':
        return ChatH5;
      case 'bubble':
        return ChatBubble;
      default:
        return ChatPC;
    }
  });

  return {
    currentComponent,
  };
}
