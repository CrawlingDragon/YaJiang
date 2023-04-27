import { createRouter, createWebHistory, RouteRecordRaw, RouterScrollBehavior } from 'vue-router';
import store from '../store';
import { getUrlQuery } from '../common/js/util';
import { fetchGetToken, login } from '../common/js/getToken';
import storage from 'good-storage';

declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    // isAdmin?: boolean;
    // 每个路由都必须声明
    meta?: {};
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index/index.vue'),
  },
  {
    path: '/login_wx',
    component: () => import('../views/login_wx/login_wx.vue'),
  },
  {
    path: '/index_online',
    name: 'indexOnline',
    meta: { savedPosition: 0 },
    component: () => import('../views/index_online/index_online.vue'),
    children: [
      {
        path: '/index_online/ask_choose_crop',
        component: () => import('../views/ask_choose_crop/ask_choose_crop.vue'),
      },
      {
        path: '/index_online/index_online_address',
        component: () => import('../views/index_online_address/index_online_address.vue'),
      },
    ],
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName:'login' */ '../views/login/login.vue'),
  // },
  {
    path: '/logout',
    component: () => import('../views/logout/logout.vue'),
  },
  // {
  //   path: '/m_login',
  //   name: 'mLogin',
  //   component: () =>
  //     import(/* webpackChunkName:'m_login' */ '../views/m_login/m_login.vue'),
  // },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/sign/sign.vue'),
  },
  {
    path: '/find_password',
    name: 'findPassword',
    component: () => import('../views/find_password/find_password.vue'),
  },
  {
    path: '/search_online',
    name: 'searchOnline',
    component: () => import('../views/search_online/search_online.vue'),
  },
  {
    path: '/searchOnlineCrop',
    name: 'searchOnlineCrop',
    component: () => import('../views/search_online_crop/search_online_crop.vue'),
  },
  {
    path: '/hospital',
    name: 'hospital',
    component: () => import('../views/hospital/hospital.vue'),
  },
  {
    path: '/into_hospital',
    name: 'intoHospital',
    component: () => import('../views/into_hospital/into_hospital.vue'),
  },
  {
    path: '/hospital_intro',
    name: 'hospitalIntro',
    component: () => import('../views/hospital_intro/hospital_intro.vue'),
  },
  {
    path: '/search_hospital',
    name: 'searchHospital',
    component: () => import('../views/search_hospital/search_hospital.vue'),
  },
  {
    path: '/hospital_expert',
    name: 'hospitalExpert',
    component: () => import('../views/hospital_expert/hospital_expert.vue'),
  },
  {
    path: '/hospital_online',
    name: 'hospitalOnline',
    component: () => import('../views/hospital_online/hospital_online.vue'),
  },
  {
    path: '/hospital_message',
    name: 'hospitalMessage',
    component: () => import('../views/hospital_message/hospital_message.vue'),
  },
  {
    path: '/ask',
    name: 'ask',
    meta: { needLogin: true },
    component: () => import('../views/ask/ask.vue'),
    children: [
      {
        path: '/ask/ask_choose_crop',
        component: () => import('../views/ask_choose_crop/ask_choose_crop.vue'),
      },
    ],
  },
  {
    path: '/ask_detail',
    name: 'askDetail',
    component: () => import('../views/ask_detail/ask_detail.vue'),
  },
  {
    path: '/base_fram_detail',
    component: () => import('../views/base_fram_detail/base_fram_detail.vue'),
  },
  {
    path: '/cetu_list',
    name: 'cetuList',
    meta: { needLogin: true },
    component: () => import('../views/cetu_list/cetu_list.vue'),
  },
  {
    path: '/soil_detail',
    name: 'soilDetail',
    component: () => import('../views/soil_detail/soil_detail.vue'),
  },
  {
    path: '/zuozhen_list',
    name: 'zuozhenList',
    meta: { needLogin: true },
    component: () => import('../views/zuozhen_list/zuozhen_list.vue'),
  },
  {
    path: '/zuozhen_detail',
    name: 'zuozhenDetail',
    component: () => import('../views/zuozhen_detail/zuozhen_detail.vue'),
  },
  {
    path: '/apply_vip',
    name: 'applyVip',
    meta: { needLogin: true },
    component: () => import('../views/apply_vip/apply_vip.vue'),
    children: [
      {
        path: '/apply_vip/ask_choose_crop',
        component: () => import('../views/ask_choose_crop/ask_choose_crop.vue'),
      },
    ],
  },
  {
    path: '/apply_vip_succeed',
    name: 'applyVipSucceed',
    component: () => import('../views/apply_vip_succeed/apply_vip_succeed.vue'),
  },
  {
    path: '/vip',
    name: 'vip',
    component: () => import('../views/vip/vip.vue'),
  },
  {
    path: '/choose_crop',
    name: 'chooseCrop',
    component: () => import('../views/choose_crop/choose_crop.vue'),
  },
  {
    path: '/good_base',
    name: 'goodBase',
    component: () => import('../views/good_base/good_base.vue'),
  },
  {
    path: '/base_detail',
    name: 'baseDetail',
    component: () => import('../views/base_detail/base_detail.vue'),
  },
  // {
  //   path: "/base_location",
  //   name: "baseLocation",
  //   component: () =>
  //     import(
  //       /*webpackChunkName:"base_location" */ "../views/base_location/base_location"
  //     )
  // },

  {
    path: '/message',
    name: 'message',
    component: () => import('../views/message/message.vue'),
  },
  {
    path: '/message_detail',
    name: 'messageDetail',
    component: () => import('../views/message_detail/message_detail.vue'),
  },
  {
    path: '/live',
    name: 'live',
    component: () => import('../views/live/live.vue'),
  },
  {
    path: '/live_detail/:tId',
    name: 'live_detail',
    component: () => import('../views/live_detail/live_detail.vue'),
  },
  {
    path: '/live_list',
    name: 'liveList',
    component: () => import('../views/live_list/live_list.vue'),
  },
  {
    path: '/expert',
    name: 'expert',
    component: () => import('../views/expert/expert.vue'),
  },
  {
    path: '/my_homePage',
    meta: { needLogin: true },
    component: () => import('../views/expert/expert.vue'),
  },

  {
    path: '/look_expert',
    name: 'lookExpert',
    component: () => import('../views/look_expert/look_expert.vue'),
  },
  {
    path: '/expert_registration',
    name: 'expertRegistration',
    meta: { needLogin: true },
    component: () => import('../views/expert_registration/expert_registration.vue'),
  },
  {
    path: '/expert_detail',
    name: 'expertDetail',
    component: () => import('../views/expert_detail/expert_detail.vue'),
  },
  {
    path: '/whole_base_list',
    name: 'wholeBaseList',
    component: () => import('../views/whole_base_list/whole_base_list.vue'),
  },
  {
    path: '/whole_zuozhen_list',
    name: 'wholeZuoZhenList',
    meta: { needLogin: true },
    component: () => import('../views/whole_zuozhen_list/whole_zuozhen_list.vue'),
  },
  {
    path: '/whole_cetu_list',
    name: 'wholeCeTuList',
    meta: { needLogin: true },
    component: () => import('../views/whole_cetu_list/whole_cetu_list.vue'),
  },
  {
    path: '/about_us',
    component: () => import('../views/about_us/about_us.vue'),
  },
  {
    path: '/me',
    name: 'me',
    meta: { needLogin: true },
    component: () => import('../views/me/me.vue'),
  },
  {
    path: '/me_edit',
    name: 'meEdit',
    meta: { needLogin: true },
    component: () => import('../views/me_edit/me_edit.vue'),
  },
  {
    path: '/me_hospital',
    name: 'meHospital',
    meta: { needLogin: true },
    component: () => import('../views/me_hospital/me_hospital.vue'),
  },
  {
    path: '/me_registration',
    name: 'meRegistration',
    meta: { needLogin: true },
    component: () => import('../views/me_registration/me_registration.vue'),
  },
  {
    path: '/me_answer',
    name: 'meAnswer',
    meta: { needLogin: true },
    component: () => import('../views/me_answer/me_answer.vue'),
  },
  {
    path: '/me_base',
    name: 'meBase',
    meta: { needLogin: true },
    component: () => import('../views/me_base/me_base.vue'),
  },
  {
    path: '/me_homePage',
    name: 'meHomePage',
    meta: { needLogin: true },
    component: () => import('../views/me_homePage/me_homePage.vue'),
  },
  {
    path: '/me_attention',
    name: 'meAttention',
    meta: { needLogin: true },
    component: () => import('../views/me_attention/me_attention.vue'),
  },
  {
    path: '/diseases',
    name: 'diseases',
    component: () => import('../views/diseases/diseases.vue'),
  },
  {
    path: '/diseases_detail',
    name: 'diseasesDetail',
    component: () => import('../views/diseases_detail/diseases_detail.vue'),
  },
  // {
  //   path: "/about_us",
  //   name: "aboutUs",
  //   component: () =>
  //     import(/*webpackChunkName:"about_us" */ "../views/about_us/about_us")
  // },
  {
    path: '/video_list',
    name: 'videoList',
    component: () => import('../views/video_list/video_list.vue'),
  },
  {
    path: '/invite_expert',
    component: () => import('../views/invite_expert/invite_expert.vue'),
  },
  {
    path: '/area',
    component: () => import('../views/area/area.vue'),
  },
  {
    path: '/video_detail',
    name: 'videoDetail',
    component: () => import('../views/video_detail/video_detail.vue'),
  },
  {
    path: '/cropRecord',
    name: 'cropRecord',
    component: () => import('../views/base_center/crop_record/crop_record.vue'),
  },

  {
    path: '/base_edit',
    component: () => import('../views/base_edit/base_edit.vue'),
  },
  {
    path: '/base_center',
    name: 'base_center',
    meta: { needLogin: true },
    component: () => import('../views/base_center/base_center.vue'),
    children: [
      {
        path: '',
        redirect: '/center',
      },
      {
        path: '/center',
        component: () => import('../views/base_center/center/center.vue'),
      },
      {
        path: '/baseInfoEdit',
        name: 'baseEdit',
        meta: { needLogin: true },
        component: () => import('../views/base_center/base_info_edit/base_info_edit.vue'),
        children: [
          {
            path: '/baseInfoEdit/ask_choose_crop',
            component: () => import('../views/ask_choose_crop/ask_choose_crop.vue'),
          },
        ],
      },
      {
        path: '/cropManagement',
        name: 'cropManagement',
        component: () => import('../views/base_center/crop_management/crop_management.vue'),
      },
      {
        path: '/cropRecord',
        name: 'cropRecord',
        component: () => import('../views/base_center/crop_record/crop_record.vue'),
      },
    ],
  },
  {
    path: '/solution',
    component: () => import('../views/solution/solution.vue'),
    children: [
      {
        path: '',
        redirect: '/takeCase',
      },
      {
        path: '/allCase',
        component: () => import('../views/solution/all_case/all_case.vue'),
      },
      {
        path: '/takeCase',
        component: () => import('../views/solution/take_case/take_case.vue'),
      },
    ],
  },
  {
    path: '/preview_list',
    meta: { needLogin: true },
    component: () => import('../views/preview_list/preview_list.vue'),
  },
  {
    path: '/preview',
    meta: { needLogin: true },
    component: () => import('../views/solution/preview/preview.vue'),
  },
  {
    path: '/evaluate',
    component: () => import('../views/evaluate/evaluate.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not_found',
    component: () => import('../views/not_found/not_found.vue'),
  },
  {
    path: '/pick_code',
    meta: { needLogin: true },
    component: () => import('../views/pick_code/pick_code.vue'),
  },
  {
    path: '/bank',
    component: () => import('../views/bank/bank.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.DEV ? '' : '/app/'),
  // history: createWebHistory('/app/'),
  routes: routes,
  scrollBehavior(to, from, savedPosition: any) {
    if (
      to.name === 'live' ||
      to.name === 'indexOnline' ||
      to.name === 'hospitalOnline' ||
      to.name === 'expert' ||
      to.name === 'askDetail' ||
      to.name === 'meAnswer'
    ) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach(async (to, from) => {
  if (to.name === from.name) return; //如果路由跳转是相同的，就取消
  //http://sso.nzsoso.com/sso_logout?redirect_url=http://localhost:8082/index&state=123
  // 接口返回500的时候，就是token/uId 过期的操作
  const urlParamsCode = getUrlQuery('code');
  const token = getUrlQuery('token');
  let uId = store.state.uId;

  //登录成功返回时，有code参数，用code请求token
  if (token) {
    store.commit('setuId', token);
  } else if (urlParamsCode && uId == '') {
    // 去请求token

    let r = await fetchGetToken(urlParamsCode);
  } else if (to.meta.needLogin && uId == '') {
    // meta.needLogin 判断页面是否需要登录，true则跳转到用户中心登录。且uId为空时
    // const url = window.location.origin + (import.meta.env.DEV ? '' : '/app') + to.path;
    const url = encodeURIComponent(
      window.location.origin +
        (import.meta.env.MODE === 'development' ? '' : '/app') +
        decodeURIComponent(to.fullPath)
    );
    // alert(
    //   window.location.origin + (import.meta.env.MODE === 'development' ? '' : '/app') + to.fullPath
    // );
    storage.set('redirect_uri', url);
    // 跳转到用户中心
    console.log('to', to);
    login('password', url, to?.name);
  }
});

export default router;
