import { post } from '@/http';
export function getDefaultSet() {
  return post('/Mobile/Switch/getDefaultSet');
}
