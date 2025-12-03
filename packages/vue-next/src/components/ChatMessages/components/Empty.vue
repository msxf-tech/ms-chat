<template>
  <n-empty description="暂无数据" v-if="isEmptyData"> </n-empty>
</template>

<script setup lang="ts">
import { NEmpty } from 'naive-ui';
import { injectStore } from '../hooks/index.js';

const store = injectStore();
const { isEmptyData } = store;
</script>

<style lang="less" scoped></style>
