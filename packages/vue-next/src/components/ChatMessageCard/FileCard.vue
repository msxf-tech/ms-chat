<!-- FileCard.vue -->
<template>
  <div class="chat-file-card">
    <n-card
      size="small"
      :class="['file-card', status]"
      :bordered="false"
      hoverable
    >
      <template #header>
        <n-space align="center" :wrap="false">
          <!-- 图标 -->
          <n-icon
            :size="32"
            :color="iconColor"
            :component="fileIcon"
            :class="{ spinning: status === 'uploading' }"
          />

          <!-- 文件名 + 大小 + 状态 -->
          <n-space vertical :size="0">
            <n-text class="file-name" :title="name">
              {{ name }}
            </n-text>
            <n-text depth="3" class="file-meta">
              <span v-if="status === 'uploading'">{{ percent }}%</span>
              <span v-else-if="status === 'error'" class="error-text">
                &nbsp;·&nbsp;上传失败
              </span>
              <span v-else>
                {{ formatSize(size) }}
              </span>
            </n-text>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NCard, NSpace, NText, NIcon } from 'naive-ui';
import {
  FileImageFilled,
  FilePdfFilled,
  FileWordFilled,
  FileExcelFilled,
  FilePptFilled,
  FileZipFilled,
  FileMarkdownFilled,
  FileFilled,
  Loading3QuartersOutlined,
} from '@vicons/antd';
import type { IFileMessageProps } from '@ms-chat/core';

defineProps<IFileMessageProps>()

const emit = defineEmits<{
  preview: [];
  download: [];
  remove: [];
}>();

// 1. 类型枚举
const fileType = computed(() => {
  const n = props.name.toLowerCase();
  if (/\.(jpe?g|png|gif|webp)$/i.test(n)) return 'image';
  if (/\.(pdf)$/i.test(n)) return 'pdf';
  if (/\.(docx?)$/i.test(n)) return 'word';
  if (/\.(xlsx?)$/i.test(n)) return 'excel';
  if (/\.(pptx?)$/i.test(n)) return 'ppt';
  if (/\.(md?)$/i.test(n)) return 'md';
  if (/\.(zip|rar|7z)$/i.test(n)) return 'zip';
  return 'file';
});

// 2. 图标映射
const fileIconMap: Record<string, any> = {
  image: FileImageFilled,
  pdf: FilePdfFilled,
  word: FileWordFilled,
  excel: FileExcelFilled,
  ppt: FilePptFilled,
  zip: FileZipFilled,
  md: FileMarkdownFilled,
  file: FileFilled,
};
const fileIcon = computed(() =>
  props.status === 'uploading'
    ? Loading3QuartersOutlined
    : fileIconMap[fileType.value],
);

// 3. 颜色映射
const iconColorMap: Record<string, string> = {
  image: '#8c5ce6',
  pdf: '#ff6b6b',
  word: '#2b579a',
  excel: '#217346',
  ppt: '#d24726',
  zip: '#51cf66',
  md: '#fb7185',
  file: '#339af0',
};
const iconColor = computed(() => iconColorMap[fileType.value]);
/* ---------- 工具 ---------- */
const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};
</script>

<style scoped>
.file-card {
  padding: 8px 12px;
  min-width: 266px;
  max-width: 400px;
}
.file-card.uploading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}
.file-name {
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.error-text {
  color: #e88080;
}
.spinning {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
