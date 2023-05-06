import { post } from '@/http';
export function getCollectMoney(uId: string) {
  return post('Mobile/Payment/getReceiveCode', { uId });
}

export function getSetCollectMoney(
  uId: string,
  code_id: string,
  type_id: string,
  amount: number,
  weight: number | string
) {
  return post('Mobile/Payment/setReceiveInfo', { uId, code_id, type_id, amount, weight });
}

export function getCollectMoneyDetail(
  uId: string,
  start_date: string,
  end_date: string,
  p: number
) {
  return post('Mobile/Payment/getReceiveList', { uId, start_date, end_date, p });
}
