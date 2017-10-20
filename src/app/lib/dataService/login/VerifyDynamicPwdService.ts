/**************************************** 验证手机号 *************************************/
import {ExecuteDataService} from "../ExecuteDataService";

export interface InVerifyDynamicPwdService {
    dynamicPassword: string; // 验证码
    mobile: string; // 手机号
    internationalCode: string; // 区号
    token: string; // 验证码的token
}

export class VerifyDynamicPwdService extends ExecuteDataService {
    readonly url = 'http://apptestv2.yaok.com/appapi/remoteConfig/getConfigs';

    setBody(data: InVerifyDynamicPwdService): void {
        super.setBody(data);
    }
}
