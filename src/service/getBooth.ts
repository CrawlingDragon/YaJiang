import { post } from '@/http';
export function getBoothDetail(standId: string) {
  return post('/Mobile/User/standDetail', { standId });
}
