/*************************** 修改绑定手机 **********************************/
import {ServiceConfigInterface} from "../ServiceConfigInterface";
import {ExecuteService} from "../ExecuteService";

interface InUpload {
  oldDynamicPassword: string; // 上一次的验证码
  oldMobile: string; // 上一次的手机号
  oldInternationalCode: string; // 上一次的区号
  oldToken: string; // 上一次的token
  dynamicPassword: string; // 验证码
  mobile: string; // 手机号
  internationalCode: string; // 区号
  token: string; // token
}
export class Upload extends ExecuteService {
  public url = '/attach/upload';
  public basePath = '/uploadapi';
  public data: InUpload;
}
