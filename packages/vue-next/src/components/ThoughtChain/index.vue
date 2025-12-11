<template>
  <div>
    <n-steps vertical :current="current">
      <n-step
        v-for="item in data"
        :title="item.title"
        :description="item.description"
        :status="item.status"
      >
        <template #icon>
          <n-spin size="small" style="margin: -5px 0 0 -5px" />
        </template>
      </n-step>
    </n-steps>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { NSteps, NStep, NSpin } from 'naive-ui';

interface IThoughtChainItem {
  title: string;
  description: string;
  status: 'pending' | 'success' | 'error';
}
interface Iprops {
  current?: number; //start end
  thoughtChainItems: Array<IThoughtChainItem>;
}
const props = withDefaults(defineProps<Iprops>(), {});
onMounted(() => {});
</script>

<style lang="less" scoped></style>
