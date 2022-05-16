<template>
  <div class="go-top-btn" @click="goTop" v-show="show">回到<br />顶部</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDebounceFn } from '@vueuse/core';
const show = ref<boolean>(false);

onMounted(() => {
  window.addEventListener('scroll', debounceFn, false);
});

const debounceFn = useDebounceFn(() => {
  // 屏幕高度
  let clientH = document.documentElement.clientHeight;
  // 屏幕滚动高度
  let winScrollTop = document.documentElement.scrollTop;
  // 滚动距离大于屏幕高度2倍再出现按钮
  if (winScrollTop >= clientH * 2) {
    show.value = true;
  } else {
    show.value = false;
  }
}, 200);

function goTop() {
  //点击回到顶部按钮
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>
<style lang="scss">
.old {
  .go-top-btn {
    bottom: 120px;
    font-size: 18px;
  }
}
.go-top-btn {
  padding: 10px;
  font-size: 14px;
  position: fixed;
  right: 10px;
  bottom: 60px;
  color: $f-color;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 100%;
  line-height: 1.1;
}
</style>
