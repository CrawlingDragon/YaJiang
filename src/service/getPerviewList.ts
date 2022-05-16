import { post } from '@/http';
interface Params {
  uId: string;
  mId: string;
  page?: number;
  pagesize?: number;
}
export function getPerviewList({ uId, mId, page = 1, pagesize = 10 }: Params) {
  return post('/Mobile/Gbase/getProjectlistNew', { uId, mId, page, pagesize });
}
