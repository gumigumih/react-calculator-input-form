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
  // placeholder removed - not used
}: CalculatorProps) => {
  const [input, setInput] = useState(initialValue || '');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  // DOM要素の存在確認
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setInput(initialValue || '');
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
  }, [isOpen, input]);

  const handleButtonClick = (val: string) => {
    setError('');
    if (val === 'C') {
      setInput('');
    } else if (val === '←') {
      setInput((prev) => prev.slice(0, -1));
    } else if (val === '.') {
      setInput((prev) => {
        if (!prev) return '0.'
        const lastSegment = prev.split(/[+\-×÷]/).pop() || ''
        if (lastSegment.includes('.')) return prev
        return prev + '.'
      })
    } else if (['+', '-', '×', '÷'].includes(val)) {
      if (!input || /[+\-×÷]$/.test(input)) return;
      setInput((prev) => prev + val);
    } else {
      setInput((prev) => (prev === '0' ? val : prev + val));
    }
  };

  const handleEqual = () => {
    if (!input) return;
    const result = calculateExpression(input);
    setInput(result);
  };

  const handleDecide = () => {
    if (!input) {
      setError('金額を入力してください');
      return;
    }
    const result = calculateExpression(input);
    onCalculate(result);
    onClose();
  };

  const handleTaxInclude = (rate: number) => {
    if (!enableTaxCalculation) return;
    if (!input) {
      setError('金額を入力してください');
      return;
    }
    const currentValue = parseFloat(calculateExpression(input));
    if (isNaN(currentValue)) {
      setError('有効な金額を入力してください');
      return;
    }
    const taxIncluded = currentValue * (1 + rate);
    setInput(normalizeNumberString(taxIncluded, decimalPlaces));
    setError('');
  };

  const handleTaxExclude = (rate: number) => {
    if (!enableTaxCalculation) return;
    if (!input) {
      setError('金額を入力してください');
      return;
    }
    const currentValue = parseFloat(calculateExpression(input));
    if (isNaN(currentValue)) {
      setError('有効な金額を入力してください');
      return;
    }
    const taxExcluded = currentValue / (1 + rate);
    setInput(normalizeNumberString(taxExcluded, decimalPlaces));
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
            value={input}
            error={error}
            inputRef={inputRef}
            editable
            onChange={(v) => setInput(v)}
            numberFormatOptions={numberFormatOptions}
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