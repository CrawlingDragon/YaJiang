import { post } from '@/http';
// 培训视频列表
export function getTrainList(mid: string, page: number, pagesize: number = 10) {
  return post('/Mobile/Live/getTrainLists', { mid, page, pagesize });
}

// 培训视频详情
export function getTrainInfo(tId: string) {
  return post('Mobile/Live/getTrainInfo', { tId });
}
