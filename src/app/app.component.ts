import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import { SkMsgInterface } from './components/sk-msg/SkMsgInterface';
import { VerifyDynamicPwdService } from "./yaok/dataService/login/VerifyDynamicPwdService";
import { UploadService } from "./yaok/dataService/attachment/UploadService";

interface Hero {
  name: string;
}

@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  providers: [VerifyDynamicPwdService, UploadService]
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

  constructor(private translate: TranslateService, private baseService: VerifyDynamicPwdService, private uploadService: UploadService) {
    // 设置默认的语言包
    // this.translate.setDefaultLang('zh_CN');
    // 切换语言包
    this.translate.use('zh_CN');


    let service = this.baseService;
    service.setBody({
      dynamicPassword: "asdffffff",
      internationalCode: "+86",
      mobile: "167899",
      token: "132143141"
    });

    service.execute(res => {
      console.log(res);
    }, msg => {
      console.log(this.baseService, msg);
    });
  }

  onSubmit(e) {
    this.uploadService.setBody({
      attachType: "IMG",
      source: "USER",
      file: e.target.files[0]
    });
    console.log(e);  // { first: '', last: '' }
    this.uploadService.execute(res => {
      console.log(res);
    }, msg => {
      console.log(msg);
    });
  }

  onSwipe(e: any) {
    console.log(e);
  }
}
