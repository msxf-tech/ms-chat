<template>
  <Vue3DraggableResizable
    v-if="draggable"
    class="draggable-container"
    :class="className"
    :initW="size?.width"
    :initH="size?.height"
    :minW="minSize.width"
    :minH="minSize.height"
    :maxW="maxSize?.width"
    :maxH="maxSize?.height"
    :disabled="disabled"
    :disableUserSelect="disableUserSelect"
    v-model:x="position.x"
    v-model:y="position.y"
    v-model:w="size.width"
    v-model:h="size.height"
    v-model:active="active"
    @drag-stop="handleDragStop"
    @resize-stop="handleResizeStop"
  >
    <span
      v-if="showCloseButton"
      class="close-btn"
      @click="handleClose"
      aria-label="关闭"
    >
      <n-icon size="20">
        <Close />
      </n-icon>
    </span>
    <slot />
  </Vue3DraggableResizable>
  <div v-else class="chat-container" :class="className">
    <slot />
  </div>
</template>

<script setup lang="ts">
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
import { NIcon } from 'naive-ui';
import { Close } from '@vicons/ionicons5';
import { ref, reactive, watch } from 'vue';

export interface DraggableContainerProps {
  mode: 'pc' | 'h5';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: Record<string, string | number>;
  /** 是否启用拖拽功能 */
  draggable?: boolean;
  /** 初始位置 */
  initialPosition?: { x: number; y: number };
  /** 初始尺寸 */
  initialSize?: { width: number; height: number };
  /** 最小尺寸 */
  minSize?: { width: number; height: number };
  /** 最大尺寸 */
  maxSize?: { width: number; height: number };
  /** 是否禁用拖拽和缩放 */
  disabled?: boolean;
  /** 是否禁用用户选择 */
  disableUserSelect?: boolean;
  /** 是否显示关闭按钮 */
  showCloseButton?: boolean;
  /** 拖拽停止回调 */
  onDragStop?: (position: { x: number; y: number }) => void;
  /** 缩放停止回调 */
  onResizeStop?: (
    size: { width: number; height: number },
    position: { x: number; y: number },
  ) => void;
  /** 关闭按钮点击事件 */
  onClose?: () => void;
}

const props = withDefaults(defineProps<DraggableContainerProps>(), {
  mode: 'h5',
  className: '',
  style: () => ({}),
  draggable: true,
  initialPosition: () => ({ x: 0, y: 0 }),
  minSize: () => ({ width: 300, height: 500 }),
  disabled: false,
  disableUserSelect: true,
  showCloseButton: false,
});

const defaultH5Size = { width: 375, height: 667 };
const defaultPCSize = { width: 800, height: 600 };

const active = ref(false);
const position = reactive({ ...props.initialPosition });
const size = reactive(
  props?.initialSize || props?.mode === 'h5' ? defaultH5Size : defaultPCSize,
);

// 监听初始位置变化
watch(
  () => props.initialPosition,
  (newPosition) => {
    if (newPosition) {
      position.x = newPosition.x;
      position.y = newPosition.y;
    }
  },
  { deep: true },
);

// 监听初始尺寸变化
watch(
  () => props.initialSize,
  (newSize) => {
    if (newSize) {
      size.width = newSize.width;
      size.height = newSize.height;
    }
  },
  { deep: true },
);

const handleDragStop = () => {
  props.onDragStop?.({
    x: position.x,
    y: position.y,
  });
};

const handleResizeStop = () => {
  props.onResizeStop?.(
    {
      width: size.width,
      height: size.height,
    },
    {
      x: position.x,
      y: position.y,
    },
  );
};

const handleClose = () => {
  props.onClose?.();
};
</script>

<style scoped lang="less">
@import url('./index.less');
</style>
