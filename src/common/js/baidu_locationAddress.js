// import BMapGL from 'BMapGL';
import storage from 'good-storage';
import { useStore } from 'vuex';
import { computed } from 'vue';

export function geolocation() {
  // 浏览器精确定位
  // console.log("store", store);
  return new Promise((resolve) => {
    // console.log("已经定位", axiosAddressComputed.value);
    const store = useStore();
    const axiosAddressComputed = computed(() => store.state.axiosAddress);

    if (axiosAddressComputed.value !== '' && axiosAddressComputed.value !== undefined) {
      // 如果已经定位过了，直接返回定位的地址
      // console.log("已经定位", axiosAddressComputed.value);
      resolve(axiosAddressComputed.value);
      return;
    }
    var geolocation = new BMapGL.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      console.log('this.getStatus()', this.getStatus());
      if (this.getStatus() == 0) {
        let axiosAddress =
          r.address.province +
          ',' +
          r.address.city +
          (r.address.district ? ',' + r.address.district : '');
        // good-storage 保存地址
        // 1.保存 接口使用的地址
        // console.log("address", address);
        // 保存接口请求的地址
        // console.log("返回地址", axiosAddress);
        store.commit('setAxiosAddress', axiosAddress);
        store.commit('setGeoAddress', axiosAddress);
        //保存定位的地址
        resolve(axiosAddress);
      } else {
        // 定位失败，去到下一步，判断个人资料
        store.commit('setGeoAddress', '定位失败');
        if (this.getStatus() === 6) {
          // this.getStatus == 6 表示权限未打开
          resolve(6);
        } else {
          resolve(99);
        }
      }
    });
  });
}

export function getCityAddress() {
  // ip定位，获取市
  return new Promise((resolve) => {
    function myFun(result) {
      var cityName = result.name;
      resolve(cityName);
    }
    var myCity = new BMapGL.LocalCity();
    myCity.get(myFun);
  });
}

export function geo() {
  const store = useStore();
  function geolocationAgain() {
    // 浏览器精确定位
    // console.log("store", store);
    return new Promise((resolve) => {
      // console.log("已经定位", axiosAddressComputed.value);
      var geolocation = new BMapGL.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        console.log('this.getStatus()', this.getStatus());
        if (this.getStatus() == 0) {
          let axiosAddress =
            r.address.province +
            ',' +
            r.address.city +
            (r.address.district ? ',' + r.address.district : '');
          // good-storage 保存地址
          // 1.保存 接口使用的地址
          // console.log("address", address);
          // 保存接口请求的地址
          // console.log("返回地址", axiosAddress);
          // store.commit("setAxiosAddress", axiosAddress);
          store.commit('setGeoAddress', axiosAddress);
          //保存定位的地址
          resolve(axiosAddress);
        } else {
          // 定位失败，去到下一步，判断个人资料
          store.commit('setGeoAddress', '定位失败');
          if (this.getStatus() === 6) {
            // this.getStatus == 6 表示权限未打开
            resolve(6);
          } else {
            resolve(99);
          }
        }
      });
    });
  }
  return {
    geolocationAgain,
  };
}

export function askGeo() {
  //
  function askGeolocationAgain() {
    // 浏览器精确定位
    return new Promise((resolve) => {
      // console.log("已经定位", axiosAddressComputed.value);
      var geolocation = new BMapGL.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        // console.log("this.getStatus()", this.getStatus());
        if (this.getStatus() == 0) {
          let axiosAddress =
            r.address.province +
            ',' +
            r.address.city +
            (r.address.district ? ',' + r.address.district : '');
          // good-storage 保存地址
          // 1.保存 接口使用的地址
          // console.log("address", address);
          // 保存接口请求的地址
          // console.log("返回地址", axiosAddress);
          // store.commit("setAxiosAddress", axiosAddress);
          // store.commit("setGeoAddress", axiosAddress);
          //保存定位的地址
          resolve(axiosAddress);
        } else {
          // 定位失败，去到下一步，判断个人资料
          // store.commit("setGeoAddress", "定位失败");
          if (this.getStatus() === 6) {
            // this.getStatus == 6 表示权限未打开
            resolve(6);
          } else {
            resolve(99);
          }
        }
      });
    });
  }
  return {
    askGeolocationAgain,
  };
}
