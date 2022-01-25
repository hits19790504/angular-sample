import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'angular-sample-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<{ username: string; password: string }>();
}
