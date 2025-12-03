<template>
  <div class="chat-message-card">
    <div v-if="type === 'ext'">
      <slot name="ext" v-bind="{ content, type }" />
    </div>
    <template v-else>
      <component
        :is="componentToRender"
        v-if="componentToRender"
        v-bind="props"
      >
        <template v-for="(_, slot) in $slots" #[slot]="props">
          <slot :name="slot" v-bind="props" />
        </template>
      </component>
      <div v-else>未知消息类型 {{ type }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getMessageComponent } from '@ms-chat/core';
interface Iprops {
  content: string;
  type: string;
}

const props = withDefaults(defineProps<Iprops>(), {});
const componentToRender = computed(() => getMessageComponent(props.type));

onMounted(() => {});
</script>

<style lang="less" scoped>
.chat-message-card {
  word-break: break-all;
  overflow-wrap: break-word;
  max-width: 100%;
}
</style>
