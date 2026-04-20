import type { RefObject } from 'react';
import { NumericFormat } from 'react-number-format';

export interface CalculatorDisplayProps {
  value: string;
  error?: string;
  inputRef?: RefObject<HTMLDivElement>;
  editable?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  numberFormatOptions?: any; // react-number-formatの全オプションを受け付け
}

export const CalculatorDisplay = ({ 
  value, 
  error, 
  inputRef, 
  editable, 
  placeholder, 
  onChange,
  numberFormatOptions = {}
}: CalculatorDisplayProps) => {
  return (
    <>
      {editable ? (
        <NumericFormat
          {...numberFormatOptions} // 全オプションを展開
          className="calculator-display-input"
          value={value}
          onValueChange={(vals) => onChange?.(vals.value)}
          placeholder={placeholder ?? '数値を入力'}
          inputMode="decimal"
        />
      ) : (
        <div className="calculator-display-input">
          <div ref={inputRef} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {value ? (
              <NumericFormat
                {...numberFormatOptions} // 全オプションを展開
                value={value}
                displayType="text"
              />
            ) : (
              <span className="text-gray-400">{placeholder ?? '0'}</span>
            )}
          </div>
        </div>
      )}
      {error && <div className="calculator-error">{error}</div>}
    </>
  );
};
