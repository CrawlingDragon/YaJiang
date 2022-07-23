<!-- 采摘码page-->
<template lang="">
  <Header :indexHeader="false" />
  <div class="pick-wrap">
    <div class="pick-box">
      <div class="name">{{ userInfo.realname }}</div>
      <div class="phone">{{ userInfo.pickId }}</div>
      <van-image :src="userInfo.pickQrcode" class="pick-qrcode"></van-image>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import { useTitles } from '../../common/js/useTitles';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import { post } from '@/http';
useTitles('我的采摘码');
const store = useStore();
const uId = computed(() => store.state.uId);
const userInfo = ref({});

const getUserInfo = () => {
  return post('Mobile/User/userCenter', {
    uId: uId.value,
  });
};
onMounted(async () => {
  const data = await getUserInfo();
  userInfo.value = data;
});
</script>
<script lang="ts">
export default {
  name: 'pick_code',
};
</script>
<style lang="scss">
.pick-wrap {
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  .pick-box {
    width: 90%;
    min-height: 52%;
    background: #fff;
    border-radius: 20px;
    text-align: center;
    padding-bottom: 20px;
    .name {
      margin-top: 27px;
      margin-bottom: 8px;
      font-size: $f17;
    }
    .phone {
      margin-bottom: 25px;
      font-size: 13px;
    }
    .pick-qrcode {
      width: calc(480 / 750 * 100%);
      max-width: 640px;
      height: calc(480 / 750 * 100%);
      max-height: 640px;
    }
  }
}
</style>
