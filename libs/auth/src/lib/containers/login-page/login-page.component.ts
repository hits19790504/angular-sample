import { AuthFacade } from '@angular-sample/shared/auth-store';
import { Component, OnDestroy } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'angular-sample-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  error$: Observable<string | null>;

  constructor(private readonly authFacade: AuthFacade) {
    this.authFacade.success$
      .pipe(takeUntil(this.destroy$))
      .subscribe((success) => {
        // TODO 画面遷移
        console.log('Login success.');
      });
    this.error$ = this.authFacade.failure$.pipe(
      map(
        (failure) =>
          '認証できませんでした。ユーザー名とパスワードを確認してください。'
      )
    );
  }

  login(event: { username: string; password: string }): void {
    this.authFacade.login(event.username, event.password);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
