/*************************** 修改绑定手机 **********************************/
import {ExecuteService} from "../ExecuteService";

interface InUpload {
  attachType: string;
  source: string;
  file: any;
}
export class Upload extends ExecuteService {
  public url = '/attach/upload';
  public basePath = '/uploadapi';
  public contentType = "file";
  public data: InUpload;
}
