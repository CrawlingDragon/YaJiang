import { post } from '@/http';
interface Params {
  reason: string;//投诉原因,直接传对应文字,总共就固定那7个
  respondent: string;//投诉对象
  description: string;//投诉说明,最多300字
  images?: string;//凭证,传图片链接,多个用 ; 拼接,最多9张图
  mobile: string;//联系电话
}
export function getComplaint(params: Params) {
  return post('/Mobile/User/addComplaint', params);
}