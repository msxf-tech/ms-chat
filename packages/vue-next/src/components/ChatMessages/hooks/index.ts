import { ref, nextTick, watch, computed, provide, inject, toRef } from 'vue';

interface MessageItem {
  [key: string]: any;
}
export interface BubbleItem {
  name?: '',
  avatar?: {
    src: string;
  }
}

export interface Bubble {
    left?: BubbleItem
    right?: BubbleItem
}

interface Props {
  data: MessageItem[];
  config: {
    bubble: Bubble
  }
}

function useChatList(props: Props) {
  let data = toRef(props, 'data');
  const config = toRef(props, 'config');
  const SCROLL_THRESHOLD = 100;
  const scrollBottom = ref(0);

  const isEmptyData = computed(() => data.value.length <= 0);

  // 消息本身会有bubble 同时传入的config有可能有bubble
  const runData = computed(() => {
    return data.value.map(ma => {
      const { bubble } = ma;
      // Bubble 要分左右
      const { bubble: configBubble } = config.value;
      const { left, right } = configBubble || {};
      if(bubble) {
        return ma
      }
      else if(configBubble) {
        return {
          ...ma,
          bubble: ma.role === 'user' ? right : left
        }
      }
      return ma
    })
  })
  const scrollbarRef = ref<HTMLElement | null>(null);
  const showFloatBtn = ref(true);

  const handleScrollToPosition = () => {
    (scrollbarRef.value as any)?.scrollTo({
      position: 'bottom',
      behavior: 'smooth',
      debounce: true,
    });
  };

  let scrollTimer: ReturnType<typeof setTimeout> | null = null;
  const isScrolling = ref(false);
  const handleScroll = (e: Event) => {
    isScrolling.value = true;
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
      isScrolling.value = false;
    }, 150);

    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
    const distanceToBottom = Math.floor(
      scrollHeight - scrollTop - clientHeight,
    );
    scrollBottom.value = distanceToBottom;

    if (distanceToBottom < SCROLL_THRESHOLD) {
      showFloatBtn.value = false;
    } else {
      showFloatBtn.value = true;
    }
  };
  const lastMessageItem = computed(() => {
    if (data.value.length) {
      return data.value[data.value.length - 1];
    }
    return null;
  });
  watch(
    () => data.value,
    async (newVal, oldVal) => {
      await nextTick();
      if (newVal?.length !== oldVal?.length) {
        handleScrollToPosition();
      }
    },
  );

  watch(
    () => lastMessageItem.value,
    async (newVal) => {
      if (newVal?.content) {
        if (scrollBottom.value < SCROLL_THRESHOLD) {
          if (!isScrolling.value) {
            handleScrollToPosition();
          }
        }
      }
    },
    {
      deep: true,
    },
  );

  return {
    data,
    runData,
    config,
    isEmptyData,
    scrollbarRef,
    showFloatBtn,
    handleScrollToPosition,
    handleScroll,
  };
}

const STORE_KEY = 'list-store';
export function provideStore(store?: ReturnType<typeof useChatList>) {
  return provide(STORE_KEY, store ? store : useChatList({ data: [] }));
}
export function injectStore() {
  return inject(STORE_KEY)!;
}
export default useChatList;
