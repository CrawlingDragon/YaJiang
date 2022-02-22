import { geolocation } from "./baidu_locationAddress";
import { Dialog } from "vant";
import { computed } from "vue";
// import storage from "good-storage";
import { useStore } from "vuex";

// 全局定义的默认地址 浙江杭州
const defaultAddress = process.env.VUE_APP_DEFAULT_ADDRESS;

export async function inToHospitalLocal() {
  //进院的定位
  const store = useStore();
  const userInfo = computed(() => store.state.userInfoLocation);
  // console.log("userInfo.value", userInfo.value);
  let address = await geolocation();
  let axiosAddress = "";
  // console.log("定位返回", address);
  if (address === 6) {
    // 定位失败 ---- 权限未打开
    if (userInfo.value) {
      // 个人资料不为空
      Dialog.alert({
        title: "定位失败",
        message: `检测到你未打开定位服务，已使用位置${userInfo.value}`,
        confirmButtonText: "好的",
        confirmButtonColor: "#155BBB"
      });
      axiosAddress = userInfo.value;
    } else {
      // 个人资料为空
      Dialog.alert({
        title: "定位失败",
        message: `检测到你未打开定位服务，已使用默认位置${defaultAddress}`,
        confirmButtonText: "好的",
        confirmButtonColor: "#155BBB"
      });
      axiosAddress = defaultAddress;
    }
    store.commit("setAxiosAddress", axiosAddress);
  } else if (address === 99) {
    // 定位失败 ---- 权限已打开
    if (userInfo.value) {
      // 个人资料不为空
      Dialog.alert({
        title: "定位失败",
        message: `抱歉未定位到您的所在地,已使用位置${userInfo.value}`,
        confirmButtonText: "好的",
        confirmButtonColor: "#155BBB"
      });
      axiosAddress = userInfo;
    } else {
      // 个人资料为空
      Dialog.alert({
        title: "定位失败",
        message: `检测到你未打开定位服务，已使用默认位置${defaultAddress}`,
        confirmButtonText: "好的",
        confirmButtonColor: "#155BBB"
      });
      axiosAddress = defaultAddress;
    }
    store.commit("setAxiosAddress", axiosAddress);
  }
  // console.log("axiosAddress", axiosAddress);

  // resolve(axiosAddress);
  // });
}
