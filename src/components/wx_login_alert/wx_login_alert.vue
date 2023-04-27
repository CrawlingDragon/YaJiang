<template>
  <div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
      <div class="popup">
        <van-button round block color="#0D90FF" class="btn1" @click="wxLoginFn">
          <div class="icon"></div>
          微信授权一键登录</van-button
        >
        <van-button round block class="btn1">手机号登录</van-button>
        <p class="p1">
          <van-checkbox v-model="checked" icon-size="15px" class="checkbox"></van-checkbox
          >已阅读并同意 <span class="blue">用户协议</span> 与<span class="blue">隐私政策</span>
        </p>
      </div>
    </van-popup>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
// import wx from 'wx-js-sdk';
import wx from 'weixin-js-sdk';
import { getWxSetting } from '@/service/getWxSetting';
const props = defineProps({
  config: {
    type: Object,
    default: function () {
      return {};
    },
  },
});

const show = ref(true);
const checked = ref(true);
defineExpose({
  show,
});

onMounted(async () => {
  // wx.config({
  //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //   appId: props.config.appId, // 必填，公众号的唯一标识
  //   timestamp: props.config.timestamp, // 必填，生成签名的时间戳
  //   nonceStr: props.config.nonceStr, // 必填，生成签名的随机串
  //   signature: props.config.signature, // 必填，签名
  //   jsApiList: ['checkJSApi', 'checkJsApi', 'getPhoneNumber', 'chooseImage'], // 必填，需要使用的JS接口列表
  // });
});
// wx.ready(function () {
//   console.log('ready');
// });

// 配置wx-js-sdk参数
// wx.config({
//   debug: true,
//   appId: 'wxf35226b723b79e67',
//   timestamp: '应用签名时间戳',
//   nonceStr: '应用签名随机串',
//   signature: '应用签名',
//   jsApiList: ['checkJsApi', 'getPhoneNumber'], // 需要使用的微信小程序方法列表
// });

const wxLoginFn = () => {
  wx.checkJsApi({
    jsApiList: ['chooseImage'],
    success(res: any) {
      console.log('res2', res);
      if (res.checkResult.getPhoneNumber) {
        // 如果该方法可用，则调用微信小程序获取手机号的方法
        wx.miniProgram.getPhoneNumber({
          success(res: any) {
            console.log('res', res);
            const { phoneNumber } = res;
            console.log('phoneNumber', phoneNumber);
            alert(phoneNumber);
            // 将手机号从微信小程序中回传给H5端
            this.$emit('phone-number', phoneNumber);
          },
        });
      } else {
        console.log('error');
        // 没有权限使用该方法
      }
    },
  });
};
</script>
<style lang="scss" scoped>
.popup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  height: 100%;
  .btn1 {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    :deep().van-button__text {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 19px;
        height: 17px;
        background: url(./wx.png) no-repeat;
        margin-right: 10px;
        background-size: cover;
      }
    }
  }
  .p1 {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    display: flex;
    justify-content: center;
    .blue {
      color: #0d90ff;
    }
    .checkbox {
      margin-right: 7px;
    }
  }
}
</style>
