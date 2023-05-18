<template>
  <div class="collect-container">
    <Header :indexHeader="false"></Header>
    <CollectApplyStepBar :step="4" stepText="账户验证" />
    <div class="not-public" v-if="account_type == '401'">
      <div class="title">已向手机尾号7775发送短信验证码</div>
      <div class="title">
        未收到验证码
        <div class="btn" @click="sendVerificationCode" :class="{ disabled: countdown > 0 }">
          {{ countdown > 0 ? `${countdown}s后重新发送` : '发送验证码' }}
        </div>
      </div>
      <van-cell-group class="input-box">
        <van-field v-model="code" label="验证码" placeholder="请输入收到的验证码" />
      </van-cell-group>
    </div>
    <div class="public" v-else>
      <div class="title">已往账户***776打款，请输入账户中收到的金额。</div>
      <div class="title">多次验资请输入历史收款金额</div>
      <van-cell-group class="input-box">
        <van-field v-model="money" label="验证金额" placeholder="请输入对公账号中收到的金额" />
      </van-cell-group>
    </div>
    <div class="sub-box">
      <div class="sub-btn" @click="subFn">确定并提交审核</div>
      <div class="look-apply-data" @click="goPageApplyDetail">查看申请材料</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import CollectApplyStepBar from '@/components/collect_apply_step_bar/collect_apply_step_bar.vue';
import { ref, computed } from 'vue';
import { applyFourStep } from '@/service/base';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';

const store = useStore();
const router = useRouter();

const uId = computed(() => store.state.uId);

const props = defineProps({
  sub_mer_type: {
    type: Number,
    default: 1,
  },
  apply_step: {
    type: Number,
    default: 1,
  },
  account_type: {
    type: String,
    default: '401',
  },
});

const code = ref('');
const money = ref('');
//单独设置2个请求函数，在 一个sub函数内判断

//提交审核
const subFn = async () => {
  let p = props.sub_mer_type == 1 ? code.value : money.value;
  if (props.sub_mer_type == 1) {
    if (code.value == '') {
      Toast('验证码不能为空');
      return;
    }
  } else {
    if (money.value == '') {
      Toast('验证金额不能为空');
      return;
    }
  }
  let r = await applyFourStep(uId.value, props.apply_step, props.sub_mer_type, p);
  if (r.code) {
    Toast(r.message);
    return;
  }
  setTimeout(() => {
    router.push({
      path: '/collect_apply_five',
    });
  }, 1000);
  console.log('r', r);
};

const countdown = ref(0);

//点击倒计时60s
const sendVerificationCode = () => {
  if (countdown.value > 0) return;
  // 禁用发送按钮
  countdown.value = 60;
  // 设置倒计时定时器
  const timer = setInterval(() => {
    // 倒计时减1
    countdown.value--;
    // 如果倒计时结束
    if (countdown.value === 0) {
      // 清除倒计时定时器
      clearInterval(timer);
    }
  }, 1000);
  // 发送验证码的逻辑
  // ...
};

// 查看验证资料
const goPageApplyDetail = () => {
  router.push({ path: '/collect_apply_detail' });
};
</script>
<style lang="scss" scoped>
.not-public,
.public {
  .title {
    padding: 0 25rem;
    font-size: 28rem;
    font-weight: 400;
    color: #999999;
    margin-bottom: 20rem;
    display: flex;
    line-height: 1.1;
    align-items: center;
    .btn {
      width: 170rem;
      height: 44rem;
      background: #ffffff;
      border: 1px solid #155bbb;
      border-radius: 22rem;
      text-align: center;
      line-height: 44rem;
      margin-left: 20rem;
      color: #155bbb;
      font-size: 24rem;
      &.disabled {
        background: #bfbfbf;
        color: #ffffff;
        border: 1px solid #bfbfbf;
      }
    }
  }
}
.input-box {
  height: 120rem;
  align-items: center;
  display: flex;

  :deep().van-field__label,
  :deep().van-field__control {
    font-size: 32rem;
    color: #333333;
  }
  ::placeholder {
    color: #999;
  }
}
.sub-box {
  margin-top: 50rem;
  .sub-btn {
    width: 400rem;
    height: 70rem;
    background: #155bbb;
    border-radius: 35rem;
    text-align: center;
    line-height: 70rem;
    margin: 0 auto;
    font-size: 30rem;
    color: #fff;
  }
  .look-apply-data {
    font-size: 24rem;
    text-align: center;
    margin: 30rem 0;
    font-weight: 400;
    color: #155bbb;
  }
}
</style>
