import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import { SkMsgInterface } from './components/sk-msg/SkMsgInterface';
import { VerifyDynamicPwd } from "./yaok/DataService/login/VerifyDynamicPwd";
import { Upload } from "./yaok/dataService/attachment/Upload";

interface Hero {
  name: string;
}

@Component ({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  providers: [VerifyDynamicPwd, Upload]
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

  constructor(private translate: TranslateService, private baseService: VerifyDynamicPwd, private uploadService: Upload) {
    // 设置默认的语言包
    // this.translate.setDefaultLang('zh_CN');
    // 切换语言包
    this.translate.use('zh_CN');


    const service = this.baseService;
    service.data = {
      dynamicPassword: "asdffffff",
      internationalCode: "+86",
      mobile: "167899",
      token: "132143141"
    };

    service.execute(res => {
      console.log(res);
    }, msg => {
      console.log(this.baseService, msg);
    });
  }

  onSubmit(e) {
    // let files = e.target.files, file, addResult = files;
    // for (var i = 0, l = files.length; i < l; i++) {
    //   file = files[i];
    //   addResult = file; // window.URL.createObjectURL(file));
    //   if (addResult === false){
    //     break;
    //   }
    // }
    // input.value = null;
    debugger;

    this.uploadService.data = {
      attachType: "IMG",
      source: "USER",
      file: e.target.files[0]
    };
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
