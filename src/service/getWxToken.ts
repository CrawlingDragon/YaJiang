import Axios from 'axios';
export function getWxToken(code: string) {
  return new Promise((resolve, reject) => {
    Axios.post(`${import.meta.env.VITE_APP_API}/sso/token`, {
      client_id: 'thy',
      grant_type: 'wemini',
      code: code,
      scope: '',
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
