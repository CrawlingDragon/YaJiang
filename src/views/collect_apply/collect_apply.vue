<template>
  <div>
    <router-view :apply_step="apply_step"></router-view>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { applyStatus } from '@/service/base';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
const store = useStore();
const router = useRouter();

const uId = computed(() => store.state.uId);
// 用户现在申请到了第几步，由后端接口返回
const apply_step = ref(1);

onMounted(async () => {
  let t = Toast.loading({
    message: '加载中...',
  });
  let r = await applyStatus(uId.value);
  console.log('r', r);
  apply_step.value = r.apply_step;
  // 暂定数据 apply_step.value
  apply_step.value = 1;
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
      newPath = '/collect_apply_five';
      break;
  }
  router.push({
    path: newPath,
  });
});
</script>
<style lang="scss" scoped></style>
