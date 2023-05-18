import axios from 'axios';
import QS from 'qs';
import axiosRetry from 'axios-retry';
import { Toast } from 'vant';
import store from './store/index.js';
import { login } from './common/js/getToken.js';
import router from './router/index.js';
import storage from 'good-storage';

const ERR_OK = 0;

axiosRetry(axios, { retry: 5 });
axios.defaults.timeout = 8000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//配置接口地址
axios.defaults.baseURL = import.meta.env.VITE_APP_API + '/api_app/';

//post 传参序列化，（添加请求拦截器）
axios.interceptors.request.use(
  (config) => {
    //在发送请求之前做什么事

    if (
      config.url === '/Mobile/Wen/OssUploadFile' ||
      config.url === 'Mobile/SellerAbc/uploadImage'
    ) {
      return config;
    }
    if (config.method === 'post') {
      config.data = QS.stringify(config.data);
    }
    return config;
  },
  (error) => {
    //console.log('错误的传参')
    return Promise.reject(error);
  }
);

//返回判断状态（添加响应拦截器）
axios.interceptors.response.use(
  (res) => {
    //处理响应数据
    let needLogin = router.currentRoute.value.meta.needLogin;
    // console.log('res', res);
    if (res.data.code == 530 && needLogin) {
      // uId过期操作
      Toast('用户token过期,请重新登录');
      setTimeout(() => {
        store.dispatch('cleanUserInfo');
        login('clearToken');
      }, 400);
    }
    if (res.data.success) {
      return Promise.resolve(res);
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface ResponseType<P = {}> {
  code: number;
  msg: string;
  data: P;
}
//返回一个Promise（发送post请求）
export function fetchPost(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}

//返回一个Promise(发送get请求)
export function fetchGet(url: string, params: any) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then(
        (response) => {
          resolve(response);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((error) => {
        reject(error);
      });
  });
}

export function get(url: string, params?: any) {
  return axios
    .get(url, { params })
    .then((res) => {
      let serverData = res.data;
      if (serverData.code === ERR_OK) {
        return serverData.data;
      } else {
        return {
          code: serverData.code,
          message: serverData.message,
        };
      }
    })
    .catch((e) => {
      console.log('axios错误:', e);
    });
}

export function post(url: string, params?: any) {
  let uId = storage.session.get('uId');

  if (uId) {
    // 两个图片上传的接口不处理 params
    if (url == '/Mobile/Wen/OssUploadFile' || 'Mobile/SellerAbc/uploadImage') {
    } else {
      params = { ...params, uId };
    }
  }
  return axios
    .post(url, params)
    .then((res) => {
      let serverData = res.data;
      if (serverData.code === ERR_OK) {
        return serverData.data;
      } else {
        return {
          code: serverData.code,
          message: serverData.message,
        };
      }
    })
    .catch((e) => {
      console.log('axios错误:', e);
    });
}
export default {
  fetchPost,
  fetchGet,
  get,
  post,
};
