import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import { NgForm } from '@angular/forms';
import { SkMsgInterface } from './components/sk-msg/SkMsgInterface';
import { VerifyDynamicPwd } from "./yaok/DataService/login/VerifyDynamicPwd";

interface Hero {
  name: string;
}

@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  providers: [VerifyDynamicPwd]
})

export class AppComponent {
  title = 'app';
  test: string;
  username: string;
  hero: Hero = {
    name: 'pcd'
  };

  msgInfo: SkMsgInterface = {
    title: 'test',
    content: 'sadfffffffffffffffff'
  };

  constructor(private translate: TranslateService, private baseService: VerifyDynamicPwd) {
    // 设置默认的语言包
    // this.translate.setDefaultLang('zh_CN');
    // 切换语言包
    this.translate.use('zh_CN');


    var service = this.baseService;
    this.baseService.data = {
      dynamicPassword: "asdffffff",
      internationalCode: "+86",
      mobile: "167899",
      token: "132143141"
    };

    this.baseService.execute(res => {
      console.log(res);
    }, msg => {
      console.log(this.baseService, msg);
    });

    // 显示消息
    // this.translate.get('HELLO', {value: 'world'}).subscribe((res: string) => {
    //   console.log(res);
    //   this.hello = res;
    // });

    // this.httpService.request({
    //   url: 'http://apptestv2.yaok.com/appapi/remoteConfig/getConfigs',
    //   params: {v: 1},
    //   data: {a: 1, b: 'ccccccc'},
    //   method: 'post'
    // }, data => {
    //   console.log(this.translate);
    //   console.log(data);
    // }, msg => {
    //   alert(msg);
    // });
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }

  onSwiperLeft(e: any) {
    console.log(e);
  }

  onTap(e: any) {
    console.log('tap', e);
  }
}
