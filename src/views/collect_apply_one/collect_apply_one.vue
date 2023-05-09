<template>
  <div class="collect-container">
    <Header :indexHeader="false"></Header>
    <CollectApplyStepBar :step="1" stepText="选择商户类型开通农行结算" />
    <div class="choose-type">
      <van-radio-group v-model="checked">
        <div class="item" @click="checked = 1">
          <div class="type">个体工商户</div>
          <van-radio :name="1" checked-color="#FF6600" />
        </div>
        <div class="item" @click="checked = 2">
          <div class="type">个人商户</div>
          <van-radio :name="2" checked-color="#FF6600" />
        </div>
        <div class="item" @click="checked = 3">
          <div class="type">企业商户</div>
          <van-radio :name="3" checked-color="#FF6600" />
        </div>
      </van-radio-group>
    </div>
    <div class="agree">
      <van-checkbox v-model="agree" class="checkbox" icon-size="30rem">
        我已阅读并同意
      </van-checkbox>
      <div class="outside-href" @click="goPage">《农行商户资金结算三方协议》</div>
    </div>
    <div class="btn" @click="applyFn">下一步</div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/header/header.vue';
import CollectApplyStepBar from '@/components/collect_apply_step_bar/collect_apply_step_bar.vue';
import { useTitles } from '@/common/js/useTitles';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { applyOneStep } from '@/service/base';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const props = defineProps({
  applyOneStep: {
    type: Number,
    default: 1,
  },
});
const uId = computed(() => store.state.uId);
const announce = computed(() => {
  return agree.value ? 0 : 1;
});
useTitles('申请收款码');

const checked = ref(1);
const agree = ref('');

const goPage = () => {
  router.push({
    path: '/farm_capital_deal',
  });
};

const applyFn = async () => {
  if (!agree.value) {
    Toast('请先同意并阅读协议！');
    return;
  }
  let t = Toast.loading('提交中...');
  let r = await applyOneStep(uId.value, props.applyOneStep + 1, checked.value, announce.value);
  t.clear();
  if (r.code) {
    Toast(r.message);
  }
  console.log('r', r);
};
</script>

<style lang="scss" scoped>
.choose-type {
  background: #fff;
  padding-left: 25rem;
  .item {
    height: 150rem;
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 76rem;
    font-size: 36rem;

    font-weight: 400;
    color: #333333;
    &:last-child {
      border: none;
    }
  }
}
.agree {
  display: flex;
  padding: 0 25rem;
  align-items: center;
  font-size: 24rem;
  font-weight: 400;
  color: #333333;
  margin: 23rem 0;
  .checkbox {
    margin-right: 20rem;
  }
  .outside-href {
    color: #155bbb;
  }
}
.btn {
  width: 400rem;
  height: 70rem;
  background: #155bbb;
  border-radius: 35rem;
  text-align: center;
  line-height: 70rem;
  font-size: 30rem;
  font-weight: 400;
  color: #ffffff;
  margin: 25rem auto;
}
</style>
