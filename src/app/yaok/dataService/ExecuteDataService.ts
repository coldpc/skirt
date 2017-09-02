/**
 *
 *  这是对于执行http请求的基类
 *  实现了ServiceConfigInterface接口，方便调用request
 *  data:
 *  覆盖父类setBody方法 控制数据的准确性质
 *
 */
import { BaseDataService } from './BaseDataService';

import {ServiceConfigInterface} from "./ServiceConfigInterface";

export class ExecuteDataService extends BaseDataService implements ServiceConfigInterface{
  url = '';
  data:any;
  params: any;

  execute(success: Function = null, failed: Function) :void{
    super.request(this, success, failed);
  }

  //设置提交body数据
  setBody(data: any): void {
    this.data = data;
  }

  // 拼接在url地址后面的参数
  setParams(data: any): void {
    this.params = data;
  }
}
