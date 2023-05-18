<template>
  <div class="apply-result">
    <Header :indexHeader="false"></Header>
    <div class="normal box">
      <!-- 申请的第四步跳转到 normal 情况 -->
      <div class="waiting-img"></div>
      <div class="title1">资料银行审核中</div>
      <div class="title2">资料已提交，请耐心等待农行审核</div>
      <div class="look-info" @click="goPageInfo">查看申请材料</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  abc_state: {
    type: String,
    default: 0,
  },
});

const goPageInfo = () => {
  router.push({
    path: '/collect_apply_detail',
  });
};
</script>
<style lang="scss" scoped>
.box {
  margin: 93rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.waiting-img {
  width: 455rem;
  height: 246rem;
  background: url('@/assets/waiting.png') no-repeat;
  background-size: cover;
  background-position: center center;
}
.normal {
  .title1 {
    text-align: center;
    font-size: 34rem;
    color: #333333;
    margin-bottom: 20rem;
  }
  .title2 {
    text-align: center;
    font-size: 24rem;
    color: #999999;
    margin-bottom: 20rem;
  }
}
.look-info {
  margin: 45rem 0;
  font-size: 24rem;
  font-weight: 400;
  color: #155bbb;
}
</style>
