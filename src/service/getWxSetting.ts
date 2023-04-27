import Axios from 'axios';
export function getWxSetting() {
  return new Promise((resolve, reject) => {
    Axios.get(`${import.meta.env.VITE_APP_USER_CENTER_CODE_URL}/sso/wechat/signature`)
      .then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      )
      .catch((err) => reject(err));
  });
}
