import { Button } from '../atoms/Button';

export interface CalculatorKeypadProps {
  onButtonClick: (button: string) => void;
  onEqual: () => void;
  onDecide: () => void;
  onTaxInclude: (rate: number) => void;
  onTaxExclude: (rate: number) => void;
  enableTaxCalculation?: boolean;
  decimalPlaces?: number;
}

export const CalculatorKeypad = ({ 
  onButtonClick, 
  onEqual, 
  onDecide, 
  onTaxInclude, 
  onTaxExclude,
  enableTaxCalculation = true,
  decimalPlaces = 6
}: CalculatorKeypadProps) => {
  // decimalPlacesが0の場合は小数点ボタンを非表示
  const buttons = decimalPlaces === 0 
    ? [
        ['7', '8', '9', '÷'],
        ['4', '5', '6', '×'],
        ['1', '2', '3', '-'],
        ['0', '←'], // 小数点ボタンを削除
        ['+'],
      ]
    : [
        ['7', '8', '9', '÷'],
        ['4', '5', '6', '×'],
        ['1', '2', '3', '-'],
        ['0', '.', '←'],
        ['+'],
      ];

  return (
    <div className="calculator-keypad-section">
      <div className="calculator-keypad">
        {enableTaxCalculation && (
          <div className="calculator-keypad-grid">
            <Button className="calculator-keypad-button include" onClick={() => onTaxInclude(0.08)} tabIndex={0}>税込<br/>8%</Button>
            <Button className="calculator-keypad-button include" onClick={() => onTaxInclude(0.10)} tabIndex={0}>税込<br/>10%</Button>
            <Button className="calculator-keypad-button exclude" onClick={() => onTaxExclude(0.08)} tabIndex={0}>税抜<br/>8%</Button>
            <Button className="calculator-keypad-button exclude" onClick={() => onTaxExclude(0.10)} tabIndex={0}>税抜<br/>10%</Button>
          </div>
        )}
        <div className="calculator-keypad-grid" style={{ marginTop: '0.25rem' }}>
          {buttons.flat().map((btn, i) => {
            let className = 'calculator-keypad-button ';
            if (['÷', '×', '-', '+'].includes(btn)) className += 'operator';
            else if (btn === '←') className += 'backspace';
            else if (btn === '0' && decimalPlaces === 0) className += 'number zero-wide'; // 0ボタンを2つ分の幅に
            else className += 'number';
            return (
              <Button key={btn + i} className={className} onClick={() => onButtonClick(btn)} tabIndex={0}>
                {btn}
              </Button>
            );
          })}
        </div>
        <div className="calculator-action-buttons" style={{ marginTop: '0.75rem' }}>
          <Button className="calculator-keypad-button clear" onClick={() => onButtonClick('C')}>C</Button>
          <Button className="calculator-equals-button" onClick={onEqual}>=</Button>
          <Button className="calculator-decide-button" onClick={onDecide}>決定</Button>
        </div>
      </div>
    </div>
  );
};