import { post } from '@/http';
interface Evaluate {
  uId: string;
  page: number;
  pagesize: number;
}
interface SubEvaluate {
  uId: string;
  star: number;
  content: string;
}
export function getEvaluate(params: Evaluate) {
  return post('Mobile/News/getComplaintLists', params);
}
export function submitEvaluate({ uId, star, content }: SubEvaluate) {
  return post('Mobile/News/submitComplaint', { uId, star, content });
}
