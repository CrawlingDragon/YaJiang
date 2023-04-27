import { post } from '@/http';
export function getVip() {
  return post('/Mobile/Switch/getVipEquity');
}
