<template lang="">
  <div class="status-box" :class="trainStatusClass">{{ trainStatusStr }}</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  trainStatus: {
    type: String,
    default: '0',
  },
});
const trainStatusStr = computed(() => {
  return props.trainStatus === '1' ? '未开始' : props.trainStatus === '2' ? '进行中 ' : '已结束';
});
const trainStatusClass = computed(() => {
  return props.trainStatus === '1'
    ? 'before_live'
    : props.trainStatus === '2'
    ? 'living '
    : 'lived';
});
</script>
<style lang="scss">
.status-box {
  width: 57px;
  height: 27px;
  border-radius: 23px;
  line-height: 22px;
  font-size: 12px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  &.living {
    background: $theme-three-color;
  }
  &.lived {
    background: $f-color;
  }
  &.before_live {
    background: $theme-color;
  }
}
</style>
