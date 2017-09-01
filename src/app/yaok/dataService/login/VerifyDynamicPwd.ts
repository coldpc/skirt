/**************************************** 验证手机号 *************************************/
import {ExecuteService} from "../ExecuteService";

export interface InVerifyDynamicPwd {
  dynamicPassword: string; // 验证码
  mobile: string; // 手机号
  internationalCode: string; // 区号
  token: string; // 验证码的token
}

export class VerifyDynamicPwd extends ExecuteService {
  public url = 'http://apptestv2.yaok.com/appapi/remoteConfig/getConfigs';
  public data: InVerifyDynamicPwd ;
}
