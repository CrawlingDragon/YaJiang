<template>
  <div class="apply_vip_succeed-container">
    <Header header="indexHeader" navHeader="申请会员"></Header>
    <van-icon name="checked" class="icon" :size="size" />
    <p class="p1 f24">会员申请已提交</p>
    <p class="p2 f18">我们会发短信告知你审核结果<br />请耐心等待</p>
    <div class="index-btn f16" @click="goToHospitalIndex">返回医院首页</div>
  </div>
</template>
<script>
import Header from '@/components/hospital_header/hospital_header';

import { mapState } from 'vuex';
import { onActivated } from 'vue';
import { useTitles } from '../../common/js/useTitles';
export default {
  setup() {
    useTitles('会员申请');
  },
  name: 'applyVipSucceed',
  components: { Header },
  computed: {
    ...mapState(['hospitalName', 'old']),
    size() {
      return this.old ? 80 : '';
    },
  },

  methods: {
    goToHospitalIndex() {
      this.$router.replace({ path: '/hospital' });
    },
  },
};
</script>
<style lang="scss" scoped>
.old {
  .apply_vip_succeed-container {
  }
}
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
    border: 1px solid $theme-color;
    border-radius: 36px;
    font-size: 14px;
    color: $theme-color;
    width: 133px;
    height: 36px;
    line-height: 36px;
  }
}
</style>
