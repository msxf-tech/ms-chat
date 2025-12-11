<!--
 * Main.vue – 聊天窗口「组件分发器」
 * ----------------------------------
 * 职责：
 * 1. 根据当前 mode（pc / h5 / bubble / …）动态加载对应布局组件。
 * 2. 将外部透传的 props、$attrs、插槽全部转发给当前布局组件。
 * 3. 通过 useMode 暴露统一的操作接口，保证外层无感知差异。
 *
 * 用法：
 * 该组件不会直接被业务方使用，而是由内部渲染。
-->

<template>
  <component :is="currentComponent" v-bind="{ ...$attrs, ...props }">
    <template v-for="(_, slot) in $slots" #[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
  </component>
</template>

<script setup lang="ts">
import useMode from './hooks/useMode';
import type { IMsChatProps } from '../types/index';
import '../styles/globals.css';

const props = defineProps<IMsChatProps>();
const { currentComponent } = useMode(props);
</script>
