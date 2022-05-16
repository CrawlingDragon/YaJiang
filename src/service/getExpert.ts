import { post } from '@/http';
interface Params {
  mid: number;
  pagesize?: number;
  page: number;
  isall?: string;
}
export function getExport({ mid, page, pagesize = 10, isall = 'all' }: Params) {
  return post('Mobile/User/expertList', { mid, pagesize, page, isall });
}
