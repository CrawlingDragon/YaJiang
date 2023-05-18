<template>
  <div class="container">
    <div class="icon">
    </div>
    <div class="title">
      已收到您的投诉
    </div>
    <div class="text">
      <div class="item">感谢您的反馈，</div>
      <div class="item">我们会尽快处理您的投诉内容，</div>
      <div class="item">稍后请留意客服电话</div>
    </div>
  </div>
</template>
<script setup>
import { useTitles } from '@/common/js/useTitles';
useTitles('已投诉');
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  background: #F6F6F6;
  position: absolute;
  top: 0;
  left: 0;

  .icon {
    width: 455rem;
    height: 233rem;
    margin: 167rem auto 8rem;
    background: url('./confirm.png') no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }

  .title {
    width: 100%;
    height: 34rem;
    font-size: 34rem;
    font-family: Microsoft YaHei;
    color: #333333;
    line-height: 34rem;
    text-align: center;
  }

  .text {
    width: 100%;
    text-align: center;
    font-size: 24rem;
    font-family: Microsoft YaHei;
    color: #999999;
    line-height: 40rem;
    margin-top: 27rem;
  }
}
</style>