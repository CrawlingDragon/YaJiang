import { post } from '@/http';
export function getAboutUs() {
  return post('/Mobile/Mpublic/getAboutUs');
}
