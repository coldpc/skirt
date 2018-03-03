/*************************** 修改绑定手机 **********************************/
import {ExecuteDataService} from "../ExecuteDataService";
import {EnRequestContentTypes} from "../../enum/EnRequestContentTypes";

export interface InUploadService {
    attachType: string;
    source: string;
    file: any;
}

export class UploadService extends ExecuteDataService {
    readonly url = '/attach/upload';
    readonly basePath = '/uploadapi';
    readonly contentType = EnRequestContentTypes.file;

    setBody(data: InUploadService): void {
        super.setBody(data);
    }
}
