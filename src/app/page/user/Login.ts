import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import { NgForm } from '@angular/forms';
import {BaseDataService} from "../../lib/dataService/BaseDataService";

import { Store } from '@ngrx/store';
// import { INCREMENT, DECREMENT, RESET } from '../../store/User/UserInfoStore';
import {Observable} from "rxjs/Observable";
import {VerifyDynamicPwdService} from "../../lib/dataService/login/VerifyDynamicPwdService";

declare var window: any;
interface AppState {
  counter: number;
}

interface Hero {
  name: string;
}

@Component ({
  selector: 'app-root',
  templateUrl: './Login.html'
})

export class LoginComponent {
  title = 'app';
  test: string;
  username: string;
  hero: Hero = {
    name: 'pcd'
  };

  counter: Observable<number>;

  constructor(private store: Store<AppState>, private translate: TranslateService, private httpService: BaseDataService, private baseService: VerifyDynamicPwdService) {
    window.store2 = store;
    window.translate2 = translate;
    window.VerifyDynamicPwdService2 = baseService;
    this.counter = store.select('UserInfo');
    // 设置默认的语言包
    this.translate.setDefaultLang('zh_CN');
    // 切换语言包
    this.translate.use('zh_CN');

    // 显示消息
    // this.translate.get('HELLO', {value: 'world'}).subscribe((res: string) => {
    //   console.log(res);
    //   this.hello = res;
    // });

    this.httpService.request({
      url: 'http://apptestv2.yaok.com/appapi/remoteConfig/getConfigs',
      params: {v: 1},
      data: {a: 1, b: 'ccccccc'},
      method: 'post'
    }, data => {
      console.log(this.translate);
      console.log(data);
    }, msg => {
      alert(msg);
    });
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }
}
