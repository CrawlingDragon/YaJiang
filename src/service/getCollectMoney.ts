import { post } from '@/http';
//获取当前用户的收款码信息
export function getCollectMoney(uId?: string) {
  return post('Mobile/Payment/getReceiveCode', { uId });
}

// 设置当前用户的收款码信息
export function getSetCollectMoney(
  code_id: string,
  type_id: number,
  amount: number | string,
  weight: number | string,
  is_auto: string | number,
  uId?: string,
  is_reset?: string
) {
  return post('Mobile/Payment/setReceiveInfo', {
    code_id,
    type_id,
    amount,
    weight,
    is_auto,
    is_reset,
    uId,
  });
}

//重置金额
export function getRestCollectMoney(code_id: string, is_reset: string = '1') {
  return post('Mobile/Payment/setReceiveInfo', {
    code_id,
    type_id: '',
    amount: '',
    weight: '',
    is_auto: '',
    is_reset,
  });
}

// 获取收款明细
export function getCollectMoneyDetail(
  uId: string,
  start_date: string,
  end_date: string,
  p: number
) {
  return post('Mobile/Payment/getReceiveList', { uId, start_date, end_date, p });
}

// 获取支付信息
export function getBeforePayInfo(code: string | any) {
  return post('Mobile/Payment/scanReceiveCode', { code });
}
//点击支付后的获取到银行支付链接
export function getBankPayInfo(
  code_id: string,
  amount: number,
  type_id: number,
  weight: number | string,
  is_auto: number
) {
  return post('Mobile/Payment/doAbcPayment', {
    code_id,
    amount,
    type_id,
    weight,
    is_auto,
  });
}
