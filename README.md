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
