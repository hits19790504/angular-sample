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
