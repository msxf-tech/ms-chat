import { useState, useCallback, useMemo } from 'react';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface UseChatPanelReturn {
  /** 面板是否可见 */
  visible: boolean;
  /** 面板位置和尺寸信息 */
  rect: Rect;
  /** 切换面板显示/隐藏 */
  toggleChat: () => void;
  /** 显示面板 */
  showChat: () => void;
  /** 隐藏面板 */
  hideChat: () => void;
  /** 更新面板位置 */
  updatePosition: (x: number, y: number) => void;
  /** 更新面板尺寸 */
  updateSize: (width: number, height: number) => void;
  /** 重置面板位置和尺寸 */
  resetPanel: () => void;
}

export const useChatPanel = (initialVisible = false): UseChatPanelReturn => {
  // 计算初始位置（屏幕右下角）
  const initialRect = useMemo(
    () => ({
      x: typeof window !== 'undefined' ? window.innerWidth - 455 : 0,
      y: typeof window !== 'undefined' ? window.innerHeight - 727 : 0,
      w: 375,
      h: 667,
    }),
    []
  );

  const [visible, setVisible] = useState(initialVisible);
  const [rect, setRect] = useState<Rect>(initialRect);

  // 切换显示/隐藏
  const toggleChat = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  // 显示面板
  const showChat = useCallback(() => {
    setVisible(true);
  }, []);

  // 隐藏面板
  const hideChat = useCallback(() => {
    setVisible(false);
  }, []);

  // 更新位置
  const updatePosition = useCallback((x: number, y: number) => {
    setRect((prev) => ({ ...prev, x, y }));
  }, []);

  // 更新尺寸
  const updateSize = useCallback((width: number, height: number) => {
    setRect((prev) => ({ ...prev, w: width, h: height }));
  }, []);

  // 重置到初始位置和尺寸
  const resetPanel = useCallback(() => {
    setRect(initialRect);
  }, [initialRect]);

  return {
    visible,
    rect,
    toggleChat,
    showChat,
    hideChat,
    updatePosition,
    updateSize,
    resetPanel,
  };
};

export default useChatPanel;
