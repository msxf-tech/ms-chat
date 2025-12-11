/**
 * useChatPanel.ts – 悬浮/可拖拽聊天面板逻辑
 * ----------------------------------------
 * 职责：
 * 1. 控制聊天面板的显隐（visible）。
 * 2. 管理拖拽/缩放位置与尺寸（rect）。
 *
 * 用法：
 * const { visible, toggleChat, active, rect, h5Ref, pushMessage } = useChatPanel();
 */

import { ref, reactive } from 'vue';

export default function useChatPanel() {
  /* 1. 可见性 */
  const visible = ref(false);
  const toggleChat = () => (visible.value = !visible.value);

  const rect = reactive({
    x: typeof window !== 'undefined' ? window.innerWidth - 455 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight - 727 : 0,
    w: 375,
    h: 667,
  });

  return {
    visible,
    toggleChat,
    rect,
  };
}
