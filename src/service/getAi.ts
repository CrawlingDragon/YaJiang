import { post } from '@/http';
export function getAi() {
  return post('Mobile/Sysconfig/getAiExpert');
}
