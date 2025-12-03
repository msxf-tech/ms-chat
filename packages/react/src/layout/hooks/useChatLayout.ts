import { useRef, useState, useContext, useEffect } from 'react';
import { ChatStoreContext } from '../../contexts';
import type { IMsChatProps } from '../../types';

export function useChatLayout(props: IMsChatProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const store: any = useContext(ChatStoreContext);

  const [contentHeight, setContentHeight] = useState('');

  const hasMessageList = store?.state?.messageList?.length >= 1;

  const {
    onAddConversation,
    onDeleteConversation,
    onSwitchConversation,
    onUpdateConversation,
    onSendMsg,
    onStopMsg,
    onUploadFiles,
  } = props;

  const countHeight = async () => {
    const headerHeight = headerRef?.current?.clientHeight ?? '50';
    const bottomHeight = footerRef?.current?.clientHeight ?? '70';
    setContentHeight(`100% - ${Number(headerHeight) + Number(bottomHeight)}px`);
  };

  // 优先用 slots.xxx，没有就用默认组件
  const renderSlot = (name: string, fallback: React.ReactNode) => {
    return props.slots?.[name] ?? fallback;
  };

  // 作用域插槽
  const scopeSlots: Record<string, any> = {};
  Object.keys(props.slots || {}).forEach((key) => {
    if (!['conversation', 'header', 'welcome', 'sender'].includes(key)) {
      scopeSlots[key] = props.slots![key];
    }
  });

  // 当主题设置时，会导致元素高度变化，监听变化再执行
  useEffect(() => {
    const headerEl = headerRef.current;
    const footerEl = footerRef.current;
    if (!headerEl || !footerEl) return;
    const observer = new ResizeObserver(() => {
      countHeight();
    });
    observer.observe(headerEl);
    observer.observe(footerEl);
    // 初始化时先执行一次
    countHeight();
    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    headerRef,
    footerRef,
    hasMessageList,
    contentHeight,
    onAddConversation,
    onDeleteConversation,
    onSwitchConversation,
    onUpdateConversation,
    onSendMsg,
    onStopMsg,
    onUploadFiles,
    renderSlot,
    scopeSlots,
  };
}
