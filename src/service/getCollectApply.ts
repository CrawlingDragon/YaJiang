import { post } from '@/http';
//其数据step2_state 用于判断用户申请到了第几部
export function applyStatus(uId: string) {
  return post('Mobile/SellerAbc/getApplyInfo', { uId });
}

// 申请时，图片上传
export function uploadImg(formData: any) {
  return post('Mobile/SellerAbc/uploadImage', formData);
}
// export function uploadImg(obj: any) {
//   console.log('obj', obj);
//   return post('Mobile/SellerAbc/uploadImage', { obj });
// }
// 申请第一步，选择用户类型
export function applyOneStep(
  uId: string,
  apply_step: number,
  sub_mer_type: number,
  announce: number
) {
  return post('Mobile/SellerAbc/submitApplyInfo', { uId, apply_step, sub_mer_type, announce });
}

interface ApplyTwoStepParams {
  uId: string;
  apply_step: number;
  sub_mer_name: string;
  company_cert_no: string;
  company_cert_img: string;
  contact_name: string;
  certificate_no: string;
  idcard_front: string;
  idcard_back: string;
  region: string;
  address: string;
  certificate_beg_date: string;
  fr_cert_end_date: string;
}
//申请第二步，填写商户资料
export function applyTwoStep(params: ApplyTwoStepParams) {
  return post('Mobile/SellerAbc/submitApplyInfo', params);
}

//申请第三步，填写银行信息
export function applyThreeStep(
  uId: string,
  apply_step: number,
  account_type: number | string,
  account: string,
  mobile_phone: number,
  extend_imgs: string
) {
  return post('Mobile/SellerAbc/submitApplyInfo', {
    uId,
    apply_step,
    account_type,
    account,
    mobile_phone,
    extend_imgs,
  });
}

// 申请第四步，账户验证
export function applyFourStep(uId: string, apply_step: number, type: number, p: string) {
  //如果用户类型 type是1，就选用verification_code ，否则就是random_amount
  let params =
    type == 1 ? { uId, apply_step, verification_code: p } : { uId, apply_step, random_amount: p };
  return post('Mobile/SellerAbc/submitApplyInfo', params);
}
