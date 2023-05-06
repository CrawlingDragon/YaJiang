// import { fetchPost, fetchGet } from "@/http";

// const ERR_OK = 0;

// export function useAxiosPost(url, params) {
//   fetchPost(url, params)
//     .then(res => {
//       let data = res.data;
//       if (data.code === ERR_OK) {
//         return Promise.resolve(data.data);
//       }
//     })
//     .catch(e => {
//       console.log("e", e);
//     });
// }

// export function useAxiosGet(url, params) {
//   fetchGet(url, params)
//     .then(res => {
//       let data = res.data;
//       if (data.code === ERR_OK) {
//         return Promise.resolve(data.data);
//       }
//     })
//     .catch(e => {
//       console.log("e", e);
//     });
// }

export { getIndexSettingMenu } from './getIndexSettingMenu';
export { getHeadFastNav } from './getHeadFastNav';
export { getDefaultSet } from './getDefaultSet';
export { getTrainList, getTrainInfo } from './getTrainList';
export { getHospitalFastNav } from './getHospitalFastNav';
export { getMeSetting } from './getMeSetting';
export { getAboutUs } from './getAboutUs';
export { getCollectMoney, getSetCollectMoney, getCollectMoneyDetail } from './getCollectMoney';
