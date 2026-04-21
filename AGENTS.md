# AGENTS.md for `D:\Github\gumigumih\react-calculator-input-form`

## 1. リポジトリの前提

- このリポジトリは React の電卓入力フォームライブラリ。
- 公開パッケージは `@gumigumih/react-calculator-input-form`。
- docs は `docs/` 配下にある別アプリとして扱う。
- GitHub Flow を前提に作業する。
- SemVer を使う。
- `CHANGELOG.md` は使わず、変更点は GitHub Release ノートで管理する。
- GitHub Actions の自動分類で Release ノートにコミットメッセージを反映する運用を前提にする。

## 2. ブランチとコミット

- 作業ブランチは原則 `main` から切る。
- ブランチ名は `feature/<short-kebab-case>` / `fix/<short-kebab-case>` / `chore/<short-kebab-case>` を使う。
- コミットは原子性を保ち、1コミット1論点にする。
- 仕様変更、リファクタ、フォーマット、依存更新はできるだけ分ける。
- 変更に必須のテストやドキュメントは、対応する変更と同じコミットに含める。
- コミットメッセージは `<type>(<scope>): <概要>` または `<type>: <概要>` を基本にする。
- `type` は `feat` `fix` `refactor` `docs` `test` `chore` などを使う。
- `<概要>` は日本語で簡潔に書く。
- 破壊的変更がある場合は本文かフッターで明記する。
- ブランチ運用は `main` を基準に `feature/*` `fix/*` `chore/*` `release/*` を使い分ける。

## 3. 実装方針

- `eval` は使わない。
- 電卓の計算は演算子優先順位なしの逐次計算方式を前提にする。
- 色の変更は CSS 変数と `colors` props を通して行う。
- `react-number-format` と `react-dom` は peer dependency として扱う。
- `Button` / `Icon` のような内部部品は公開 API として増やさない。
- `colors` が色指定の正式 API。
- `theme` は互換用エイリアスとして扱う。
- `variant` は使わない。
- バージョンは `major` が破壊的変更、`minor` が後方互換の新機能、`patch` が後方互換の修正。

## 4. 開発・検証

- 変更後は必要に応じて `npm test -- --runInBand`、`npm run typecheck`、`npm run build` を確認する。
- 公開前は `npm pack --dry-run` を確認する。
- 全体確認が必要なら `npm run workflow:check` を優先する。
- docs を触る場合は `docs/package.json` 側のビルドも意識する。
- 開発時は `npm run dev` `npm run test` `npm run lint` `npm run typecheck` を使う。
- リリース前は `npm run workflow:check` `npm run build` `npm run docs:build` を使う。
- 依存関係の追加・更新・削除は `npm install` `npm install -D` `npm update` `npm uninstall` を使う。
- PR は変更理由と影響範囲を明記し、必要ならチェックリストを付ける。
- ビルドエラーは `npm run clean && npm install && npm run build`、テストエラーは `npm run test:watch`、型エラーは `npm run typecheck` で切り分ける。

## 5. リリースと公開

- `package.json` の version を更新してから公開する。
- npm 公開は GitHub Actions の `publish-npm.yml` が前提。
- `v<version>` の Git tag を公開版の基準にする。
- GitHub Release 用のノートは必要に応じて別ファイルで準備する。
- `workflow:check` の合格を公開前の基準にする。
- ルートの npm パッケージを公開対象とし、`docs/` は公開しない。

## 6. 注意事項

- 既存のユーザー変更は勝手に戻さない。
- 不要な破壊的変更は避ける。
- docs のビルド失敗が環境依存の場合は、コード修正と切り分けて扱う。
- `react-number-format` の仕様変更や内部部品の export 拡張は公開 API 影響を確認してから行う。
