import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedAuthStoreModule } from '@angular-sample/shared/auth-store';

@NgModule({
  imports: [
    CommonModule,
    SharedAuthStoreModule,

    RouterModule.forChild([
      { path: 'login', pathMatch: 'full', component: LoginPageComponent },
    ]),
  ],
  declarations: [LoginPageComponent, LoginFormComponent],
})
export class AuthModule {}
