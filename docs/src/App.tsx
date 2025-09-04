import { useState } from 'react';
import { CalculatorInputForm } from '@gumigumih/react-calculator-input-form';
import {
  FiDownload,
  FiBookOpen,
  FiSettings,
  FiGithub,
  FiPackage,
  FiSquare,
  FiCode,
  FiZap,
  FiInfo,
} from 'react-icons/fi';

export const App = () => {
const [amount1, setAmount1] = useState('');
const [amount2, setAmount2] = useState('');
const [amount3, setAmount3] = useState('');
const [amount4, setAmount4] = useState('');
const [amount5, setAmount5] = useState('');

return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
  {/* ヘッダー */}
  <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
    <div className="max-w-5xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FiSquare className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              React Calculator Input Form Plugin
            </h1>
            <p className="text-sm text-gray-600">React専用電卓入力フォームプラグイン</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/gumigumih/react-calculator-input-form" target="_blank" rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110">
            <FiGithub className="w-7 h-7" />
          </a>
          <a href="https://www.npmjs.com/package/@gumigumih/react-calculator-input-form" target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-110">
            <FiPackage className="w-7 h-7" />
          </a>
        </div>
      </div>
    </div>
  </header>

  {/* ヒーローセクション */}
  <section className="mb-16 mt-8">
    <div className="max-w-5xl mx-auto text-center">
      <div
        className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
        <span>React 18+ 対応</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          税込税抜計算機能付き
        </span>
        <br />
        <span className="text-gray-800">React専用電卓入力フォームプラグイン</span>
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-5xl mx-auto leading-relaxed">
        React専用のシンプルで使いやすい電卓入力フォームプラグイン。税込・税抜計算、小数点対応、カスタマイズ可能なオプションで、
        <span className="font-semibold text-gray-800">あらゆる金額入力シーンに対応</span>します。
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <a href="https://github.com/gumigumih/react-calculator-input-form" target="_blank" rel="noopener noreferrer"
          className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-xl hover:from-gray-800 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
          <FiGithub className="w-5 h-5" />
          <span>GitHubで見る</span>
        </a>
        <a href="https://www.npmjs.com/package/@gumigumih/react-calculator-input-form" target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
          <FiPackage className="w-5 h-5" />
          <span>npmで見る</span>
        </a>
      </div>
    </div>
  </section>

  {/* ページ内ナビゲーション */}
  <nav className="hidden md:block sticky top-24 z-10 mb-8">
    <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-xl p-2 shadow-lg">
      <div className="flex flex-wrap justify-center gap-3">
        <a href="#features" className="px-4 py-2 text-gray-700 hover:text-purple-600 transition-all duration-200 text-sm font-medium">
          特徴
        </a>
        <a href="#installation" className="px-4 py-2 text-gray-700 hover:text-green-600 transition-all duration-200 text-sm font-medium">
          インストール
        </a>
        <a href="#usage" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-200 text-sm font-medium">
          使い方
        </a>
        <a href="#demo" className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-all duration-200 text-sm font-medium">
          デモ
        </a>
        <a href="#options" className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-all duration-200 text-sm font-medium">
          オプション
        </a>
      </div>
    </div>
  </nav>

  {/* 特徴 */}
  <section id="features" className="mb-12">
    <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center space-x-3 mb-8">
        <div
          className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
          <FiZap className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">主要な特徴</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-600 text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">React専用プラグイン</h3>
              <p className="text-gray-600 text-sm">React 18+完全対応、TypeScript対応</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-600 text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">基本的な電卓機能</h3>
              <p className="text-gray-600 text-sm">四則演算、小数点対応、キーボードショートカット</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-600 text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">税込・税抜計算</h3>
              <p className="text-gray-600 text-sm">8%、10%の税率に対応した自動計算</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-purple-600 text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">3桁区切り表示</h3>
              <p className="text-gray-600 text-sm">大きな数値も読みやすく表示</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-orange-600 text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">TypeScript対応</h3>
              <p className="text-gray-600 text-sm">完全な型安全性とIntelliSense対応</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-red-600 text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">カスタマイズ可能</h3>
              <p className="text-gray-600 text-sm">豊富なオプションで柔軟な設定</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-red-600 text-sm font-bold">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">react-number-format完全対応</h3>
              <p className="text-gray-600 text-sm">通貨記号、カスタムフォーマット等の豊富な機能</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* インストール方法 */}
  <section id="installation" className="mb-12">
    <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center space-x-3 mb-8">
        <div
          className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
          <FiDownload className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">インストール方法</h2>
      </div>
      <div className="bg-gray-900 text-green-400 p-6 rounded-xl text-sm font-mono overflow-x-auto shadow-inner">
        <pre>{`# npm
npm install @gumigumih/react-calculator-input-form
    
# yarn
yarn add @gumigumih/react-calculator-input-form
    
# pnpm
pnpm add @gumigumih/react-calculator-input-form`}</pre>
      </div>
    </div>
  </section>

  {/* 基本的な使い方 */}
  <section id="usage" className="mb-12">
    <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center space-x-3 mb-8">
        <div
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
          <FiBookOpen className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">基本的な使い方</h2>
      </div>
      <div className="space-y-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 text-lg">1. インポート</h3>
          <div className="bg-gray-900 text-green-400 p-6 rounded-xl text-sm font-mono overflow-x-auto shadow-inner">
            <pre>{`import { CalculatorInputForm } from '@gumigumih/react-calculator-input-form';`}</pre>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 text-lg">2. 基本的な使用</h3>
          <div className="bg-gray-900 text-green-400 p-6 rounded-xl text-sm font-mono overflow-x-auto shadow-inner">
            <pre>{`function App() {
const [amount, setAmount] = useState('');
        
return (
  <CalculatorInputForm
    value={amount}
    onChange={setAmount}
  />
);
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* 機能デモ */}
  <section id="demo" className="mb-12">
    <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center space-x-3 mb-8">
        <div
          className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <FiCode className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">機能デモ</h2>
      </div>
      <p className="text-lg text-gray-600 mb-8">各オプションの動作を実際に体験できます</p>
      <div className="grid grid-cols-1 gap-8">
        {/* 基本設定 */}
        <div
          className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">基本設定</h3>
          </div>
          <p className="text-gray-600 mb-4">最もシンプルな使用方法。基本的な電卓機能のみを使用します。</p>
          <div className="space-y-6">
            {/* デモ */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>デモ</span>
              </h4>
              <CalculatorInputForm value={amount1} onChange={setAmount1}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-200 hover:border-gray-400" />
              {amount1 && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 mt-3">
                <div className="font-semibold text-gray-900">入力値: {amount1}</div>
              </div>
              )}
            </div>
            
            {/* コード */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>コード</span>
              </h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner">
                <pre>{`<CalculatorInputForm
value={amount1}
onChange={setAmount1}
/>`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* タイトル・説明・プレースホルダー */}
        <div
          className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">タイトル・説明・プレースホルダー</h3>
          </div>
          <p className="text-gray-600 mb-4">モーダルのタイトル、説明文、プレースホルダーをカスタマイズできます。</p>
          <div className="space-y-6">
            {/* デモ */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>デモ</span>
              </h4>
              <CalculatorInputForm value={amount2} onChange={setAmount2} title="料金入力" description="サービス料金を入力してください"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-200 hover:border-gray-400"
                placeholder="料金をクリックして入力" />
              {amount2 && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 mt-3">
                <div className="font-semibold text-gray-900">料金: {amount2}</div>
              </div>
              )}
            </div>
            
            {/* コード */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>コード</span>
              </h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner">
                <pre>{`<CalculatorInputForm
value={amount2}
onChange={setAmount2}
title="料金入力"
description="サービス料金を入力してください"
placeholder="料金をクリックして入力"
/>`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* 小数点設定 */}
        <div
          className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">小数点設定（2桁まで）</h3>
          </div>
          <p className="text-gray-600 mb-4">小数点以下の桁数を制限して、精度をコントロールできます。</p>
          <div className="space-y-6">
            {/* デモ */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>デモ</span>
              </h4>
              <CalculatorInputForm value={amount3} onChange={setAmount3} decimalPlaces={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-200 hover:border-gray-400" />
              {amount3 && (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 mt-3">
                <div className="font-semibold text-gray-900">金額: {amount3}</div>
              </div>
              )}
            </div>
            
            {/* コード */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>コード</span>
              </h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner">
                <pre>{`<CalculatorInputForm
value={amount3}
onChange={setAmount3}
decimalPlaces={2}
/>`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* 税計算対応 */}
        <div
          className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">税計算対応</h3>
          </div>
          <p className="text-gray-600 mb-4">税込・税抜計算機能を有効にして、8%と10%の税率に対応した計算が可能です。</p>
          <div className="space-y-6">
            {/* デモ */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>デモ</span>
              </h4>
              <CalculatorInputForm value={amount4} onChange={setAmount4} enableTaxCalculation={true}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-200 hover:border-gray-400" />
              {amount4 && (
              <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200 mt-3">
                <div className="font-semibold text-gray-900">金額: {amount4}</div>
              </div>
              )}
            </div>
            
            {/* コード */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>コード</span>
              </h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner">
                <pre>{`<CalculatorInputForm
value={amount4}
onChange={setAmount4}
enableTaxCalculation={true}
/>`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* 数値フォーマット */}
        <div
          className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 transition-all duration-300">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">数値フォーマット（¥記号・3桁区切り）</h3>
          </div>
          <p className="text-gray-600 mb-4">react-number-formatを使用して、通貨記号や3桁区切りなどの高度なフォーマットが可能です。</p>
          <div className="space-y-6">
            {/* デモ */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>デモ</span>
              </h4>
              <CalculatorInputForm value={amount5} onChange={setAmount5} decimalPlaces={0} numberFormatOptions={{
                      prefix: "¥",
                      thousandSeparator: true,
                      decimalScale: 0
                    }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-200 hover:border-gray-400" />
              {amount5 && (
              <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200 mt-3">
                <div className="font-semibold text-gray-900">フォーマット済み金額: {amount5}</div>
              </div>
              )}
            </div>
            
            {/* コード */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>コード</span>
              </h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner">
                <pre>{`<CalculatorInputForm
value={amount5}
onChange={setAmount5}
decimalPlaces={0}
numberFormatOptions={{
  prefix: "¥",
  thousandSeparator: true,
  decimalScale: 0
}}
/>`}</pre>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FiInfo className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-2">react-number-formatのすべてのプロパティが利用可能</h4>
                  <p className="text-indigo-800 text-sm mb-3">
                    このプラグインはreact-number-formatライブラリと完全に統合されており、豊富な数値フォーマット機能を提供します。
                  </p>
                  <a href="https://www.npmjs.com/package/react-number-format" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm">
                    <span>公式ドキュメントを見る</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>

  {/* オプション一覧 */}
  <section id="options" className="mb-12">
    <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center space-x-3 mb-8">
        <div
          className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <FiSettings className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">利用可能なオプション一覧</h2>
      </div>

    <p className="text-gray-600 mb-4">このプラグインで利用可能なすべてのオプションとプロパティについて説明します。</p>
    <div className="mb-8">
      <div className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono overflow-x-auto shadow-inner">
        <pre>{`// 利用可能なオプション例
<CalculatorInputForm
value={amount}
onChange={setAmount}
// 基本オプション
title="カスタムタイトル"
description="カスタム説明"
placeholder="カスタムプレースホルダー"
className="custom-css-class"

// 機能オプション
enableTaxCalculation={true}
decimalPlaces={2}

// react-number-format全オプション
numberFormatOptions={{
  prefix: "¥",
  suffix: "",
  thousandSeparator: true,
  decimalSeparator: ".",
  decimalScale: 2,
  allowNegative: false,
  allowLeadingZeros: false
}}
/>`}</pre>
      </div>
    </div>

    {/* 基本オプション */}
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <FiCode className="w-5 h-5 text-blue-600" />
        <span>基本オプション</span>
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">プロパティ
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">型</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">デフォルト
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">説明</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3">
                <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">title</code>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">string</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">"金額入力"</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">モーダルのタイトル</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3">
                <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">description</code>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">string</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">"税込・税抜や小数計算に対応"</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">モーダルの説明文</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3">
                <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">placeholder</code>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">string</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">"クリックして金額を入力"</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">入力フィールドのプレースホルダー</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3">
                <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">className</code>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">string</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">-</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">カスタムCSSクラス</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* 機能オプション */}
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <FiZap className="w-5 h-5 text-purple-600" />
        <span>機能オプション</span>
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">プロパティ
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">型</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">デフォルト
              </th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">説明</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3">
                <code
                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">enableTaxCalculation</code>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">boolean</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">true</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">税計算の有効/無効</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3">
                <code
                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">decimalPlaces</code>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">number</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">6</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">小数点以下の最大桁数</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-3">
                <code
                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">numberFormatOptions</code>
              </td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">object</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">{}</td>
              <td className="border border-gray-200 px-4 py-3 text-sm text-gray-700">数値フォーマット設定（react-number-format準拠）
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </section>

  {/* フッター */}
  <footer className="text-center text-gray-600 py-12 border-t border-gray-200/50">
    <div className="mb-6">
      <div
        className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <FiSquare className="w-8 h-8 text-white" />
      </div>
      <p className="text-lg mb-2">
        Made with <span className="text-red-500 animate-pulse">❤️</span> by{' '}
        <a href="https://github.com/gumigumih" className="text-blue-600 hover:underline font-semibold">gumigumih</a>
      </p>
      <p className="text-gray-500 mb-6">オープンソースで開発されたReactプラグイン</p>
    </div>
    <div className="flex justify-center space-x-6 text-sm">
      <a href="https://github.com/gumigumih/react-calculator-input-form"
        className="text-blue-600 hover:underline hover:text-blue-700 transition-colors">GitHub</a>
      <span className="text-gray-400">•</span>
      <a href="https://www.npmjs.com/package/@gumigumih/react-calculator-input-form"
        className="text-blue-600 hover:underline hover:text-blue-700 transition-colors">npm</a>
      <span className="text-gray-400">•</span>
      <a href="https://opensource.org/licenses/MIT"
        className="text-blue-600 hover:underline hover:text-blue-700 transition-colors">MIT License</a>
    </div>
  </footer>
</div>
);
};