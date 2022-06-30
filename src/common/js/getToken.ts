// import { getUrlQuery } from './util';
import Router from '@/router';
// import Store from '../../store';
import Axios from 'axios';
// import QS from 'qs';
import store from '../../store';
import leansAxios from '@/http';
import storage from 'good-storage';
import { Toast } from 'vant';

export function loginOut() {
  //退出登录
  //判断url是否为需要登录的页面，是就改写成index
  let url = deleteUrlCode();
  if (Router.currentRoute.value.meta.needLogin) {
    url = window.location.origin + '/app';
  }
  // 清空uId
  store.commit('setUid', '');
  //退出登录的地址
  window.location.href = `${
    import.meta.env.VITE_APP_USER_CENTER_CODE_URL
  }sso_logout?redirect_url=${url}&state=123`;
}

//处理链接，删除其中的code参数，然后返回其他部分
export function deleteUrlCode() {
  const query = window.location.search.substring(1);
  const queryArr = query.split('&');
  let str = '';
  for (let i = 0; i < queryArr.length; i++) {
    const r = queryArr[i].split('=');
    if (r[0] == 'code') {
      continue;
    }
    str += '&' + r.join('=');
  }
  let arr = window.location.href.split('?');
  let result = arr[0] + '?' + str.substring(1);
  // result = encodeURIComponent(result);
  storage.set('redirect_uri', result);
  return result;
}

// 去登录函数
export function login(login_type = 'password', url = deleteUrlCode()) {
  //deleteUrlCode函数
  window.location.href = `${
    import.meta.env.VITE_APP_USER_CENTER_CODE_URL
  }authorize?login_type=${login_type}&response_type=code&client_id=thy&redirect_uri=${url}`;
}

export function fetchGetToken(code: string) {
  // 获取token
  const url = storage.get('redirect_uri');
  Axios.post(`${import.meta.env.VITE_APP_USER_CENTER_CODE_URL}token`, {
    client_id: 'thy',
    grant_type: 'authorization_code',
    code: code,
    scope: '',
    redirect_uri: url,
  })
    .then((res) => {
      // console.log('res', res);
      if (res.data.code === 500) {
        // 置空uid，和尝试退出登录
        store.commit('setuId', '');
        loginOut();
        Toast('获取token失败,请重新登录');
      } else if (res.status === 200) {
        // 保存uId
        store.commit('setuId', res.data.access_token);

        let token = res.data.access_token;
        // 请求接口，获取对应token的用户信息，并保存
        leansAxios
          .fetchPost('Mobile/User/userCenter', {
            uId: res.data.access_token,
          })
          .then((res: any) => {
            let data = res.data;
            if (data.code == 0) {
              store.dispatch('saveUserInfo', data.data);
            }
            // } else if (data.code == 201) {
            //   if (data.data.length == 0) {
            //     leansAxios
            //       .fetchPost('Mobile/User/userCenter', {
            //         uId: token,
            //       })
            //       .then((res: any) => {
            //         let data = res.data;
            //         if (data.code == 0) {
            //           store.dispatch('saveUserInfo', data.data);
            //         }
            //       });
            //   }
            // }
          });
      }
    })
    .catch((e) => console.log('e', e));
}
