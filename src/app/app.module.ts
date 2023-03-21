import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FileUploadControlComponent } from './pages/file-upload-control/file-upload-control.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification'
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ListComponent } from './pages/list/list.component';
import { NzTableModule } from 'ng-zorro-antd/table'
import { DetailComponent } from './pages/detail/detail.component';
import { NzModalModule } from 'ng-zorro-antd/modal'



registerLocaleData(vi);

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    FileUploadControlComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzFormModule,
    NzCardModule,
    NzSpinModule,
    NzAvatarModule,
    ReactiveFormsModule,
    FormsModule,
    NzNotificationModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzModalModule
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
