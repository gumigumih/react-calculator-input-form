import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { Calculator } from './Calculator';

export interface CalculatorInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  title?: string;
  description?: string;
  // オプション設定
  enableTaxCalculation?: boolean;
  decimalPlaces?: number;
  numberFormatOptions?: any; // react-number-formatの全オプションを受け付け
  displayPlaceholder?: string; // 電卓モーダル内のプレースホルダー
}

export const CalculatorInput = ({
  value,
  onChange,
  placeholder = 'クリックして金額を入力',
  className,
  title,
  description,
  enableTaxCalculation = false,
  decimalPlaces = 6,
  numberFormatOptions = {},
  displayPlaceholder,
}: CalculatorInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // DOM要素の存在確認
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleCalculate = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  // マウント前は何も表示しない
  if (!mounted) {
    return null;
  }

  return (
    <>
      <NumericFormat
        value={value}
        onValueChange={(vals) => onChange(vals.value)}
        placeholder={placeholder}
        className={className}
        readOnly
        onClick={() => setIsOpen(true)}
        {...numberFormatOptions}
      />
      <Calculator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCalculate={handleCalculate}
        initialValue={value}
        title={title}
        description={description}
        enableTaxCalculation={enableTaxCalculation}
        decimalPlaces={decimalPlaces}
        numberFormatOptions={numberFormatOptions}
        placeholder={displayPlaceholder}
      />
    </>
  );
};
