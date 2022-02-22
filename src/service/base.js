import { fetchPost, fetchGet } from "@/http";

const ERR_OK = 0;

export function useAxiosPost(url, params) {
  fetchPost(url, params)
    .then(res => {
      let data = res.data;
      if (data.code === ERR_OK) {
        return Promise.resolve(data.data);
      }
    })
    .catch(e => {
      console.log("e", e);
    });
}

export function useAxiosGet(url, params) {
  fetchGet(url, params)
    .then(res => {
      let data = res.data;
      if (data.code === ERR_OK) {
        return Promise.resolve(data.data);
      }
    })
    .catch(e => {
      console.log("e", e);
    });
}
