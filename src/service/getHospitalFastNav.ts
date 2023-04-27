import { post } from '@/http';
export function getHospitalFastNav() {
  return post('/Mobile/Switch/getSwitchLists');
}
