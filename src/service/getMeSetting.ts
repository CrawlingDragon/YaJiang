import { post } from '@/http';
export function getMeSetting() {
  return post('/Mobile/Switch/getMyOutsideModules');
}
