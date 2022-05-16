import { post } from '@/http';
export function getInitMid() {
  return post('Mobile/Index/getMidInfo');
}
