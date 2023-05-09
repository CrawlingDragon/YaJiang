import { post } from '@/http';
//其数据step2_state 用于判断用户申请到了第几部
export function applyStatus(uId: string) {
  return post('Mobile/SellerAbc/getApplyInfo', { uId });
}

// 申请第一步，选择用户类型
export function applyOneStep(uId: string, apply_step: number, sub_mer_type: number, announce: number) {
  return post('Mobile/SellerAbc/submitApplyInfo', { uId, apply_step, sub_mer_type, announce });
}
