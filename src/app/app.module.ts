import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateLoader } from 'ng2-translate';
import {createTranslateLoader} from './translate/translateLoader';
import {HttpModule, Http} from '@angular/http';

import { Router } from '@angular/router';
import {AppRoutingModule} from './app.routing.module';

import { SkBtnComponent } from './components/sk-btn/sk-btn.component';
import { SkMsgComponent } from './components/sk-msg/sk-msg.component';
import { SkMaskComponent } from './components/sk-mask/sk-mask.component';
import { SkScrollComponent } from './components/sk-scroll/sk-scroll.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SkBtnComponent,
    SkMsgComponent,
    SkMaskComponent,
    SkScrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(router: Router) {
    console.log('Routes11: ', JSON.stringify(router.config, undefined, 2));
  }
}


