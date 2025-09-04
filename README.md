# 🧮 React Calculator Input Form Plugin

[![npm version](https://badge.fury.io/js/@gumigumih/react-calculator-input-form.svg)](https://badge.fury.io/js/@gumigumih/react-calculator-input-form)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Plugin](https://img.shields.io/badge/Plugin-React-blue.svg)](https://reactjs.org/)

> **React専用電卓入力フォームプラグイン** - 税込税抜計算機能付きで、あらゆる金額入力シーンに対応！

## ✨ 特徴

- ⚛️ **React専用プラグイン**（React 18+完全対応）
- 🧮 **基本的な電卓機能**（四則演算）
- 💰 **税込計算**（8%、10%）
- 📊 **税抜計算**（8%、10%）
- 🔢 **小数点以下対応**
- 📈 **3桁区切り表示**
- 🔗 **react-number-format完全対応**（通貨記号、カスタムフォーマット等）
- ⌨️ **キーボードショートカット対応**
- 🔧 **TypeScript対応**
- ⚙️ **カスタマイズ可能なオプション設定**

## 🚀 インストール

```bash
npm install @gumigumih/react-calculator-input-form
```

```bash
yarn add @gumigumih/react-calculator-input-form
```

```bash
pnpm add @gumigumih/react-calculator-input-form
```

## 🎯 クイックスタート

### 最も簡単な使用方法（推奨）

```tsx
import { CalculatorInput } from '@gumigumih/react-calculator-input-form';
import '@gumigumih/react-calculator-input-form/styles';

function App() {
  const [amount, setAmount] = useState('');

  return (
    <div>
      <CalculatorInput
        value={amount}
        onChange={setAmount}
        title="金額入力"
        description="税込・税抜や小数計算に対応"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="クリックして金額を入力"
      />
      <p>金額: {amount}円</p>
    </div>
  );
}
```

### 高度な使用方法

```tsx
import { Calculator } from '@gumigumih/react-calculator-input-form';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const handleCalculate = (value: string) => {
    setAmount(value);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>電卓を開く</button>
      <p>金額: {amount}</p>
      
      <Calculator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCalculate={handleCalculate}
        initialValue={amount}
        title="金額入力"
        description="税込・税抜や小数計算に対応"
      />
    </div>
  );
}
```

## ⚙️ オプション設定

### CalculatorInput オプション

```tsx
<CalculatorInput
  value={amount}
  onChange={setAmount}
  // 税計算の有効/無効
  enableTaxCalculation={false}
  // 小数点以下の桁数
  decimalPlaces={2}
  // 数値フォーマットオプション
  numberFormatOptions={{
    thousandSeparator: true,    // 3桁区切り
    allowNegative: false,       // 負の値を許可
    allowLeadingZeros: false,   // 先頭の0を許可
    decimalScale: 2,            // 小数点以下の最大桁数
    prefix: "¥",                // 通貨記号（前）
    suffix: ""                  // 通貨記号（後）
  }}
/>
```

### Calculator オプション

```tsx
<Calculator
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onCalculate={handleCalculate}
  // 税計算の有効/無効
  enableTaxCalculation={false}
  // 小数点以下の桁数
  decimalPlaces={2}
  // 数値フォーマットオプション
  numberFormatOptions={{
    thousandSeparator: true,
    allowNegative: false,
    allowLeadingZeros: false,
    decimalScale: 2,
    prefix: "¥",
    suffix: ""
  }}
/>
```

## 🔗 react-number-format対応

このプラグインは**react-number-format**ライブラリと完全に統合されており、豊富な数値フォーマット機能を提供します。

### 主要なフォーマット機能

- **通貨記号**: `prefix: "¥"`, `suffix: "$"` など
- **3桁区切り**: `thousandSeparator: true`
- **小数点制御**: `decimalScale: 2`, `allowDecimal: true`
- **負の値制御**: `allowNegative: true/false`
- **先頭ゼロ制御**: `allowLeadingZeros: true/false`
- **カスタム区切り文字**: `thousandSeparator: ","`, `decimalSeparator: "."`

### 使用例

```tsx
// 日本円フォーマット
<CalculatorInput
  value={amount}
  onChange={setAmount}
  numberFormatOptions={{
    prefix: "¥",
    thousandSeparator: true,
    decimalScale: 0,
    allowNegative: false
  }}
/>

// ドルフォーマット
<CalculatorInput
  value={amount}
  onChange={setAmount}
  numberFormatOptions={{
    prefix: "$",
    thousandSeparator: ",",
    decimalSeparator: ".",
    decimalScale: 2,
    suffix: " USD"
  }}
/>

// パーセントフォーマット
<CalculatorInput
  value={amount}
  onChange={setAmount}
  numberFormatOptions={{
    suffix: "%",
    decimalScale: 2,
    allowNegative: false
  }}
/>
```

### 利用可能な全オプション

react-number-formatの**すべてのプロパティ**が利用可能です。詳細は[公式ドキュメント](https://www.npmjs.com/package/react-number-format)をご覧ください。

## 📋 Props

### CalculatorInput Props

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|------------|----|------|------------|------|
| `value` | string | ✓ | - | 入力値 |
| `onChange` | (value: string) => void | ✓ | - | 値変更時のコールバック |
| `placeholder` | string | | "クリックして金額を入力" | プレースホルダーテキスト |
| `className` | string | | - | 入力フィールドのCSSクラス |
| `title` | string | | "金額入力" | モーダルのタイトル |
| `description` | string | | "税込・税抜や小数計算に対応" | モーダルの説明文 |
| `enableTaxCalculation` | boolean | | true | 税計算機能の有効/無効 |
| `decimalPlaces` | number | | 6 | 小数点以下の最大桁数 |
| `numberFormatOptions` | object | | {} | 数値フォーマットの詳細設定 |

### Calculator Props

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|------------|----|------|------------|------|
| `isOpen` | boolean | ✓ | - | 電卓の表示/非表示 |
| `onClose` | () => void | ✓ | - | 電卓を閉じる時のコールバック |
| `onCalculate` | (value: string) => void | ✓ | - | 計算完了時のコールバック |
| `initialValue` | string | | "" | 初期値 |
| `title` | string | | "金額入力" | モーダルのタイトル |
| `description` | string | | "税込・税抜や小数計算に対応" | モーダルの説明文 |
| `enableTaxCalculation` | boolean | | true | 税計算機能の有効/無効 |
| `decimalPlaces` | number | | 6 | 小数点以下の最大桁数 |
| `numberFormatOptions` | object | | {} | 数値フォーマットの詳細設定（react-number-formatの全オプションが利用可能） |

## ⌨️ キーボードショートカット

- `0-9`: 数字入力
- `+`, `-`, `*`, `/`: 演算子
- `Enter`, `=`: 計算実行
- `Escape`: 電卓を閉じる
- `C`: クリア
- `Backspace`: バックスペース
- `.`: 小数点入力

## 🎨 デモ

実際の動作を確認したい場合は、以下のドキュメントページをご覧ください：

```bash
# ルートディレクトリから
npm run docs:dev

# または、docsディレクトリ内で
cd docs
npm install
npm run dev
```

📚 **[詳細なドキュメントとデモはこちら](./docs/)**

## 🛠️ 開発

```bash
# 依存関係のインストール
npm install

# 開発モード
npm run dev

# ビルド
npm run build
```

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 🤝 コントリビューション

バグ報告や機能要望、プルリクエストを歓迎します！

---

**Made with ❤️ by [gumigumih](https://github.com/gumigumih)**
