import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import { getUrlQuery } from '../common/js/util';
import { fetchGetToken, login } from '../common/js/getToken';
import storage from 'good-storage';
const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/*webpackChunkName:"index" */ '@/views/index/index'),
  },
  {
    path: '/index_online',
    name: 'indexOnline',
    component: () =>
      import(/*webpackChunkName:"index_online" */ '@/views/index_online/index_online'),
    children: [
      {
        path: '/index_online/ask_choose_crop',
        component: () =>
          import(
            /*webpackChunkName:"ask_choose_crop" */ '@/views/ask_choose_crop/ask_choose_crop'
          ),
      },
      {
        path: '/index_online/index_online_address',
        component: () =>
          import(
            /*webpackChunkName:"index_online_address" */ '@/views/index_online_address/index_online_address'
          ),
      },
    ],
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName:'login' */ '@/views/login/login.vue'),
  // },
  {
    path: '/logout',
    component: () => import(/* webpackChunkName:'logout' */ '@/views/logout/logout.vue'),
  },
  // {
  //   path: '/m_login',
  //   name: 'mLogin',
  //   component: () =>
  //     import(/* webpackChunkName:'m_login' */ '@/views/m_login/m_login.vue'),
  // },
  {
    path: '/sign',
    name: 'sign',
    component: () => import(/*webpackChunkName:"sign" */ '@/views/sign/sign'),
  },
  {
    path: '/find_password',
    name: 'findPassword',
    component: () =>
      import(/*webpackChunkName:"find_password" */ '@/views/find_password/find_password'),
  },
  {
    path: '/search_online',
    name: 'searchOnline',
    component: () =>
      import(/*webpackChunkName:"searchOnline" */ '@/views/search_online/search_online'),
  },
  {
    path: '/searchOnlineCrop',
    name: 'searchOnlineCrop',
    component: () =>
      import(
        /*webpackChunkName:"searchOnlineCrop" */ '@/views/search_online_crop/search_online_crop'
      ),
  },
  {
    path: '/hospital',
    name: 'hospital',
    component: () => import(/*webpackChunkName:"hospital" */ '@/views/hospital/hospital'),
  },
  {
    path: '/into_hospital',
    name: 'intoHospital',
    component: () =>
      import(/*webpackChunkName:"into_hospital" */ '@/views/into_hospital/into_hospital'),
  },
  {
    path: '/hospital_intro',
    name: 'hospitalIntro',
    component: () =>
      import(
        /*webpackChunkName:"hospital_intro" */ '@/views/hospital_intro/hospital_intro'
      ),
  },
  {
    path: '/search_hospital',
    name: 'searchHospital',
    component: () =>
      import(
        /*webpackChunkName:"search_hospital" */ '@/views/search_hospital/search_hospital'
      ),
  },
  {
    path: '/hospital_expert',
    name: 'hospitalExpert',
    component: () =>
      import(
        /*webpackChunkName:"hospital_expert" */ '@/views/hospital_expert/hospital_expert'
      ),
  },
  {
    path: '/hospital_online',
    name: 'hospitalOnline',
    component: () =>
      import(
        /*webpackChunkName:"hospital_online" */ '@/views/hospital_online/hospital_online'
      ),
  },
  {
    path: '/hospital_message',
    name: 'hospitalMessage',
    component: () =>
      import(
        /*webpackChunkName:"hospital_message" */ '@/views/hospital_message/hospital_message'
      ),
  },
  {
    path: '/ask',
    name: 'ask',
    meta: { needLogin: true },
    component: () => import(/*webpackChunkName:"ask" */ '@/views/ask/ask'),
    children: [
      {
        path: '/ask/ask_choose_crop',
        component: () =>
          import(
            /*webpackChunkName:"ask_choose_crop" */ '@/views/ask_choose_crop/ask_choose_crop'
          ),
      },
    ],
  },
  {
    path: '/ask_detail',
    name: 'askDetail',
    component: () =>
      import(/*webpackChunkName:"ask_detail" */ '@/views/ask_detail/ask_detail'),
  },
  {
    path: '/base_fram_detail',
    component: () =>
      import(
        /*webpackChunkName:"base_fram_detail" */ '@/views/base_fram_detail/base_fram_detail'
      ),
  },
  {
    path: '/cetu_list',
    name: 'cetuList',
    meta: { needLogin: true },
    component: () =>
      import(/*webpackChunkName:"cetu_list" */ '@/views/cetu_list/cetu_list'),
  },
  {
    path: '/soil_detail',
    name: 'soilDetail',
    component: () =>
      import(/*webpackChunkName:"soil_detail" */ '@/views/soil_detail/soil_detail'),
  },
  {
    path: '/zuozhen_list',
    name: 'zuozhenList',
    meta: { needLogin: true },
    component: () =>
      import(/*webpackChunkName:"zuozhen_list" */ '@/views/zuozhen_list/zuozhen_list'),
  },
  {
    path: '/zuozhen_detail',
    name: 'zuozhenDetail',
    component: () =>
      import(
        /*webpackChunkName:"zuozhen_detail" */ '@/views/zuozhen_detail/zuozhen_detail'
      ),
  },
  {
    path: '/apply_vip',
    name: 'applyVip',
    meta: { needLogin: true },
    component: () =>
      import(/*webpackChunkName:"apply_vip" */ '@/views/apply_vip/apply_vip'),
    children: [
      {
        path: '/apply_vip/ask_choose_crop',
        component: () =>
          import(
            /*webpackChunkName:"ask_choose_crop" */ '@/views/ask_choose_crop/ask_choose_crop'
          ),
      },
    ],
  },
  {
    path: '/apply_vip_succeed',
    name: 'applyVipSucceed',
    component: () =>
      import(
        /*webpackChunkName:"apply_vip_succeed" */ '@/views/apply_vip_succeed/apply_vip_succeed'
      ),
  },
  {
    path: '/vip',
    name: 'vip',
    component: () => import(/*webpackChunkName:"vip" */ '@/views/vip/vip'),
  },
  {
    path: '/choose_crop',
    name: 'chooseCrop',
    component: () =>
      import(/*webpackChunkName:"choose_crop" */ '@/views/choose_crop/choose_crop'),
  },
  {
    path: '/good_base',
    name: 'goodBase',
    component: () =>
      import(/*webpackChunkName:"good_base" */ '@/views/good_base/good_base'),
  },
  {
    path: '/base_detail',
    name: 'baseDetail',
    component: () =>
      import(/*webpackChunkName:"base_detail" */ '@/views/base_detail/base_detail'),
  },
  // {
  //   path: "/base_location",
  //   name: "baseLocation",
  //   component: () =>
  //     import(
  //       /*webpackChunkName:"base_location" */ "@/views/base_location/base_location"
  //     )
  // },

  {
    path: '/message',
    name: 'message',
    component: () => import(/*webpackChunkName:"message" */ '@/views/message/message'),
  },
  {
    path: '/message_detail',
    name: 'messageDetail',
    component: () =>
      import(
        /*webpackChunkName:"message_detail" */ '@/views/message_detail/message_detail'
      ),
  },
  {
    path: '/live',
    name: 'live',
    component: () => import(/*webpackChunkName:"live" */ '@/views/live/live'),
  },
  {
    path: '/live_list',
    name: 'liveList',
    component: () =>
      import(/*webpackChunkName:"liveList" */ '@/views/live_list/live_list'),
  },
  {
    path: '/expert',
    name: 'expert',
    component: () => import(/*webpackChunkName:"expert" */ '@/views/expert/expert'),
  },
  {
    path: '/my_homePage',
    meta: { needLogin: true },
    component: () => import(/*webpackChunkName:"expert" */ '@/views/expert/expert'),
  },
  {
    path: '/expert_crop',
    component: () =>
      import(/*webpackChunkName:"expert_crop" */ '@/views/expert_crop/expert_crop'),
  },
  {
    path: '/look_expert',
    name: 'lookExpert',
    component: () =>
      import(/*webpackChunkName:"look_expert" */ '@/views/look_expert/look_expert'),
  },
  {
    path: '/expert_registration',
    name: 'expertRegistration',
    meta: { needLogin: true },
    component: () =>
      import(
        /*webpackChunkName:"expert_registration" */ '@/views/expert_registration/expert_registration'
      ),
  },
  {
    path: '/expert_detail',
    name: 'expertDetail',
    component: () =>
      import(/*webpackChunkName:"expert_detail" */ '@/views/expert_detail/expert_detail'),
  },
  {
    path: '/whole_base_list',
    name: 'wholeBaseList',
    component: () =>
      import(
        /*webpackChunkName:"whole_base_list" */ '@/views/whole_base_list/whole_base_list'
      ),
  },
  {
    path: '/whole_zuozhen_list',
    name: 'wholeZuoZhenList',
    meta: { needLogin: true },
    component: () =>
      import(
        /*webpackChunkName:"whole_zuozhen_list" */ '@/views/whole_zuozhen_list/whole_zuozhen_list'
      ),
  },
  {
    path: '/whole_cetu_list',
    name: 'wholeCeTuList',
    meta: { needLogin: true },
    component: () =>
      import(
        /*webpackChunkName:"whole_cetu_list" */ '@/views/whole_cetu_list/whole_cetu_list'
      ),
  },
  {
    path: '/about_us',
    component: () =>
      import(/* webpackChunkName:"about_us" */ '@/views/about_us/about_us'),
  },
  {
    path: '/me',
    name: 'me',
    meta: { needLogin: true },
    component: () => import(/*webpackChunkName:"me" */ '@/views/me/me'),
  },
  {
    path: '/me_edit',
    name: 'meEdit',
    meta: { needLogin: true },
    component: () => import(/*webpackChunkName:"me_edit" */ '@/views/me_edit/me_edit'),
  },
  {
    path: '/me_hospital',
    name: 'meHospital',
    meta: { needLogin: true },
    component: () =>
      import(/*webpackChunkName:"me_hospital" */ '@/views/me_hospital/me_hospital'),
  },
  {
    path: '/me_registration',
    name: 'meRegistration',
    meta: { needLogin: true },
    component: () =>
      import(
        /*webpackChunkName:"me_registration" */ '@/views/me_registration/me_registration'
      ),
  },
  {
    path: '/me_answer',
    name: 'meAnswer',
    meta: { needLogin: true },
    component: () =>
      import(/*webpackChunkName:"me_answer" */ '@/views/me_answer/me_answer'),
  },
  {
    path: '/me_base',
    name: 'meBase',
    meta: { needLogin: true },
    component: () => import(/*webpackChunkName:"me_base" */ '@/views/me_base/me_base'),
  },
  {
    path: '/me_homePage',
    name: 'meHomePage',
    meta: { needLogin: true },
    component: () =>
      import(/*webpackChunkName:"me_homePage" */ '@/views/me_homePage/me_homePage'),
  },
  {
    path: '/me_attention',
    name: 'meAttention',
    meta: { needLogin: true },
    component: () =>
      import(/*webpackChunkName:"me_attention" */ '@/views/me_attention/me_attention'),
  },
  {
    path: '/diseases',
    name: 'diseases',
    component: () => import(/*webpackChunkName:"diseases" */ '@/views/diseases/diseases'),
  },
  {
    path: '/diseases_detail',
    name: 'diseasesDetail',
    component: () =>
      import(
        /*webpackChunkName:"diseases_detail" */ '@/views/diseases_detail/diseases_detail'
      ),
  },
  // {
  //   path: "/about_us",
  //   name: "aboutUs",
  //   component: () =>
  //     import(/*webpackChunkName:"about_us" */ "@/views/about_us/about_us")
  // },
  {
    path: '/video_list',
    name: 'videoList',
    component: () =>
      import(/*webpackChunkName:"video_list" */ '@/views/video_list/video_list'),
  },
  {
    path: '/invite_expert',
    component: () =>
      import(/*webpackChunkName:"invite_expert" */ '@/views/invite_expert/invite_expert'),
  },
  {
    path: '/area',
    component: () => import(/*webpackChunkName:"area" */ '@/views/area/area'),
  },
  {
    path: '/video_detail',
    name: 'videoDetail',
    component: () =>
      import(/*webpackChunkName:"video_detail" */ '@/views/video_detail/video_detail'),
  },
  {
    path: '/cropRecord',
    name: 'cropRecord',
    component: () =>
      import(
        /* webpackChunkName:"cropRecord" */ '@/views/base_center/crop_record/crop_record'
      ),
  },

  {
    path: '/base_edit',
    component: () =>
      import(/* webpackChunkName:"cropRecord" */ '@/views/base_edit/base_edit'),
  },
  {
    path: '/base_center',
    name: 'base_center',
    meta: { needLogin: true },
    component: () =>
      import(/*webpackChunkName:"base_center" */ '@/views/base_center/base_center'),
    children: [
      {
        path: '',
        redirect: '/center',
      },
      {
        path: '/center',
        component: () =>
          import(/* webpackChunkName:"center" */ '@/views/base_center/center/center'),
      },
      {
        path: '/baseInfoEdit',
        name: 'baseEdit',
        meta: { needLogin: true },
        component: () =>
          import(
            /* webpackChunkName:"baseEdit" */ '@/views/base_center/base_info_edit/base_info_edit'
          ),
        children: [
          {
            path: '/baseInfoEdit/ask_choose_crop',
            component: () =>
              import(
                /* webpackChunkName:"ask_choose_crop" */ '@/views/ask_choose_crop/ask_choose_crop'
              ),
          },
        ],
      },
      {
        path: '/cropManagement',
        name: 'cropManagement',
        component: () =>
          import(
            /* webpackChunkName:"cropManagement" */ '@/views/base_center/crop_management/crop_management'
          ),
      },
      {
        path: '/cropRecord',
        name: 'cropRecord',
        component: () =>
          import(
            /* webpackChunkName:"cropRecord" */ '@/views/base_center/crop_record/crop_record'
          ),
      },
    ],
  },
  {
    path: '/solution',
    component: () => import('@/views/solution/solution.vue'),
    children: [
      {
        path: '',
        redirect: '/takeCase',
      },
      {
        path: '/allCase',
        component: () => import('@/views/solution/all_case/all_case.vue'),
      },
      {
        path: '/takeCase',
        component: () => import('@/views/solution/take_case/take_case.vue'),
      },
    ],
  },
  {
    path: '/preview',
    component: () => import('@/views/solution/preview/preview.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not_found',
    component: () =>
      import(/* webpackChunkName:"not-found" */ '@/views/not_found/not_found'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

router.beforeEach(async (to) => {
  //http://sso.nzsoso.com/sso_logout?redirect_url=http://localhost:8082/index&state=123
  // 接口返回500的时候，就是token/uId 过期的操作

  const urlParamsCode = getUrlQuery('code');
  let uId = store.state.uId;
  //登录成功返回时，有code参数，用code请求token
  if (urlParamsCode && uId == '') {
    // 去请求token
    await fetchGetToken(urlParamsCode);
  } else if (to.meta.needLogin && uId == '') {
    // meta.needLogin 判断页面是否需要登录，true则跳转到用户中心登录
    const url = window.location.origin + to.path;
    storage.set('redirect_uri', url);
    login(url);
  }
});

export default router;
