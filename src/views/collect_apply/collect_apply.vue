<template>
  <div>
    <router-view
      :apply_step="apply_step"
      :sub_mer_type="sub_mer_type"
      :account_type="account_type"
      :userInfo="userInfo"
    ></router-view>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { Toast } from 'vant';
import { applyStatus } from '@/service/base';
import { useStore } from 'vuex';
import { computed, onMounted, ref, watch } from 'vue';
import { useTitles } from '@/common/js/useTitles';
const store = useStore();
const router = useRouter();
const route = useRoute();

useTitles('申请收款码');

const uId = computed(() => store.state.uId);
// 用户现在申请到了第几步，由后端接口返回
const apply_step = ref<number>(1); // 申请到第几部
const sub_mer_type = ref(1); //用户类型 ：1，个体工商户 2，企业商户 3，个体商户
const abc_state = ref('0');
const account_type = ref('401'); //银行账户类型，用于第四步验证区分
const userInfo = ref(); //申请的用户信息

onMounted(() => {
  fetchStatus();
});

watch(
  () => route.path,
  async () => {
    let r = await applyStatus(uId.value);
    // console.log('r', r);
    apply_step.value = parseInt(r.apply_step);
    sub_mer_type.value = r.sub_mer_type;
    account_type.value = r.account_type;
    userInfo.value = r;
    // sub_mer_type.value = 2;
    console.log('sub_mer_type', sub_mer_type.value);
  }
);

async function fetchStatus() {
  let t = Toast.loading({
    message: '加载中...',
  });
  let r = await applyStatus(uId.value);
  // console.log('r', r);
  apply_step.value = parseInt(r.apply_step);
  sub_mer_type.value = r.sub_mer_type;
  abc_state.value = r.abc_state;
  account_type.value = r.account_type;
  userInfo.value = r;
  // sub_mer_type.value = 1;
  // 暂定数据 apply_step.value
  // apply_step.value = 4;
  // account_type.value = '401';
  let newPath = '';
  t.clear();
  switch (apply_step.value) {
    case 1:
      //去申请第一步 ，路由
      newPath = '/collect_apply_one';
      break;
    case 2:
      //去申请第二步，路由
      newPath = '/collect_apply_two';
      break;
    case 3:
      //去申请第三步，路由
      newPath = '/collect_apply_three';
      break;
    case 4:
      //去申请第四步，路由
      newPath = '/collect_apply_four';
      break;
    case 5:
      //去申请第四步，路由
      if (abc_state.value == '2') {
        newPath = '/collect_apply_five';
      } else {
        newPath = '/collect_apply_result';
      }
      break;
  }
  router.push({
    path: newPath,
  });
}
</script>
<style lang="scss" scoped></style>
