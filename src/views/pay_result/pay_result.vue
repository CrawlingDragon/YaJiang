<template>
  <div class="pay_result-container">
    <van-image class="avatar"></van-image>
    <div class="name">扎西（采摘户）</div>
    <div class="company">雅江县永康绿色食品有限责任公司</div>
    <div class="money">¥ 80.00</div>
    <div class="status"><van-icon name="passed" class="passed" />支付成功</div>
  </div>
</template>
<script setup lang="ts">
import { useTitles } from '@/common/js/useTitles';

useTitles('支付成功');
</script>
<style lang="scss" scoped>
.pay_result-container {
  padding: 152rem 0 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  width: 100rem;
  height: 100rem;
  background: #ffffff;
  border: 1px solid #bfbfbf;
  border-radius: 10rem;
  margin-bottom: 45rem;
}
.name {
  font-size: 40rem;
  font-weight: 400;
  color: #333333;
  margin-bottom: 20rem;
}
.company {
  font-size: 28rem;
  color: #999999;
  margin-bottom: 70rem;
}
.money {
  font-size: 74rem;
  font-weight: 400;
  color: #333333;
  margin-bottom: 62rem;
}
.status {
  font-size: 40rem;
  font-weight: 400;
  color: #155bbb;
  display: flex;
  align-items: center;
  .passed {
    font-size: 80rem;
    margin-right: 20rem;
  }
}
</style>
