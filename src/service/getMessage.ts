import { post } from '@/http';

interface Params {
  initMid: number;
  page: number;
}

export function getMessage({ initMid, page }: Params) {
  return post('/Mobile/News/index', { initMid, page });
}
