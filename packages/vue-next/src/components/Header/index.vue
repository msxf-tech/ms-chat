<template>
  <div class="header">
    <div class="header-content">{{title}}</div>
  </div>
</template>

<script setup lang="ts">
  import { type IHeaderProps, headerPropsDefault } from '@ms-chat/core';
  withDefaults(defineProps<IHeaderProps>(), headerPropsDefault);
  // 如果有 IheaderEmits
  // const emits = defineEmits(<keyof IheaderEmits>);
</script>

<style scoped lang="less">
.header {
  width: var(--mschat--header--width, 100%);
  .header-content {
    width: var(--mschat--header--width, 100%);
    height: var(--mschat--header--height, 100%);
    background: var(--mschat--header--bg, #000);
    border-bottom: var(--mschat--header--border-bottom);
    font-size: var(--mschat--header--font-size, 1.5em);
    color: var(--mschat--header--color, #000);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--mschat--header--box-shadow, 0 5px 10px -5px rgba(0,0,0,0.3));
  }
}
</style>
