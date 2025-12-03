/**
 * useChatLayout.ts – 聊天布局通用逻辑
 * ----------------------------------
 * 职责：
 * 1. 注入全局 store，计算是否有消息。
 * 2. 透传 props 中需要的回调（onSwitchConversation / sendMsg / stopMsg / uploadFiles）。
 *
 * 用法：
 * const { hasMessageList, onSwitchConversation, sendMsg, stopMsg, uploadFiles } = useChatLayout(props);
 */

import { ref, computed, nextTick, onMounted } from 'vue';
import { chatStoreInject } from '../../hooks/useChatStore';
import type { IMsChatProps } from '../../types/index';

export default function useChatLayout(props: IMsChatProps) {
  const store = chatStoreInject();

  const hasMessageList = computed(() => store.state?.messageList?.length >= 1);

  const {
    onSwitchConversation,
    onAddConversation,
    onDeleteConversation,
    onUpdateConversation,
    sendMsg,
    stopMsg,
    uploadFiles,
  } = props;

  const headerRef = ref();
  const footerRef = ref();
  const contentHeight = ref('');

  const countHeight = async () => {
    await nextTick();
    const headerHeight = headerRef?.value
      ? headerRef?.value.clientHeight
      : '50';
    const bottomHeight = footerRef?.value
      ? footerRef?.value.clientHeight
      : '70';
    contentHeight.value = `100% - ${Number(headerHeight + bottomHeight)}px`;
  };

  onMounted(() => {
    countHeight();
  });

  return {
    hasMessageList,
    onSwitchConversation,
    onAddConversation,
    onDeleteConversation,
    onUpdateConversation,
    sendMsg,
    stopMsg,
    uploadFiles,
    headerRef,
    footerRef,
    contentHeight,
  };
}
