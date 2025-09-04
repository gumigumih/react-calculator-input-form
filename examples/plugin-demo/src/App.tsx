import { useState } from 'react';
import { CalculatorInput } from '@gumigumih/react-calculator-input-form';

export const App = () => {
  const [amount, setAmount] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Calculator Input Form Demo
          </h1>
          
          <div className="space-y-4">
            <div>
              <CalculatorInput
                value={amount}
                onChange={setAmount}
                title="金額入力"
                description="税込・税抜や小数計算に対応"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calculator は CalculatorInput 内部で扱うため不要 */}
    </div>
  );
};
