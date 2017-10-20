import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {SkMsgInterface} from './components/sk-msg/SkMsgInterface';
import {VerifyDynamicPwdService} from "./lib/dataService/login/VerifyDynamicPwdService";
import {UploadService} from "./lib/dataService/attachment/UploadService";

import {Observable} from "rxjs/Observable";
import {SkMaskComponent} from "./components/sk-mask/sk-mask.component";

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
}
