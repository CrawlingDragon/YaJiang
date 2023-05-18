<template>
  <div class="apply-result">
    <Header :indexHeader="false"></Header>
    <div class="normal box" v-if="abc_state == '0'">
      <!-- 未开通 -->
      <div class="warning-img"></div>
      <div class="title2">您未开启收款功能。</div>
      <div class="title2">开启后，</div>
      <div class="title2">向消费者出示收款码即可完成快速收款。</div>
      <div class="apply-btn" @click="applyFn">申请开通</div>
      <div class="description" @click="openCodeDescriptionFn">收款码开通说明</div>
    </div>
    <div class="normal box" v-if="abc_state == '1'">
      <!-- 银行验证 -->
      <div class="warning-img"></div>
      <div class="title2">您未开启收款功能。</div>
      <div class="title2">开启后，</div>
      <div class="title2">向消费者出示收款码即可完成快速收款。</div>
      <div class="apply-btn" @click="applyFn">前往账户验证</div>
      <div class="description" @click="openCodeDescriptionFn">收款码开通说明</div>
    </div>
    <div class="normal box" v-if="abc_state == '2'">
      <!-- 待银行审核 -->
      <div class="warning-img"></div>
      <div class="title2">您未开启收款功能。</div>
      <div class="title2">开启后，</div>
      <div class="title2">向消费者出示收款码即可完成快速收款。</div>
      <div class="apply-btn" @click="applyFnFive">银行资料审核中</div>
      <div class="description" @click="openCodeDescriptionFn">收款码开通说明</div>
    </div>
    <div class="normal box" v-if="abc_state == '3'">
      <!-- 审核失败 -->
      <div v-show="failPage == 1">
        <div class="warning-img"></div>
        <div class="title2">您未开启收款功能。</div>
        <div class="title2">开启后，</div>
        <div class="title2">向消费者出示收款码即可完成快速收款。</div>
        <div class="apply-failure-btn" @click="failPage = 2">审核失败</div>
        <div class="description" @click="openCodeDescriptionFn">收款码开通说明</div>
      </div>
      <div v-show="failPage == 2">
        <div class="warning-img"></div>
        <div class="title3">审核失败</div>
        <div class="title4">2023-03-10 14:00</div>
        <div class="title2">失败原因：{{ reason }}</div>
        <div class="apply-failure-btn blue" @click="applyFn">修改资料</div>
        <div class="look-info" @click="goPageInfo">查看申请材料</div>
      </div>
    </div>
    <div class="normal box" v-if="abc_state == '5'">
      <!-- 禁用 -->
      <div class="warning-img"></div>
      <div class="title2">抱歉，您暂时无法使用收款功能</div>
      <div class="description" @click="openCodeDescriptionFn" style="margin-top: 50rem">
        收款码开通说明
      </div>
    </div>
    <!-- 4正常，直接跳转收款码页面 -->
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { applyStatus } from '@/service/base';
import { useRouter } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { useTitles } from '@/common/js/useTitles';
import { Toast, Dialog } from 'vant';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

useTitles('二维码收款码');

const uId = computed(() => store.state.uId);

const abc_state = ref<string>('0'); //审核状态=>0:未开通，1:账户验证中，2:待银行审核，3:审核失败，4:正常，5:已禁用
const failPage = ref(1); //状态为失败的时候，是第一页，还是二页
const reason = ref(''); //失败，或者拒绝理由

onMounted(() => {
  fetchStatus();
});
async function fetchStatus() {
  let t = Toast.loading({
    message: '加载中...',
  });
  let r = await applyStatus(uId.value);
  console.log('r', r);
  abc_state.value = r.abc_state;
  reason.value = r.reason;
  if (r.abc_state == '4') {
    //如果abc的状态为4，直接跳转到收款码
    router.push({
      path: '/collect_money',
    });
  }
  t.clear();
}

const openCodeDescriptionFn = () => {
  Dialog.alert({
    title: '收款码使用说明',
    message: '农行借记卡支付手续费全免，故目前仅支持农行卡 收款功能，更多结算方式敬请期待!',
    confirmButtonColor: '#155BBB',
    confirmButtonText: '好的',
  }).then(() => {
    // on close
  });
};
const applyFn = () => {
  router.push({
    path: '/collect_apply',
  });
};
const applyFnFive = () => {
  router.push({
    path: '/collect_apply_five',
  });
};
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
.warning-img {
  width: 455rem;
  height: 234rem;
  background: url('@/assets/warning.png') no-repeat;
  background-size: cover;
  background-position: center center;
}
.waiting-img {
  width: 455rem;
  height: 246rem;
  background: url('@/assets/waiting.png') no-repeat;
  background-size: cover;
  background-position: center center;
}
.title2 {
  text-align: center;
  font-size: 28rem;
  color: #999999;
  margin-bottom: 5rem;
}
.title3 {
  text-align: center;
  font-size: 36rem;
  font-weight: 400;
  color: #ff6600;
  margin-bottom: 10rem;
}
.title4 {
  text-align: center;
  font-size: 24rem;
  color: #ff6600;
  margin-bottom: 35rem;
}
.apply-btn {
  width: 400rem;
  height: 70rem;
  line-height: 70rem;
  font-size: 30rem;
  margin: 90rem auto 30rem;
  font-weight: 400;
  color: #155bbb;
  border: 1px solid #155bbb;
  border-radius: 35rem;
  text-align: center;
}
.apply-failure-btn {
  width: 400rem;
  height: 70rem;
  line-height: 70rem;
  font-size: 30rem;
  margin: 90rem auto 30rem;
  font-weight: 400;
  color: #ff6600;
  border: 1px solid #ff6600;
  border-radius: 35rem;
  text-align: center;
}
.blue {
  color: #155bbb;
  border: 1px solid #155bbb;
}
.description {
  font-size: 24rem;
  font-weight: 400;
  color: #333333;
  text-align: center;
}
.normal {
  .title1 {
    text-align: center;
    font-size: 34rem;
    color: #333333;
    margin-bottom: 20rem;
  }
}
.look-info {
  margin: 45rem 0;
  font-size: 24rem;
  font-weight: 400;
  color: #155bbb;
  text-align: center;
}
</style>
