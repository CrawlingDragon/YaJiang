// 暂时未使用
import { post } from '@/http';
interface Params {
  uId: string;
  location?: string;
}
export function getIndexData({ uId, location }: Params) {
  return post('/Mobile/Index/index', { uId, location });
}
