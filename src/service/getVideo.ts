import { post } from '@/http';
interface Params {
  page: number;
  pagesize?: number;
}
export function getVideo({ page, pagesize = 10 }: Params) {
  return post('Mobile/Video/getVideoList', { page, pagesize });
}
