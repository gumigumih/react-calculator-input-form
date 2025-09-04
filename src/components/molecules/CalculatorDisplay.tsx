import type { RefObject } from 'react';
import { NumericFormat } from 'react-number-format';

export interface CalculatorDisplayProps {
  value: string;
  error?: string;
  inputRef?: RefObject<HTMLDivElement>;
  editable?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const CalculatorDisplay = ({ value, error, inputRef, editable, placeholder, onChange }: CalculatorDisplayProps) => (
  <>
    {editable ? (
      <NumericFormat
        className="calculator-display-input"
        value={value}
        onValueChange={(vals) => onChange?.(vals.value)}
        thousandSeparator
        allowLeadingZeros={false}
        allowNegative={false}
        decimalScale={6}
        placeholder={placeholder ?? '金額を入力'}
        inputMode="decimal"
      />
    ) : (
      <div className="calculator-display-input">
        <div ref={inputRef} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value ? new Intl.NumberFormat().format(Number(String(value).replace(/,/g, ''))) : <span style={{ color: '#9ca3af' }}>{placeholder ?? '金額を入力'}</span>}
        </div>
      </div>
    )}
    {error && <div className="calculator-error">{error}</div>}
  </>
);