# このプロジェクトは？

Angular アプリケーションのサンプルです。

## ツールとバージョン

| ツール  | バージョン |
| ------- | ---------- |
| node    | 16.13.1    |
| npm     | 8.1.2      |
| nx      | 13.4.6     |
| angular | 13.1.4     |
| vscode  | 1.63.2     |

## 0.ワークスペースを初期化する

Nx でワークスペースを作成します。
プリセットは Angular を使用します。

```bash
$ npx create-nx-workspace --preset=angular
✔ Workspace name (e.g., org name)     · angular-sample
✔ Application name                    · app
✔ Default stylesheet format           · scss
✔ Use Nx Cloud? (It's free and doesn't require registration.) · No
```

## 1.開発コンテナを追加する

VSCode の「Remote Containers」拡張を使用して開発環境を Docker コンテナ化します。
Docker コンテナを使用することで開発環境の構築が容易になり、また開発者毎の環境の違いによるトラブルを防ぐことができます。

### 1-1.開発コンテナを初期化する

「Remote-Containers」拡張をインストールしていない場合はインストールしてください。
VSCode のコマンドパレットから「Remote-Containers: Reopen in Container」を実行します。
使用する言語やバージョンを選択できるので、下記を選択してください。

- Node.js & Typescript
- 16-bullseye

### 1-2.開発ツールをインストールする

開発コンテナに開発ツールをインストールします。
Dockerfile に追記した後、VSCode のコマンドパレットから「Remote-Containers: Rebuild Container」を実行してください。

```Dockerfile
RUN npm install -g nx@13.4.6
```

### 1-3.VSCode の拡張機能を追加する

開発チーム全体で使う拡張機能を適宜追加してください。
devcontainer.json に設定した拡張機能は開発コンテナにインストールされます。
extensions.json にも同様に設定してください。

```json
{
  "name": "Node.js & TypeScript",
  ...
  "extensions": [
    "angular.ng-template",
    "nrwl.angular-console",
    "esbenp.prettier-vscode",
    "firsttris.vscode-jest-runner",
    "dbaeumer.vscode-eslint"
  ],
  ...
}
```

## 2.ログインページを追加する

### 2-1.認証モジュールを追加する

ログインページを実装するモジュールを追加します。

```bash
$ nx g @nrwl/angular:lib auth --lazy --routing
```

### 2-2.ログインページのコンポーネントを追加する

Conatainer コンポーネントと Presentation コンポーネントでフォルダを分けます。

```bash
$ nx g @nrwl/angular:component containers/login-page --project=auth
$ nx g @nrwl/angular:component components/login-form --project=auth
```

### 2-3.ログインページのルーティング設定を追加する

auth.module.ts にルーティング設定を追加します。

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: 'login', pathMatch: 'full', component: LoginPageComponent },
    ]),
  ],
  declarations: [LoginPageComponent, LoginFormComponent],
})
export class AuthModule {}
```

app.module.ts に LoginModule へのルーティング設定を追加します。

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            import('@angular-sample/auth').then((m) => m.AuthModule),
        },
      ],
      {
        initialNavigation: 'enabledBlocking',
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

app.component.html に<router-outlet>を追加します。

```html
<angular-sample-nx-welcome></angular-sample-nx-welcome>
<router-outlet></router-outlet>
```

### 2-4.不要なコンポーネントを削除する

自動生成された nx-welcome.component.ts を削除します。
app.module.ts と app.component.html からも記述を削除します。

下記コマンドで Angular を起動して、http://127.0.0.1/auth/loginでログインページが表示されることを確認してください。

```bash
$ nx serve
```

### 2-5.ログインページを実装する

login-form.component.html と login-form.component.ts を実装します。

```html
<input #username placeholder="ユーザー名" type="text" />
<input #password placeholder="パスワード" type="password" />
<button
  (click)="login.emit({ username: username.value, password: password.value })"
>
  ログイン
</button>
```

```typescript
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'angular-sample-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<{ username: string; password: string }>();
}
```

login-page.component.html と login-page.component.ts を実装します。

```html
<angular-sample-login-form (login)="login($event)"></angular-sample-login-form>
```

```typescript
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
```

## 3.認証機能を実装する

### 3-1.ルートストアを追加する

全体の状態を管理するルートストアを追加します。

```bash
$ nx g @nrwl/angular:ngrx app --module=apps/app/src/app/app.module.ts --root=true --facade=false
```

### 3-2.認証ストアを追加する

認証情報を管理する認証ストアライブラリを追加します。
共有するライブラリは shared 配下に作成します。

```bash
$ nx g @nrwl/angular:lib shared/auth-store
```

認証ストアを追加します。

```bash
$ nx g @nrwl/angular:ngrx auth --module=libs/shared/auth-store/src/lib/shared-auth-store.module.ts --root=false --facade=true
```

### 3-3.認証ストアを実装する

auth.models.ts を実装します。

```typescript
export interface Login {
  username: string;
  password: string;
}

export interface AccountEntity {
  id: string;
  name: string;
}
```

auth.actions.ts を変更します。

```typescript
export const login = createAction('[Login Page] Login', props<Login>());

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ account: AccountEntity }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: unknown }>()
);
```

auth.effects.ts を変更します。

```typescript
@Injectable()
export class AuthEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      fetch({
        run: (action) => {
          // TODO 認証機能を実装する
          if (action.password !== 'success') {
            return AuthActions.loginFailure({ error: null });
          }
          const account = { id: '1', name: action.username };
          return AuthActions.loginSuccess({ account });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return AuthActions.loginFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
```

auth.reducer.ts を変更します。

```typescript
export const AUTH_FEATURE_KEY = 'auth';

export interface State {
  account?: AccountEntity | null;
  error?: unknown | null;
  isLogedIn: boolean;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const initialState: State = { isLogedIn: false };

const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { account }) => ({
    ...state,
    account,
    error: null,
    isLogedIn: true,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    account: null,
    error,
    isLogedIn: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
```

auth.selectors.ts を変更します。

```typescript
export const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

export const getAccount = createSelector(
  getAuthState,
  (state: State) => state.account
);

export const getError = createSelector(
  getAuthState,
  (state: State) => state.error
);

export const getIsLoggedIn = createSelector(
  getAuthState,
  (state: State) => state.isLogedIn
);
```

auth.facade.ts を変更する。

```typescript
@Injectable()
export class AuthFacade {
  account$ = this.store.pipe(select(AuthSelectors.getAccount));
  error$ = this.store.pipe(select(AuthSelectors.getError));
  isLogedIn$ = this.store.pipe(select(AuthSelectors.getIsLoggedIn));

  success$ = this.actions$.pipe(ofType(AuthActions.loginSuccess));
  failure$ = this.actions$.pipe(ofType(AuthActions.loginFailure));

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions
  ) {}

  login(username: string, password: string): void {
    this.store.dispatch(AuthActions.login({ username, password }));
  }
}
```
