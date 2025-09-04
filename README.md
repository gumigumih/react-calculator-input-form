# Calculator Input Form

[![npm version](https://badge.fury.io/js/calculator-input-form.svg)](https://badge.fury.io/js/calculator-input-form)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

React電卓入力フォームプラグイン - 税込税抜計算機能付き

## 機能

- 基本的な電卓機能（四則演算）
- 税込計算（8%、10%）
- 税抜計算（8%、10%）
- キーボードショートカット対応
- TypeScript対応
- **わりまる風の電卓入力コンポーネント**
  - 参加者ごとの金額入力
  - 割り勘計算
  - モバイルファーストデザイン
  - 暗い青の背景に半透明アイコン

## インストール

```bash
npm install @gumigumih/react-calculator-input-form
# または
yarn add @gumigumih/react-calculator-input-form
# または
pnpm add @gumigumih/react-calculator-input-form
```

## クイックスタート

```tsx
import { Calculator } from '@gumigumih/react-calculator-input-form';
import '@gumigumih/react-calculator-input-form/styles'; // CSSスタイルを読み込み

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>電卓を開く</button>
      <Calculator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCalculate={(value) => setAmount(value)}
      />
    </div>
  );
}
```

## 使用方法

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
      <button onClick={() => setIsOpen(true)}>
        電卓を開く
      </button>
      <p>金額: {amount}</p>
      
      <Calculator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCalculate={handleCalculate}
        initialValue={amount}
      />
    </div>
  );
}
```

### わりまる風の電卓（割り勘計算）

```tsx
import { SplitCalculator } from '@gumigumih/react-calculator-input-form';

interface Participant {
  id: string;
  name: string;
  amount: string;
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleCalculate = (participants: Participant[], total: number, perPerson: number) => {
    setParticipants(participants);
    console.log(`合計: ${total}円, 1人あたり: ${perPerson}円`);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        わりまる電卓を開く
      </button>
      
      <SplitCalculator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCalculate={handleCalculate}
        initialParticipants={participants}
      />
    </div>
  );
}
```

## Props

| プロパティ | 型 | 必須 | 説明 |
|------------|----|------|------|
| `isOpen` | boolean | ✓ | 電卓の表示/非表示 |
| `onClose` | () => void | ✓ | 電卓を閉じる時のコールバック |
| `onCalculate` | (value: string) => void | ✓ | 計算完了時のコールバック |
| `initialValue` | string | | 初期値 |
| `initialDescription` | string | | 初期説明文 |
| `personName` | string | | 人物名 |
| `isDetailMode` | boolean | | 詳細モード（説明入力欄表示） |

### WarimaruCalculator Props

| プロパティ | 型 | 必須 | 説明 |
|------------|----|------|------|
| `isOpen` | boolean | ✓ | 電卓の表示/非表示 |
| `onClose` | () => void | ✓ | 電卓を閉じる時のコールバック |
| `onCalculate` | (participants: Participant[], total: number, perPerson: number) => void | ✓ | 計算完了時のコールバック |
| `initialParticipants` | Participant[] | | 初期参加者リスト |

## キーボードショートカット

- `0-9`: 数字入力
- `+`, `-`, `*`, `/`: 演算子
- `Enter`, `=`: 計算実行
- `Escape`: 電卓を閉じる
- `C`: クリア
- `Backspace`: バックスペース

## 開発

```bash
# 依存関係のインストール
npm install

# 開発モード
npm run dev

# ビルド
npm run build
```

## サンプル

### 基本電卓
```bash
cd examples/basic
npm install
npm run dev
```

### わりまる電卓
```bash
cd examples/warimaru
npm install
npm run dev
```

## ライセンス

MIT
