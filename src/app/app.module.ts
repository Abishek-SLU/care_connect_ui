import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeatureModuleModule } from './feature-module/feature-module.module';
import { SharedModule } from './shared/module/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginInterceptorInterceptor } from 'src/environments/interceptor/login-interceptor.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatModule } from './chat/chat.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FeatureModuleModule,
    SharedModule, NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoginInterceptorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
