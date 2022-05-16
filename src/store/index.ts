import storage from 'good-storage';
import { useStorage } from '@vueuse/core';
import { createStore } from 'vuex';
import { saveUserInfo as saveUserInfoFn, saveUid } from '../common/js/saveUserInfo.js';
import Cookies from 'js-cookie';
import saveLatelyAddress from '@/common/js/latelyAddress.js';

interface GlobalState {
  uId: string; // 从缓存中获取uId
  userInfo: {};
  // uid: window.localStorage.getItem("uid") || undefined, //登录用户uid
  initMid: number; //顶级医院mid 63580    56915
  mid: string | null; //医院mid
  joinTime: string | null; //用户加入医院的时间
  hospitalName: string | null; //医院名字
  hospitalIsStore: string | null; //医院
  isMember: string | null; //是否是会员
  userName: string | null; //用户名字
  userAvatar: string | null; //用户头像
  hospitalIsMember: string | null; //是否是医院会员
  hospitalLogo: string | null; //医院主页logo
  aiExpertId: string | null; //ai 智能专家id
  ucuid?: string | null; //农资店铺 ucuid
  logined?: string | null | undefined;
  axiosAddress: string; // 用于接口请求的地址参数
  userInfoLocation: string;
  geoAddress: string;
  latelyAddressArray: string[];
  old: boolean; //是否是适老版
}
const app = createStore<GlobalState>({
  state: {
    uId: storage.get('uId', ''), // 从缓存中获取uId
    userInfo: storage.get('userInfo', {}),
    // uid: window.localStorage.getItem("uid") || undefined, //登录用户uid
    initMid: storage.get('initMid', 0), //顶级医院mid 63580    56915
    mid: window.localStorage.getItem('mid'), //医院mid
    joinTime: window.localStorage.getItem('joinTime'), //用户加入医院的时间
    hospitalName: window.localStorage.getItem('hospitalName'), //医院名字
    hospitalIsStore: window.localStorage.getItem('hospitalIsStore'), //医院
    isMember: window.localStorage.getItem('isMember'), //是否是会员
    userName: window.localStorage.getItem('userName'), //用户名字
    userAvatar: window.localStorage.getItem('userAvatar'), //用户头像
    hospitalIsMember: window.localStorage.getItem('hospitalIsMember'), //是否是医院会员
    hospitalLogo: window.localStorage.getItem('hospitalLogo'), //医院主页logo
    aiExpertId: window.localStorage.getItem('aiExpertId'), //ai 智能专家id
    ucuid: window.localStorage.getItem('ucuid'), //农资店铺 ucuid
    logined: window.localStorage.getItem('logined'),
    axiosAddress: storage.get('axiosAddress', ''), // 用于接口请求的地址参数
    userInfoLocation: storage.get('userInfoLocation', ''),
    geoAddress: storage.get('geoAddress', ''), // 用于保存定位产生的地址
    latelyAddressArray: storage.get('latelyAddressArray', []),
    old: false, //是否是适老版
  },
  getters: {
    viewAddress: (state) => {
      if (state.axiosAddress === undefined) {
        return;
      }
      let address = state.axiosAddress.split(',');
      return address[address.length - 1];
    },
    viewSecondAddress: (state) => {
      if (state.axiosAddress === undefined) {
        return;
      }
      let address = state.axiosAddress.split(',');
      return address[1];
    },
    geoViewAddress(state) {
      if (state.geoAddress == '定位失败') {
        return '定位失败';
      } else if (state.geoAddress == '定位中...') {
        return '定位中...';
      } else {
        let address = state.geoAddress.split(',');
        return address[address.length - 1];
      }
    },
  },
  mutations: {
    setInitMid(state, initMid) {
      state.initMid = initMid;
      storage.set('initMid', initMid);
    },
    switchOld(state, boolean) {
      // 切换适老板的函数
      state.old = boolean;
    },
    setLatelyAddressArray(state, data) {
      let arr = saveLatelyAddress('latelyAddressArray', data);
      state.latelyAddressArray = arr;
      storage.set('latelyAddressArray', arr);
    },
    setGeoAddress(state, data) {
      state.geoAddress = data;
      storage.set('geoAddress', data);
    },
    setUserInfoLocation(state, data) {
      state.userInfoLocation = data;
      storage.set('userInfoLocation', data);
    },
    setAxiosAddress(state, data) {
      state.axiosAddress = data;
      storage.set('axiosAddress', data);
    },
    setUserInfo(state, data) {
      state.userInfo = data;
      storage.set('userInfo', data);
    },
    setuId(state, data) {
      state.uId = data;
      storage.set('uId', data);
    },
    setMid(state, mid) {
      state.mid = mid;
      window.localStorage.setItem('mid', mid);
    },
    clearMid() {
      window.localStorage.clearItem('mid');
    },
    setJoinTime(state, joinTime) {
      state.joinTime = joinTime;
      window.localStorage.setItem('joinTime', joinTime);
    },
    setHospitalName(state, hospitalName) {
      state.hospitalName = hospitalName;
      window.localStorage.setItem('hospitalName', hospitalName);
    },
    setHospitalIsStore(state, hospitalIsStore) {
      state.hospitalIsStore = hospitalIsStore;
      window.localStorage.setItem('hospitalIsStore', hospitalIsStore);
    },
    setIsMember(state, isMember) {
      state.isMember = isMember;
      window.localStorage.setItem('isMember', isMember);
    },
    setUserName(state, userName) {
      state.userName = userName;
      window.localStorage.setItem('userName', userName);
    },
    setUserAvatar(state, userAvatar) {
      state.userAvatar = userAvatar;
      window.localStorage.setItem('userAvatar', userAvatar);
    },
    setHospitalIsMember(state, hospitalIsMember) {
      state.hospitalIsMember = hospitalIsMember;
      window.localStorage.setItem('hospitalIsMember', hospitalIsMember);
    },
    setAiExpertId(state, aiExpertId) {
      state.aiExpertId = aiExpertId;
      window.localStorage.setItem('aiExpertId', aiExpertId);
    },
    setUcUid(state, ucuid) {
      state.ucuid = ucuid;
      window.localStorage.setItem('ucuid', ucuid);
    },
    setLogined(state, logined) {
      state.logined = logined;
      window.localStorage.setItem('logined', logined);
    },
    setHospitalLogo(state, hospitalLogo) {
      window.localStorage.setItem('hospitalLogo', hospitalLogo);
    },
    setOld(state, old) {
      // 设置 判断是否是适老版的属性
      state.old = old;
    },
  },
  actions: {
    saveUserInfo({ commit, state }, data) {
      //保存uId和用户信息的action
      // let uId = saveUid(data);
      let userInfo = saveUserInfoFn(data);
      Cookies.set('uId', state.uId, { domain: '.114nz.com', path: '' });
      commit('setUserInfoLocation', userInfo.location);
      commit('setUserInfo', userInfo);
    },
    cleanUserInfo({ commit }) {
      //清除uId和用户信息的action
      let uId = saveUid({ uid: '' });
      // let userInfo = saveUserInfoFn({});
      Cookies.remove('uId', { domain: '.114nz.com', path: '' });
      // commit("setUserInfoLocation", "");
      commit('setuId', uId);
      commit('setUserInfo', {});
    },
  },
  modules: {},
});
export default app;
