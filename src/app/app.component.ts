import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {SkMsgInterface} from './components/sk-msg/SkMsgInterface';
import {VerifyDynamicPwdService} from "./lib/dataService/login/VerifyDynamicPwdService";
import {UploadService} from "./lib/dataService/attachment/UploadService";

import {Observable} from "rxjs/Observable";
import {SkMaskComponent} from "./components/sk-mask/sk-mask.component";
import {InUserInfo} from "./store/User/UserModule";

interface Hero {
    name: string;
}

declare const window: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
    providers: [VerifyDynamicPwdService, UploadService]
})

export class AppComponent implements AfterViewInit {
<<<<<<< HEAD
  title = 'app';
  test: string;
  username: string;
  hero: Hero = {
    name: 'pcd'
  };

  @ViewChild(SkMaskComponent)
  private mask:SkMaskComponent;

  counter: Observable<number>;

  userInfo: Observable<InUserInfo>;

  msgInfo: SkMsgInterface = {
    title: 'test',
    content: 'sadfffffffffffffffff'
  };

  constructor(private store: Store<AppState>, private translate: TranslateService, private baseService: VerifyDynamicPwdService, private uploadService: UploadService) {

    // window.translate1 = translate;
    // window.store1 = store;
    // window.VerifyDynamicPwdService1 = baseService;
    // this.counter = store.select('UserInfo');
    // this.userInfo = store.select('state');
    //
    // // 设置默认的语言包
    // // this.translate.setDefaultLang('zh_CN');
    // // 切换语言包
    // this.translate.use('zh_CN');
    //
    //
    // const service = this.baseService;
    // service.setBody({
    //   dynamicPassword: "asdffffff",
    //   internationalCode: "+86",
    //   mobile: "167899",
    //   token: "132143141"
    // });
    //
    // service.execute(res => {
    //   console.log(res);
    // }, msg => {
    //   console.log(this.baseService, msg);
    // });
  }

  ngAfterViewInit(){
    // this.mask.show();
  }

  increment() {
    this.mask.show();
    this.store.dispatch({ type: INCREMENT });
    console.log(this.counter);
    // console.log(this.store.select('counter'));
  }

  decrement() {
    this.store.dispatch({ type: DECREMENT, payload: 2 });
  }

  reset() {
    this.store.dispatch({ type: RESET });
  }

  set(){
    debugger;
    this.store.dispatch({type: 'user.set', payload: {name: 'pccold'}})
  }

  onTap() {
    this.increment();
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

  onRefersh(scroll){
    setTimeout(() => {
      scroll.endPullDown();
    }, 3000);
  }

  onLoadMore(scroll): void{
    scroll.endLoadingMore(false);
  }

  onSwipe(e: any) {
    console.log(e);
  }
=======
    title = 'app';
    test: string;
    username: string;
    hero: Hero = {
        name: 'pcd'
    };

    @ViewChild(SkMaskComponent)
    private mask: SkMaskComponent;

    counter: Observable<number>;

    msgInfo: SkMsgInterface = {
        title: 'test',
        content: 'sadfffffffffffffffff'
    };

    constructor(private translate: TranslateService, private baseService: VerifyDynamicPwdService, private uploadService: UploadService) {

        window.translate1 = translate;
        window.VerifyDynamicPwdService1 = baseService;

        // 设置默认的语言包
        // this.translate.setDefaultLang('zh_CN');
        // 切换语言包
        this.translate.use('zh_CN');


        const service = this.baseService;
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

    ngAfterViewInit() {
        // this.mask.show();
    }

    increment() {
        this.mask.show();
        console.log(this.counter);
    }

    onTap() {
        this.increment();
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

    onRefersh(scroll) {
        setTimeout(() => {
            scroll.endPullDown();
        }, 3000);
    }

    onLoadMore(scroll): void {
        scroll.endLoadingMore(false);
    }

    onSwipe(e: any) {
        console.log(e);
    }
>>>>>>> 528c4ab58fa6b4356f3a141b417861320203729f
}
