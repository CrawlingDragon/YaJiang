import { post } from '@/http.ts';

export function getIndexAdList() {
  return post('/Mobile/Index/getAdlist');
}
