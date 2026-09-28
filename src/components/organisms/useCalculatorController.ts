import { useEffect, useState } from 'react';
import { calculateExpression, normalizeNumberString } from './calculatorUtils';

type ControllerParams = {
  isOpen: boolean;
  initialValue?: string;
  onClose: () => void;
  onCalculate: (value: string) => void;
  enableTaxCalculation: boolean;
  decimalPlaces: number;
  getInputValue?: () => string;
  onOperatorInput?: () => void;
};

export function useCalculatorController({
  isOpen,
  initialValue = '',
  onClose,
  onCalculate,
  enableTaxCalculation,
  decimalPlaces,
  getInputValue,
  onOperatorInput,
}: ControllerParams) {
  const operatorButtons = ['+', '-', '×', '÷'];
  const [expression, setExpression] = useState(initialValue || '');
  const [displayValue, setDisplayValue] = useState(initialValue || '');
  const [error, setError] = useState('');
  const [isWaitingForOperand, setIsWaitingForOperand] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setExpression(initialValue || '');
    setDisplayValue(initialValue || '');
    setIsWaitingForOperand(false);
    setError('');
  }, [isOpen, initialValue]);

  const commitExpression = (nextExpression: string, nextDisplayValue = nextExpression) => {
    setExpression(nextExpression);
    setDisplayValue(nextDisplayValue);
  };

  const getCompletedExpression = () => isWaitingForOperand ? expression.slice(0, -1) : expression;

  const normalizeInputValue = (value: string) => {
    return value.replace(/,/g, '').replace(/[^\d.+\-×÷*/]/g, '');
  };

  const replaceLastNumber = (nextValue: string) => {
    setExpression((prev) => (
      /[\d.]+$/.test(prev)
        ? prev.replace(/[\d.]+$/, nextValue)
        : prev + nextValue
    ));
  };

  const appendDigit = (val: string) => {
    if (isWaitingForOperand) {
      commitExpression(expression + val, val);
      setIsWaitingForOperand(false);
      return;
    }

    const nextDisplayValue = displayValue === '0' ? val : displayValue + val;
    commitExpression(expression === '0' ? val : expression + val, nextDisplayValue);
  };

  const appendDecimal = () => {
    if (isWaitingForOperand) {
      commitExpression(expression + '0.', '0.');
      setIsWaitingForOperand(false);
      return;
    }

    if (displayValue.includes('.')) return;
    const nextDisplayValue = displayValue ? `${displayValue}.` : '0.';

    replaceLastNumber(nextDisplayValue);
    setDisplayValue(nextDisplayValue);
  };

  const appendOperator = (val: string) => {
    if (!expression) return;
    const currentResult = calculateExpression(getCompletedExpression(), decimalPlaces);
    const nextExpression = /[+\-×÷]$/.test(expression)
      ? expression.slice(0, -1) + val
      : `${currentResult}${val}`;

    commitExpression(nextExpression, currentResult);
    setIsWaitingForOperand(true);
    onOperatorInput?.();
  };

  const handleDisplayChange = (newValue: string) => {
    setError('');
    if (isWaitingForOperand) {
      const nextOperand = displayValue && newValue.startsWith(displayValue)
        ? newValue.slice(displayValue.length)
        : newValue;
      commitExpression(expression + nextOperand, nextOperand);
      setIsWaitingForOperand(false);
      return;
    }

    setDisplayValue(newValue);
    replaceLastNumber(newValue);
  };

  const handleButtonClick = (val: string) => {
    setError('');
    if (val === 'C') {
      setExpression('');
      setDisplayValue('');
      setIsWaitingForOperand(false);
      return;
    }

    if (val === '←') {
      if (isWaitingForOperand) {
        commitExpression(expression.slice(0, -1));
        setIsWaitingForOperand(false);
        return;
      }
      if (displayValue.length === 0) return;
      const nextDisplayValue = displayValue.slice(0, -1);
      setDisplayValue(nextDisplayValue);
      setExpression((prev) => prev.slice(0, -1));
      return;
    }

    if (val === '.') {
      appendDecimal();
      return;
    }

    if (operatorButtons.includes(val)) {
      appendOperator(val);
      return;
    }

    appendDigit(val);
  };

  const handleEqual = () => {
    const currentExpression = getCompletedExpression() || normalizeInputValue(getInputValue?.() || displayValue);
    if (!currentExpression) return;
    const result = calculateExpression(currentExpression, decimalPlaces);
    setExpression(result);
    setDisplayValue(result);
    setIsWaitingForOperand(false);
  };

  const handleDecide = () => {
    const currentExpression = getCompletedExpression() || normalizeInputValue(getInputValue?.() || displayValue);
    if (!currentExpression) {
      setError('金額を入力してください');
      return;
    }
    const result = calculateExpression(currentExpression, decimalPlaces);
    onCalculate(result);
    onClose();
  };

  const updateTaxValue = (compute: (value: number, rate: number) => number, rate: number) => {
    if (!enableTaxCalculation) return;
    const currentExpression = getCompletedExpression();
    if (!currentExpression) {
      setError('金額を入力してください');
      return;
    }
    const currentValue = parseFloat(calculateExpression(currentExpression, decimalPlaces));
    if (isNaN(currentValue)) {
      setError('有効な金額を入力してください');
      return;
    }
    const result = normalizeNumberString(compute(currentValue, rate), decimalPlaces);
    setExpression(result);
    setDisplayValue(result);
    setIsWaitingForOperand(false);
    setError('');
  };

  const handleTaxInclude = (rate: number) => {
    updateTaxValue((value, taxRate) => value * (1 + taxRate), rate);
  };

  const handleTaxExclude = (rate: number) => {
    updateTaxValue((value, taxRate) => value / (1 + taxRate), rate);
  };

  return {
    mounted,
    displayValue,
    error,
    handleDisplayChange,
    handleButtonClick,
    handleEqual,
    handleDecide,
    handleTaxInclude,
    handleTaxExclude,
  };
}
