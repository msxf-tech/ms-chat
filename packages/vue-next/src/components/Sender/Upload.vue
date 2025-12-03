<template>
  <n-modal
    :show="props.showUpload"
    @update:show="$emit('update:showUpload', $event)"
  >
    <n-card
      style="width: 600px"
      title="文件上传"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-upload
        multiple
        directory-dnd
        :max="5"
        :default-upload="false"
        @change="handleFileChange"
      >
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <ArchiveIcon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
        </n-upload-dragger>
      </n-upload>

      <template #footer>
        <n-space justify="end">
          <n-button color="#2c80f8" @click="handleCancel">取消</n-button>
          <n-button color="#2c80f8" type="primary" @click="handleUpload"
            >开始上传</n-button
          >
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import {
  NButton,
  NModal,
  NCard,
  NUpload,
  NUploadDragger,
  NSpace,
  NIcon,
} from 'naive-ui';
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5';

const props = defineProps({
  showUpload: Boolean,
});

const emits = defineEmits(['update:showUpload', 'upload']);

const fileList = ref([]);

const handleCancel = () => {
  fileList.value = [];
  emits('update:showUpload', false);
};

const handleFileChange = (options: any) => {
  const { fileList: files } = options;
  fileList.value = files;
};

const handleUpload = () => {
  if (fileList.value.length === 0) {
    alert('请先选择文件');
    return;
  }
  emits('upload', fileList.value);
  fileList.value = [];
  emits('update:showUpload', false);
};
</script>
<style scoped lang="less">
.n-upload-dragger:hover {
  border-color: #2c80f8;
}
</style>
