<template>
  <div class="login-wx-container">
    <Header :indexHeader="false"></Header>
    <div class="content">
      <div class="logo-box">
        <van-image
          :src="headerBottomBar.icon"
          class="logo"
          fit="scale-down"
          radius="10%"
        ></van-image>
      </div>

      <van-button round block color="#0D90FF" @click="login">登录</van-button>
    </div>

    <WxLoginAlert v-if="aa" :config="config" />
    <Foot></Foot>
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/header/header.vue';
import Foot from '@/components/foot/foot.vue';
import { useTitles } from '@/common/js/useTitles';
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import WxLoginAlert from '@/components/wx_login_alert/wx_login_alert.vue';
import { getWxSetting } from '@/service/getWxSetting';
import wx from 'weixin-js-sdk';
const store = useStore();

const headerBottomBar = computed(() => store.getters.getterGlobalTitle);
useTitles('登录');

const aa = ref(false);
const config = ref({});
// const WxAlertRef = ref();
onMounted(async () => {
  let r: any = await getWxSetting();
  console.log('3', 1);
  if (r.status == 200) {
    config.value = r.data;
  }
});
const login = () => {
  aa.value = true;
  // WxAlertRef.value.show = true;
};
// wx.ready(() => {
//   // wx-js-sdk初始化成功回调
//   console.log('read');
// });
// wx.error((error) => {
//   // wx-js-sdk初始化失败回调
// });
</script>
<style lang="scss" scoped>
.login-wx-container {
  height: calc(100vh - 90px);
}
.content {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  align-items: center;
  height: 100%;
}
.logo-box {
  height: 66%;
  display: flex;
  align-items: center;
  .logo {
    width: 135px;
    height: 135px;
    margin: 0 auto;
  }
}
</style>
