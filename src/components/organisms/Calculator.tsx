import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../atoms/Icon';
import { CalculatorDisplay } from '../molecules/CalculatorDisplay';
import { CalculatorKeypad } from '../molecules/CalculatorKeypad';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { NumericFormatProps } from 'react-number-format';
import { useCalculatorController } from './useCalculatorController';

export interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onCalculate: (value: string) => void;
  initialValue?: string;
  title?: string;
  description?: string;
  // オプション設定
  enableTaxCalculation?: boolean;
  decimalPlaces?: number;
  numberFormatOptions?: Partial<NumericFormatProps>;
  placeholder?: string; // 電卓モーダル内のプレースホルダー
}

export const Calculator = ({
  isOpen,
  onClose,
  onCalculate,
  initialValue = '',
  title,
  description,
  enableTaxCalculation = false,
  decimalPlaces = 6,
  numberFormatOptions = {},
  placeholder,
}: CalculatorProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const {
    mounted,
    displayValue,
    error,
    handleDisplayChange,
    handleButtonClick,
    handleEqual,
    handleDecide,
    handleTaxInclude,
    handleTaxExclude,
  } = useCalculatorController({
    isOpen,
    initialValue,
    onClose,
    onCalculate,
    enableTaxCalculation,
    decimalPlaces,
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      const activeElement = document.activeElement as HTMLElement | null;
      if (activeElement && activeElement.tagName === 'INPUT') return;
      if (e.key >= '0' && e.key <= '9') {
        handleButtonClick(e.key);
        e.preventDefault();
      } else if (e.key === '.') {
        handleButtonClick('.')
        e.preventDefault();
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleButtonClick(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
        e.preventDefault();
      } else if (e.key === 'Backspace') {
        handleButtonClick('←');
        e.preventDefault();
      } else if (e.key === 'Enter' || e.key === '=') {
        handleDecide();
        e.preventDefault();
      } else if (e.key === 'Escape') {
        onClose();
        e.preventDefault();
      } else if (e.key === 'c' || e.key === 'C') {
        handleButtonClick('C');
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleButtonClick, handleDecide, onClose]);

  if (!isOpen || !mounted) return null;

  const modal = (
    <div className="calculator-overlay">
      <div className="calculator-modal">
                {/* Header */}
                {title || description ? (
                  <div className="calculator-header">
                    <div>
                      {title && <h2 className="calculator-title">{title}</h2>}
                      {description && <p className="calculator-subtitle">{description}</p>}
                    </div>
                    <button onClick={onClose} className="calculator-close-button" aria-label="閉じる">
                      <Icon icon={faTimes} className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="calculator-header">
                    <div></div>
                    <button onClick={onClose} className="calculator-close-button" aria-label="閉じる">
                      <Icon icon={faTimes} className="w-5 h-5" />
                    </button>
                  </div>
                )}
        <div className="calculator-display">
          <CalculatorDisplay
            value={displayValue}
            error={error}
            inputRef={inputRef}
            editable
            onChange={handleDisplayChange}
            numberFormatOptions={numberFormatOptions}
            placeholder={placeholder}
          />
        </div>
        <CalculatorKeypad
          onButtonClick={handleButtonClick}
          onEqual={handleEqual}
          onDecide={handleDecide}
          onTaxInclude={handleTaxInclude}
          onTaxExclude={handleTaxExclude}
          enableTaxCalculation={enableTaxCalculation}
          decimalPlaces={decimalPlaces}
        />
      </div>
    </div>
  );

  // DOM要素の存在確認を行ってからポータルを作成
  if (typeof document !== 'undefined' && document.body) {
    return createPortal(modal, document.body);
  }
  
  return null;
};
