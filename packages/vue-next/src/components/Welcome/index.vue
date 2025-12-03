<template>
  <div class="welcome">
    <section class="welcome-title">{{ content.title }}</section>
    <section class="welcome-describe">{{ content.describe }}</section>
    <section class="welcome-prompt">
      <div class="welcome-prompt-title">{{ content.prompt.title }}</div>
      <div class="welcome-prompt-list">
        <div v-for="(item, i) in content.prompt.list" :key="i" class="welcome-prompt-item" @click="setInput(item)">
          {{ item }}
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface IWelcomeContent {
  title: string;
  describe: string;
  prompt: {
    title: string;
    list: string[];
  };
}

interface Props {
  content: IWelcomeContent
}

const props = withDefaults(defineProps<Props>(), {
  content: () => {
    return {
      title: '',
      describe: '',
      prompt: {
        title: '',
        list: [],
      },
    }
  }
});

const emit = defineEmits<{'setInput': [item: string]}>();

/**
 * Welcome props content
 * @type {IWelcomeContent}
 */
const content = computed(() => {
  return props.content;
});

/**
 * 点击 prompt 列表触发事件
 * @param {string} item prompt item
 */
const setInput = (item: string) => {
  emit('setInput', item)
};

</script>
<style scoped lang="less">
@import url('./index.less');
</style>
