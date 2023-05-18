<template>
  <!-- 支付方式 -->
  <div class="pay_mode">
    <div class="top">
      <div class="open-mode-ios" v-if="mode === 'ios'"></div>
      <div class="open-mode-ard" v-else></div>
    </div>

    <div class="main-pay-info">
      <div class="pay-icon"></div>
      <div class="money"><span>¥</span>4100.90</div>
      <div class="mode">农行掌上银行支付</div>
    </div>
    <div class="tips">
      <div class="p1">支付说明</div>
      <div class="p1">1.请确保已安装中国农业银行APP，并拥有农行借记卡</div>
      <div class="p1" v-if="mode === 'ios'">
        2.再使用
        <div class="icon"></div>
        Safari打开此页面
      </div>
      <div class="p1" v-else>2.在浏览器打开此页面</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useTitles } from '@/common/js/useTitles';
useTitles('农行掌银支付');

const mode = ref<String>('ios');
</script>
<style lang="scss" scoped>
.pay_mode {
  margin-top: -40px;
}
.top {
  display: flex;
  justify-content: end;
  padding: 10rem 40rem 115rem 0;
  .open-mode-ios {
    width: 579rem;
    height: 157rem;
    background: url('@/assets/pay-mode-ios.png') no-repeat;
    background-position: center;
    background-size: 99% 99%;
  }
  .open-mode-ard {
    width: 539rem;
    height: 157rem;
    background: url('@/assets/pay-mode-ard.png') no-repeat;
    background-position: center;
    background-size: 99% 99%;
  }
}
.main-pay-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  .pay-icon {
    width: 160rem;
    height: 160rem;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 20rem;
    margin-bottom: 35rem;
  }
  .money {
    font-size: 70rem;
    font-weight: bold;
    color: #ff6600;
    margin-bottom: 30rem;
    & > span {
      font-size: 40rem;
      font-weight: 400;
      color: #ff6600;
      margin-right: 10rem;
    }
  }
  .mode {
    font-size: 30rem;
    font-weight: bold;
    color: #333333;
  }
}
.tips {
  padding: 100rem 44rem 30rem;
  .p1 {
    font-size: 28rem;
    font-weight: 400;
    color: #666666;
    margin-bottom: 25rem;
    display: flex;
    .icon {
      width: 38rem;
      height: 40rem;
      background: url('@/assets/safari.png') no-repeat;
      background-position: center center;
      background-size: cover;
      margin: 0 5rem;
    }
  }
}
</style>
