# Development Guide

## 🚀 開発ルール

### バージョン管理
- **セマンティックバージョニング** (SemVer) に従う
- メジャーバージョン: 破壊的変更
- マイナーバージョン: 新機能追加（後方互換）
- パッチバージョン: バグ修正（後方互換）

### リリース管理
- **CHANGELOG.mdは使用しない**
- 変更点はGitHubリリースノートで管理
- コミットメッセージで変更内容を明確化
- **自動リリース**: コミットメッセージが自動的に分類されてリリースノートに含まれる

### コミットメッセージのルール

#### 基本形式
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

#### Type（必須）- 変更の種類
- `feat`: 新機能追加
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コードスタイル変更（フォーマット、セミコロン追加など）
- `refactor`: リファクタリング（バグ修正や新機能追加ではない）
- `test`: テスト追加・修正
- `chore`: その他の変更（ビルド設定、依存関係更新など）

#### Scope（オプション）- 変更の範囲
- `component`: コンポーネント関連
- `config`: 設定ファイル
- `workflow`: ワークフロー
- `deps`: 依存関係
- `build`: ビルド関連
- `ci`: CI/CD関連

#### 例
```
feat(component): CalculatorInputをCalculatorInputFormにリネーム

- リポジトリ名により近い名前に変更
- 一貫性と分かりやすさを向上

BREAKING CHANGE: CalculatorInputコンポーネント名が変更されました
```

### 🔄 自動リリースでのコミットメッセージ分類

GitHub Actionsワークフローにより、コミットメッセージが自動的に分類されてリリースノートに含まれます：

#### 🚀 New Features
- `feat:` または `feature:` で始まるコミット
- 新機能の追加や既存機能の拡張

#### 🐛 Bug Fixes
- `fix:` または `bugfix:` で始まるコミット
- バグの修正や問題の解決

#### 📚 Documentation
- `docs:` または `documentation:` で始まるコミット
- README、APIドキュメント、コメントの更新

#### 🎨 Style Changes
- `style:` または `format:` で始まるコミット
- コードのフォーマット、インデント、セミコロンの追加など

#### 🔧 Refactoring
- `refactor:` または `refactoring:` で始まるコミット
- コードの構造改善（機能変更なし）

#### 🧪 Testing
- `test:` または `testing:` で始まるコミット
- テストの追加、修正、改善

#### 🛠️ Maintenance
- `chore:` または `maintenance:` で始まるコミット
- 依存関係の更新、ビルド設定の変更など

#### 📝 Other Changes
- 上記の分類に当てはまらないコミット
- その他の変更や修正

### リリース前チェックリスト
1. ✅ テストが通る
2. ✅ ビルドが成功する
3. ✅ リンターエラーがない
4. ✅ 型チェックが通る
5. ✅ ドキュメントが更新されている
6. ✅ バージョンが適切に更新されている
7. ✅ コミットメッセージが適切な形式になっている

### ワークフロー
```bash
# 開発時
npm run dev          # 開発モード
npm run test         # テスト実行
npm run lint         # リンター実行
npm run typecheck    # 型チェック

# リリース前
npm run workflow:check  # 全チェック実行
npm run build           # ビルド
npm run docs:build      # ドキュメントビルド
```

### 依存関係の管理
- 新規追加: `npm install <package>`
- 開発依存関係: `npm install -D <package>`
- 更新: `npm update`
- 削除: `npm uninstall <package>`

### ブランチ戦略
- `main`: 本番リリース用
- `develop`: 開発用（必要に応じて）
- `feature/*`: 新機能開発
- `fix/*`: バグ修正
- `release/*`: リリース準備

### プルリクエスト
- タイトル: 変更内容を簡潔に
- 説明: 変更理由と影響範囲
- チェックリスト: リリース前チェック項目
- レビュー: 最低1人のレビュー必須

### トラブルシューティング
- ビルドエラー: `npm run clean && npm install && npm run build`
- テストエラー: `npm run test:watch`で詳細確認
- 型エラー: `npm run typecheck`で詳細確認

### 📋 コミットメッセージのベストプラクティス

#### ✅ 良い例
```
feat(component): 税計算機能を追加
fix(calculator): 小数点計算のバグを修正
docs(readme): インストール手順を更新
style(code): ESLintの警告を修正
refactor(utils): 計算ロジックを最適化
test(component): 新機能のテストを追加
chore(deps): React 18.3.0に更新
```

#### ❌ 悪い例
```
update
bug fix
new feature
changed something
```

#### 重要なポイント
- **一貫性**: 同じ種類の変更には同じプレフィックスを使用
- **明確性**: 何を変更したかが分かりやすい説明
- **簡潔性**: 50文字以内で要点を表現
- **日本語対応**: 日本語での説明も可能（ただし英語のプレフィックスは必須）
