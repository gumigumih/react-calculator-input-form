import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../atoms/Icon';
import { CalculatorDisplay } from '../molecules/CalculatorDisplay';
import { CalculatorKeypad } from '../molecules/CalculatorKeypad';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
  numberFormatOptions?: any; // react-number-formatの全オプションを受け付け
  placeholder?: string; // 電卓モーダル内のプレースホルダー
}

// formatNumber function removed - not used

function normalizeNumberString(num: number, maxFractionDigits: number = 6) {
  if (!isFinite(num)) return '0'
  const fixed = num.toFixed(maxFractionDigits)
  const trimmed = fixed.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1')
  return trimmed
}

function calculateExpression(expr: string): string {
  try {
    const sanitized = expr.replace(/,/g, '').replace(/×/g, '*').replace(/÷/g, '/');
    // eslint-disable-next-line no-eval
    const result = eval(sanitized);
    if (isNaN(result) || !isFinite(result)) return '0';
    return normalizeNumberString(result);
  } catch {
    return '0';
  }
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
  const [expression, setExpression] = useState(initialValue || '');
  const [displayValue, setDisplayValue] = useState(initialValue || '');
  const [error, setError] = useState('');
  const [isWaitingForOperand, setIsWaitingForOperand] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  // DOM要素の存在確認
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setExpression(initialValue || '');
      setDisplayValue(initialValue || '');
      setIsWaitingForOperand(false);
      setError('');
    }
  }, [isOpen, initialValue]);

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
  }, [isOpen, expression, displayValue]);

  const handleDisplayChange = (newValue: string) => {
    setError('');
    setDisplayValue(newValue);
    if (isWaitingForOperand) {
      // 演算子入力後の直接入力の場合、式を更新しない
      // If an operator was just entered, and user types directly,
      // the new value is the start of the next operand.
      // Append it to the expression.
      setExpression(expression + newValue);
      setIsWaitingForOperand(false); // No longer waiting for operand
    } else {
      // 既存の式の最後の数値を置き換える
      const newExpression = expression.replace(/[\d.]+$/, newValue);
      setExpression(newExpression);
    }
  };

  const handleButtonClick = (val: string) => {
    setError('');
    if (val === 'C') {
      setExpression('');
      setDisplayValue('');
      setIsWaitingForOperand(false);
    } else if (val === '←') {
      if (displayValue.length > 0) {
        const newDisplayValue = displayValue.slice(0, -1);
        setDisplayValue(newDisplayValue);
        setExpression((prev) => prev.slice(0, -1));
      }
    } else if (val === '.') {
      if (!displayValue.includes('.')) {
        const newDisplayValue = displayValue ? displayValue + '.' : '0.';
        setDisplayValue(newDisplayValue);
        if (isWaitingForOperand) {
          setExpression(expression + newDisplayValue);
          setIsWaitingForOperand(false);
        } else {
          setExpression(expression + (displayValue ? '.' : '0.'));
          // Append decimal to the last number in the expression
          const lastNumberRegex = /([\d.]+)$/;
          setExpression(expression.replace(lastNumberRegex, (match) => match + '.'));
        }
      }
    } else if (['+', '-', '×', '÷'].includes(val)) {
      if (expression) {
        if (/[+\-×÷]$/.test(expression)) {
          setExpression(expression.slice(0, -1) + val);
        } else {
          const result = calculateExpression(expression);
          setExpression(result + val);
          setDisplayValue(result);
        }
        setIsWaitingForOperand(true);
      }
    } else {
      if (isWaitingForOperand) {
        setDisplayValue(val);
        setExpression(expression + val);
        setIsWaitingForOperand(false);
      } else {
        const newDisplayValue = displayValue === '0' ? val : displayValue + val;
        setDisplayValue(newDisplayValue);
        setExpression(expression === '0' ? val : expression + val);
      }
    }
  };

  const handleEqual = () => {
    if (!expression) return;
    const result = calculateExpression(expression);
    setExpression(result);
    setDisplayValue(result);
    setIsWaitingForOperand(false);
  };

  const handleDecide = () => {
    if (!expression) {
      setError('金額を入力してください');
      return;
    }
    const result = calculateExpression(expression);
    onCalculate(result);
    onClose();
  };

  const handleTaxInclude = (rate: number) => {
    if (!enableTaxCalculation) return;
    if (!expression) {
      setError('金額を入力してください');
      return;
    }
    const currentValue = parseFloat(calculateExpression(expression));
    if (isNaN(currentValue)) {
      setError('有効な金額を入力してください');
      return;
    }
    const taxIncluded = currentValue * (1 + rate);
    const result = normalizeNumberString(taxIncluded, decimalPlaces);
    setExpression(result);
    setDisplayValue(result);
    setError('');
  };

  const handleTaxExclude = (rate: number) => {
    if (!enableTaxCalculation) return;
    if (!expression) {
      setError('金額を入力してください');
      return;
    }
    const currentValue = parseFloat(calculateExpression(expression));
    if (isNaN(currentValue)) {
      setError('有効な金額を入力してください');
      return;
    }
    const taxExcluded = currentValue / (1 + rate);
    const result = normalizeNumberString(taxExcluded, decimalPlaces);
    setExpression(result);
    setDisplayValue(result);
    setError('');
  };

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