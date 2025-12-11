<template>
  <div class="shell-wrap">
    <n-menu
      class="menu"
      :options="options"
      v-model:value="mode"
      :on-update:value="handleChangeTab"
    />
    <div :class="['shell', mode]"><Main :mode="mode" /></div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { NMenu } from 'naive-ui';
import Main from './Main.vue';

const mode = ref('pc');

const options = [
  {
    label: 'PC',
    key: 'pc',
  },
  {
    label: 'H5',
    key: 'h5',
  },
  {
    label: 'Bubble',
    key: 'bubble',
  },
];

const handleChangeTab = (val) => {
  mode.value = val;
};
</script>

<style scoped>
.shell-wrap {
  display: flex;
  width: 100vw;
  height: 100vh;
}
.menu {
  width: 180px;
  flex: none;
  height: 100vh;
  border-right: 1px solid #ccc;
  position: absolute;
  left: 0;
  top: 0;
}
.shell.pc {
  width: 70%;
  height: 80%;
  margin: 20px auto;
}
.shell.h5 {
  width: 375px;
  height: 667px;
  margin: 20px auto;
  border-radius: 12px;
}
</style>
