import { Component } from '@angular/core';

@Component({
  selector: 'angular-sample-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  login(event: { username: string; password: string }): void {
    // TODO 認証機能を組み込む
    console.log(event);
  }
}
