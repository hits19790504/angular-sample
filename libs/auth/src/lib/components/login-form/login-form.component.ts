import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'angular-sample-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input() error?: string | null;
  @Output() login = new EventEmitter<{ username: string; password: string }>();
}
