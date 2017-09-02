/*************************** 修改绑定手机 **********************************/
import {ExecuteDataService} from "../ExecuteDataService";
import {EnRequestContentTypes} from "../../enum/EnRequestContentTypes";
import {HttpClient} from '@angular/common/http';

interface InUploadService {
  attachType: string;
  source: string;
  file: any;
}

const url = '/attach/upload';
const basePath = '/uploadapi';
const contentType = EnRequestContentTypes.file;
export class UploadService extends ExecuteDataService {
  readonly url = '/attach/upload';
  readonly basePath = '/uploadapi';
  readonly contentType = EnRequestContentTypes.file;

  setBody(data: InUploadService): void{
    super.setBody(data);
  }
}
