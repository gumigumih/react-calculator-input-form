import { useState } from 'react';
import { CalculatorInput } from '@gumigumih/react-calculator-input-form';

export const App = () => {
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [amount3, setAmount3] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Calculator Input Form Demo
          </h1>
          
          <div className="space-y-8">
            {/* パターン1: オプション指定なし */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                デフォルト
              </h2>
              <div className="space-y-4">
                <CalculatorInput
                  value={amount1}
                  onChange={setAmount1}
                  numberFormatOptions={{
                    thousandSeparator: true,
                    allowNegative: false,
                    allowLeadingZeros: false,
                    decimalScale: 6
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                />
              </div>
            </div>

            {/* パターン2: タイトル・説明・プレースホルダー指定 */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                タイトル・説明・プレースホルダー指定
              </h2>
              <div className="space-y-4">
                <CalculatorInput
                  value={amount2}
                  onChange={setAmount2}
                  title="料金入力"
                  description="サービス料金を入力してください"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  placeholder="料金をクリックして入力"
                />
              </div>
            </div>

            {/* パターン3: 小数点0位まで、税計算なし */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                整数、税計算なし、¥記号付き
              </h2>
              <div className="space-y-4">
                <CalculatorInput
                  value={amount3}
                  onChange={setAmount3}
                  enableTaxCalculation={false}
                  decimalPlaces={0}
                  numberFormatOptions={{
                    thousandSeparator: true,
                    allowNegative: false,
                    allowLeadingZeros: false,
                    decimalScale: 0,
                    prefix: "¥"
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
