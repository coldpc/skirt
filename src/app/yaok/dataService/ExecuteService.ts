import { BaseDataService } from './BaseDataService';

import {ServiceConfigInterface} from "./ServiceConfigInterface";

export class ExecuteService extends BaseDataService implements ServiceConfigInterface {
  url = '';
  data: any;
  execute(success: Function = null, failed: Function) {
    this.request(this, success, failed);
  }
}
