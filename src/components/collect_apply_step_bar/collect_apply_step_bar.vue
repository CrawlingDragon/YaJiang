<template>
  <div class="step-bar">
    <div class="process">
      <span class="step-now">{{ step }}</span
      >/4
    </div>
    <div class="step-text">{{ stepText }}</div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  step: {
    type: Number,
    default: '1',
  },
  stepText: {
    type: String,
    default: '选择商户类型开通农行结算',
  },
});
</script>
<style lang="scss" scoped>
.step-bar {
  display: flex;
  align-items: center;
  height: 110rem;
  padding: 0 30rem;
  .process {
    color: #999999;
    font-size: 24rem;
    margin-right: 40rem;
    .step-now {
      font-size: 40rem;
      color: #155bbb;
    }
  }
  .step-text {
    font-size: 28rem;
    color: #333333;
  }
}
</style>
