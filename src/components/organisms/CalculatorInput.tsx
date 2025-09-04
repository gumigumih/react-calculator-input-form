import { useMemo, useState } from 'react';
import { Calculator } from './Calculator';

export interface CalculatorInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  title?: string;
  description?: string;
}

function formatNumber(value: string) {
  if (!value) return '';
  const parts = value.split('.');
  const int = parts[0].replace(/,/g, '');
  const dec = parts[1];
  const formattedInt = int ? Number(int).toLocaleString() : '0';
  return dec !== undefined ? `${formattedInt}.${dec}` : formattedInt;
}

export const CalculatorInput = ({
  value,
  onChange,
  placeholder = 'クリックして金額を入力',
  className,
  title,
  description,
}: CalculatorInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const displayValue = useMemo(() => formatNumber(value), [value]);

  const handleCalculate = (val: string) => {
    onChange(formatNumber(val));
    setIsOpen(false);
  };

  return (
    <>
      <input
        type="text"
        value={displayValue}
        placeholder={placeholder}
        className={className}
        readOnly
        onClick={() => setIsOpen(true)}
      />
      <Calculator
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCalculate={handleCalculate}
        initialValue={value}
        title={title}
        description={description}
      />
    </>
  );
};
