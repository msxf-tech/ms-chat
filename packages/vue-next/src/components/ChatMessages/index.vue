<template>
  <list>
    <template v-for="(_, slot) in $slots" #[slot]="props">
      <slot :name="slot" v-bind="props"/>
    </template>
  </list>
  <empty />
</template>

<script setup lang="ts">
  import List from './components/List.vue'
  import Empty from './components/Empty.vue'
  import useChatList, { provideStore } from './hooks/index.js';

  const props = defineProps({
    data: Array,
    config: Object
  });

const store = useChatList(props);
provideStore(store);

console.log(store,'storestore')
</script>

<style lang="less" scoped>
  .chat-message-list {
    position: relative;
    height: 100%;
  }
</style>

