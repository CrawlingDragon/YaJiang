<template>
  <div>
    <van-field
      v-model="text"
      class="address"
      name="所在位置"
      label="所在位置"
      placeholder=""
      readonly
      input-align="right"
      :class="{
        fail: text === '定位中···' || text === '抱歉未定位到',
      }"
      @click="reLocation"
    >
      <template #right-icon>
        <van-icon name="arrow" />
      </template>
    </van-field>
    <div id="container"></div>
  </div>
</template>
<script>
// import AMap from "AMap";

import { askGeo } from '@/common/js/baidu_locationAddress';
import { mapState } from 'vuex';
// import storage from "good-storage";
import { onMounted, computed, reactive, toRefs, ref } from 'vue';
import { useStore } from 'vuex';
import { Dialog } from 'vant';
export default {
  name: 'local',
  setup(props, { emit }) {
    const store = useStore();
    const axiosAddress = computed(() => store.state.axiosAddress);
    const userInfoLocation = computed(() => store.state.userInfoLocation);
    // console.log("userInfoLocation", userInfoLocation);
    const locationTime = ref('first');
    const addressObj = reactive({
      // 定位数据
      text: '定位中···',
    });

    onMounted(() => {
      reLocation();
    });
    async function reLocation() {
      // if (locationTime.value === "sucess") {
      //   return;
      // }
      const { askGeolocationAgain } = askGeo();
      addressObj.text = '定位中···';
      let localtionAddress = await askGeolocationAgain(); // 定位的地址
      // addressObj.text = axiosAddress.value;
      // console.log("userInfoLocation", userInfoLocation.value);
      if (localtionAddress !== 6 && localtionAddress !== 99) {
        addressObj.text = localtionAddress;
        locationTime.value = 'sucess';
        emit('update:address', addressObj.text);
      } else {
        if (locationTime.value == 'first') {
          addressObj.text = '抱歉未定位到';
          locationTime.value = 'noFirst';
          emit('update:address', addressObj.text);
          return;
        }
        if (localtionAddress == 6) {
          //6是没有权限
          //7是服务不可用
          //定位权限未打开
          // 位置结果未知。对应数值“2”
          if (userInfoLocation.value === '') {
            //个人资料地址为空
            Dialog.alert({
              title: '定位失败',
              message: '检测到您未打开定位服务',
              confirmButtonText: '不显示地址',
              confirmButtonColor: '#155BBB',
            }).then(() => {
              // on close
              addressObj.text = '';
              emit('update:address', addressObj.text);
            });
          } else {
            //个人资料地址不为空
            Dialog.alert({
              title: '定位失败',
              message: '检测到您未打开定位服务,已自动切换至 ' + userInfoLocation.value,
              confirmButtonText: '好的',
              confirmButtonColor: '#155BBB',
            }).then(() => {
              // on close
              addressObj.text = userInfoLocation.value;
              emit('update:address', addressObj.text);
            });
          }
        } else {
          //未打开定位权限
          if (userInfoLocation.value === '') {
            Dialog.alert({
              title: '定位失败',
              message:
                '抱歉未定位到您的所在地址,后期可以在“我的-编辑资料-所在地”完善信息',
              confirmButtonText: '不显示地址',
              confirmButtonColor: '#155BBB',
            }).then(() => {
              // on close
              addressObj.text = '';
              emit('update:address', addressObj.text);
            });
          } else {
            Dialog.alert({
              title: '定位失败',
              message: '抱歉未定位到您的所在地址,已自动切换至 ' + userInfoLocation.value,
              confirmButtonText: '好的',
              confirmButtonColor: '#155BBB',
            }).then(() => {
              // on close
              addressObj.text = userInfoLocation.value;
              // that.$emit("getAddress", that.address);
              emit('update:address', addressObj.text);
            });
          }
          emit('update:address', addressObj.text);
        }
      }
    }
    return {
      axiosAddress,
      ...toRefs(addressObj),
      reLocation,
    };
  },
  props: {
    propMid: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['uId']),
  },
};
</script>
<style lang="stylus" scoped>
#container
  display none
// .address
//   border-bottom 10px solid #e5e5e5
  &.fail
    :deep().van-field__control
      color #999
:deep().van-cell
  font-size 16px
:deep().van-field__label
  color #333
:deep().van-cell
  padding 10px 12px
</style>
