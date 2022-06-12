import { post } from '@/http';
export function getIndexSettingMenu() {
  return post('/Mobile/Switch/getIndexMenu');
}
