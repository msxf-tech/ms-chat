<template>
  <transition name="fade">
    <n-float-button
      v-show="showFloatBtn"
      :position="'absolute'"
      :right="30"
      :bottom="30"
      shape="circle"
      size="100"
      @click="handleScrollToPosition"
    >
      <n-icon>
        <ArrowDownOutlined />
      </n-icon>
    </n-float-button>
  </transition>
</template>

<script setup lang="ts">
import { NFloatButton, NIcon } from 'naive-ui';
import { ArrowDownOutlined } from '@vicons/antd';
import { injectStore } from '../hooks/index';

const store = injectStore();

const { showFloatBtn, handleScrollToPosition, isEmptyData } = store;
</script>

<style lang="less" scoped>
/* 进入前 & 离开后状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 进入过程 & 离开过程 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
