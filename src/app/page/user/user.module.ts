import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user.module.routing';
import {LoginComponent} from './Login';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ],
  providers: [HttpClient],
  declarations: [LoginComponent]
})
export class UserModule {
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
