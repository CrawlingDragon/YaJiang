<template>
  <div class="bank">
    <Header :indexHeader="false"></Header>
    <iframe src="https://www.baidu.com" class="if"></iframe>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
</script>
<style lang="scss" scoped>
.if {
  width: 100%;
  height: 100%;
}
.bank {
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
</style>
