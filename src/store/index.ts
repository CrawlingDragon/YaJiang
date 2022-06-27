import storage from 'good-storage';
import { useStorage } from '@vueuse/core';
import { createStore } from 'vuex';
import { saveUserInfo as saveUserInfoFn, saveUid } from '../common/js/saveUserInfo';
import Cookies from 'js-cookie';
import saveLatelyAddress from '@/common/js/latelyAddress';

interface GlobalState {
  uId: string; // 从缓存中获取uId
  userInfo: {};
  // uid: window.localStorage.getItem("uid") || undefined, //登录用户uid
  mid: string | null; //医院mid
  joinTime: string | null; //用户加入医院的时间
  hospitalName: string | null; //医院名字
  hospitalIsStore: string | null; //医院
  isMember: string | null; //是否是会员
  userName: string | null; //用户名字
  userAvatar: string | null; //用户头像
  hospitalIsMember: string | null; //是否是医院会员
  hospitalLogo: string | null; //医院主页logo
  // aiExpertId: string | null; //ai 智能专家id
  ucuid?: string | null; //农资店铺 ucuid
  logined?: string | null | undefined;
  axiosAddress: string; // 用于接口请求的地址参数
  userInfoLocation: string;
  geoAddress: string;
  latelyAddressArray: string[];
  settingMenu: {
    h5title: string;
    topMenu: any[];
    bottomMenu: any[];
    bottomContent: any;
    menuName: {};
  };
  defaultSet: {
    initMid: number;
    aiExpertId: number;
    defaultCrop: { name: string; num: string };
    region: {};
  }; //默认配置
  hospitalSettingNav: { name: string; state: number; label: string }[];

  old: boolean; //是否是适老版
}
const app = createStore<GlobalState>({
  state: {
    uId: storage.get('uId', ''), // 从缓存中获取uId
    userInfo: storage.get('userInfo', {}),
    mid: window.localStorage.getItem('mid'), //医院mid
    joinTime: window.localStorage.getItem('joinTime'), //用户加入医院的时间
    hospitalName: window.localStorage.getItem('hospitalName'), //医院名字
    hospitalIsStore: window.localStorage.getItem('hospitalIsStore'), //医院
    isMember: window.localStorage.getItem('isMember'), //是否是会员
    userName: window.localStorage.getItem('userName'), //用户名字
    userAvatar: window.localStorage.getItem('userAvatar'), //用户头像
    hospitalIsMember: window.localStorage.getItem('hospitalIsMember'), //是否是医院会员
    hospitalLogo: window.localStorage.getItem('hospitalLogo'), //医院主页logo
    ucuid: window.localStorage.getItem('ucuid'), //农资店铺 ucuid
    logined: window.localStorage.getItem('logined'),
    axiosAddress: storage.get('axiosAddress', ''), // 用于接口请求的地址参数
    userInfoLocation: storage.get('userInfoLocation', ''),
    geoAddress: storage.get('geoAddress', ''), // 用于保存定位产生的地址
    latelyAddressArray: storage.get('latelyAddressArray', []),
    old: false, //是否是适老版
    settingMenu: {
      // 首页配置和脚部配置
      h5title: '', // 首页的title
      topMenu: [], // 首页的快速导航
      bottomMenu: [], // 首页的底部配置
      bottomContent: {}, // 整站的脚部配置
      menuName: {}, //默认menu 名称
    },
    // initMid: storage.get('initMid', 0), //顶级医院mid 63580    56915
    // aiExpertId: window.localStorage.getItem('aiExpertId'), //ai 智能专家id
    defaultSet: {
      initMid: 0, // 全局医院的initMid
      aiExpertId: 0, // ai的专家id
      defaultCrop: {
        // 默认作物的名字和id
        num: '0',
        name: '',
      },
      region: {},
    },
    hospitalSettingNav: [{ name: '', state: 0, label: '' }], // 医院快速导航和医院首页的导航配置项
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
    getterIndexMenu(state) {
      // 首页的快速导航和底部文案的 getter
      return {
        topMenu: state.settingMenu.topMenu,
        bottomContent: state.settingMenu.bottomContent,
      };
    },
    getterGlobalTitle(state) {
      // 首页和全局默认的title de getter
      return state.settingMenu.h5title;
    },
    getterFooterMenu(state) {
      // 底部bar配置的 getter
      return state.settingMenu.bottomMenu;
    },
    initMid(state) {
      //默认的全局医院mid
      return state.defaultSet.initMid;
    },
    aiExpertId(state) {
      // ai的id
      return state.defaultSet.aiExpertId;
    },
    getterDefaultCrop(state) {
      // 默认作物
      return state.defaultSet.defaultCrop;
    },
    getDefaultMenuName(state) {
      //默认menu名字，比如协会，医院，问答还是网诊
      return state.settingMenu.menuName;
    },
    getterDefaultRegion(state) {
      //默认地区，用于申请会员的默认地区选择
      return state.defaultSet.region;
    },
  },
  mutations: {
    setHospitalSettingNav(state, data) {
      state.hospitalSettingNav = data;
    },
    setSettingMenu(state, data) {
      // 设置首页的配置项
      state.settingMenu = data;
    },
    setDefaultSetting(state, setting) {
      // 设置默认配置，默认的总院mid，ai的id，默认作物的名称和id
      const { aiExpert, defalutCrop, defalutCropName, mid, region } = setting;
      let obj = {
        initMid: mid,
        aiExpertId: aiExpert,
        defaultCrop: {
          num: defalutCrop,
          name: defalutCropName,
        },
        region,
      };
      state.defaultSet = obj;
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
    // setAiExpertId(state, aiExpertId) {
    //   state.aiExpertId = aiExpertId;
    //   window.localStorage.setItem('aiExpertId', aiExpertId);
    // },
    setUcUid(state, ucuid) {
      state.ucuid = ucuid;
      window.localStorage.setItem('ucuid', ucuid);
    },
    setLogined(state, logined) {
      state.logined = logined;
      window.localStorage.setItem('logined', logined);
    },
    setHospitalLogo(state, hospitalLogo) {
      state.hospitalLogo = hospitalLogo;
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
});
export default app;
