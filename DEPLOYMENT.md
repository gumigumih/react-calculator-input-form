# デプロイメント設定

このプロジェクトは、mainブランチにプッシュすると自動的に以下が実行されます：

1. **GitHub Pages**: ドキュメントが自動ビルド・デプロイ
2. **npm**: パッケージが自動公開
3. **GitHub Release**: 新しいリリースが自動作成

## セットアップ手順

### 1. GitHub Pages の有効化

1. GitHubリポジトリの **Settings** → **Pages** に移動
2. **Source** を **GitHub Actions** に設定
3. これにより、`.github/workflows/deploy.yml` が自動実行されます

### 2. npm トークンの設定

1. [npmjs.com](https://www.npmjs.com) にログイン
2. **Access Tokens** で新しいトークンを作成
3. GitHubリポジトリの **Settings** → **Secrets and variables** → **Actions** に移動
4. **New repository secret** で以下を追加：
   - **Name**: `NPM_TOKEN`
   - **Value**: npmで作成したトークン

### 3. 初回デプロイ

1. mainブランチにプッシュ
2. GitHub Actionsが自動実行
3. 以下が順次実行されます：
   - docsのビルド
   - GitHub Pagesへのデプロイ
   - npmへのパッケージ公開
   - GitHub Releaseの作成

## 動作確認

### GitHub Pages
- URL: `https://gumigumih.github.io/react-calculator-input-form/`
- デプロイ完了後、数分でアクセス可能

### npm
- パッケージ: `@gumigumih/react-calculator-input-form`
- インストール: `npm install @gumigumih/react-calculator-input-form`

## トラブルシューティング

### GitHub Pagesが表示されない
- GitHub Actionsの実行ログを確認
- リポジトリの設定でPagesが有効になっているか確認

### npm公開が失敗する
- `NPM_TOKEN` が正しく設定されているか確認
- パッケージ名が重複していないか確認
- バージョン番号が適切に更新されているか確認

### ビルドエラー
- `npm ci` で依存関係が正しくインストールされているか確認
- TypeScriptの型エラーがないか確認

## 手動デプロイ

必要に応じて、手動でワークフローを実行することも可能です：

1. GitHubリポジトリの **Actions** タブに移動
2. **Deploy to GitHub Pages and npm** ワークフローを選択
3. **Run workflow** ボタンをクリック
4. ブランチを選択して実行

## 注意事項

- mainブランチへのプッシュのみでデプロイが実行されます
- プルリクエストではデプロイは実行されません
- バージョン番号は `package.json` で管理してください
- 初回デプロイ時は、GitHub Pagesの設定が反映されるまで時間がかかる場合があります
