/*************************** 修改绑定手机 **********************************/
import {BaseService} from "../BaseDataService";

interface InModifyMobile {
  oldDynamicPassword: string; // 上一次的验证码
  oldMobile: string; // 上一次的手机号
  oldInternationalCode: string; // 上一次的区号
  oldToken: string; // 上一次的token
  dynamicPassword: string; // 验证码
  mobile: string; // 手机号
  internationalCode: string; // 区号
  token: string; // token
}
export class ModifyMobile extends BaseService {
  public url = '/login/modifyMobile';
  public data: InModifyMobile = {
    oldDynamicPassword: 'oldDynamicPassword', // 上一次的验证码
    oldMobile: 'oldMobile', // 上一次的手机号
    oldInternationalCode: 'oldInternationalCode', // 上一次的区号
    oldToken: 'oldToken', // 上一次的token
    dynamicPassword: 'dynamicPassword', // 验证码
    mobile: 'mobile', // 手机号
    internationalCode: 'internationalCode', // 区号
    token: 'internationalCode' // token
  };
}
