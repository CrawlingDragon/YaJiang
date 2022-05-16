import { post } from '@/http';

export function getIndexAdList() {
  return post('/Mobile/Index/getAdlist');
}
