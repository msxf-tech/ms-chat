import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import type { Message, IChatMessagesProps } from '../../../types/index';

export interface IChatListReturn {
  data: Message[];
  runData: Message[];
  isEmptyData: boolean;
  scrollbarRef: React.RefObject<HTMLDivElement>; // 用于获取容器高度
  virtualListRef: React.RefObject<any>; // 用于控制 VirtualList 滚动
  containerHeight: number; // 获取容器高度
  showFloatBtn: boolean;
  handleScrollToPosition: () => void;
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

const SCROLL_THRESHOLD = 100;

export function useChatList(props: IChatMessagesProps): IChatListReturn {
  const { data, config } = props;
  const [scrollBottom, setScrollBottom] = useState(0);
  const [showFloatBtn, setShowFloatBtn] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollbarRef = useRef<HTMLDivElement>(null); // 获取外层容器高度
  const virtualListRef = useRef<any>(null); // 控制 VirtualList 滚动
  const scrollTimerRef = useRef<number | null>(null);

  const isEmptyData = data.length <= 0;

  const containerHeight = useMemo(() => {
    return scrollbarRef.current?.clientHeight || 0;
  }, [scrollbarRef.current]);

  const lastMessageItem = useMemo(() => {
    return data.length ? data[data.length - 1] : null;
  }, [data]);

  const runData = useMemo(() => {
    return data.map((ma) => {
      if (ma.bubble) return ma; // 已有 bubble，直接复用引用
      const { left, right } = config?.bubble || {};
      return {
        ...ma,
        bubble: ma.role === 'user' ? right : left,
      };
    });
  }, [data, config?.bubble?.left, config?.bubble?.right]);

  const handleScrollToPosition = useCallback(() => {
    if (virtualListRef.current) {
      virtualListRef.current.scrollTo({
        index: runData.length - 1,
        align: 'bottom',
      });
    }
  }, [runData]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setIsScrolling(true);

    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const distanceToBottom = Math.floor(
      scrollHeight - scrollTop - clientHeight
    );
    setScrollBottom(distanceToBottom);
    setShowFloatBtn(distanceToBottom >= SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    handleScrollToPosition();
  }, [data.length, handleScrollToPosition]);

  useEffect(() => {
    if (!lastMessageItem?.content) return;
    if (scrollBottom < SCROLL_THRESHOLD && !isScrolling) {
      handleScrollToPosition();
    }
  }, [lastMessageItem?.content, handleScrollToPosition]); // 只依赖 content，等价

  return {
    data,
    runData,
    isEmptyData,
    scrollbarRef, // 返回两个 ref
    virtualListRef,
    containerHeight,
    showFloatBtn,
    handleScrollToPosition,
    handleScroll,
  };
}
