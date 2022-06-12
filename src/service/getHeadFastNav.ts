import { post } from '@/http';
export function getHeadFastNav() {
  return post('/Mobile/Switch/getQuickColumn');
}
