<template>
  <div class="apply_vip_succeed-container">
    <Header header="indexHeader" navHeader="申请会员"></Header>
    <van-icon name="checked" class="icon" :size="size" />
    <p class="p1 f24">会员申请已提交</p>
    <p class="p2 f18">我们会发短信告知你审核结果<br />请耐心等待</p>
    <div class="index-btn f16" @click="goToHospitalIndex">
      返回{{ getDefaultMenuName.hospitalName }}首页
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/hospital_header/hospital_header.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useTitles } from '../../common/js/useTitles';
import { useRouter } from 'vue-router';
useTitles('会员申请');
const store = useStore();
const router = useRouter();
// name: 'applyVipSucceed',
const getDefaultMenuName = computed(() => store.getters.getDefaultMenuName);
const old = computed(() => store.state.old);
const size = computed(() => (old.value ? 80 : ''));

function goToHospitalIndex() {
  router.replace({ path: '/hospital' });
}
</script>
<style lang="scss" scoped>
// .old {
//   .apply_vip_succeed-container {
//   }
// }
.apply_vip_succeed-container {
  text-align: center;
  .icon {
    font-size: 50px;
    color: #00b772;
    margin-top: 50px;
  }
  .p1 {
    font-size: 15px;
    color: $f-color;
    margin-top: 15px;
  }
  .p2 {
    font-size: 12px;
    color: $f-color-second;
    margin-top: 20px;
  }
  .index-btn {
    position: fixed;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);
    border: 1px solid $border-color;
    border-radius: 36px;
    font-size: 14px;
    color: $theme-color;
    width: 133px;
    height: 36px;
    line-height: 36px;
  }
}
</style>
