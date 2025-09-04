import { Button } from '../atoms/Button';

interface SplitKeypadProps {
  onButtonClick: (val: string) => void;
  onEqual: () => void;
  onDecide: () => void;
}

const BUTTONS = [
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '-'],
  ['0', '.', 'C', '←'],
  ['+'],
];

export const SplitKeypad = ({ 
  onButtonClick, 
  onEqual, 
  onDecide 
}: SplitKeypadProps) => (
  <div className="calculator-keypad">
    {/* 通常の電卓ボタン */}
    <div className="calculator-keypad-grid">
      {BUTTONS.flat().map((btn, i) => {
        let buttonClass = "calculator-keypad-button";
        
        if (['÷', '×', '-', '+'].includes(btn)) {
          // 演算子ボタン
          buttonClass += " operator";
        } else if (btn === 'C') {
          // クリアボタン
          buttonClass += " clear";
        } else if (btn === '←') {
          // バックスペースボタン
          buttonClass += " backspace";
        } else if (btn === '.') {
          // 小数点ボタン
          buttonClass += " decimal";
        } else {
          // 数字ボタン
          buttonClass += " number";
        }
        
        return (
          <Button
            key={btn + i}
            className={buttonClass}
            onClick={() => onButtonClick(btn)}
            tabIndex={0}
          >
            {btn}
          </Button>
        );
      })}
    </div>
    
    {/* アクションボタン */}
    <div className="calculator-action-buttons">
      <Button
        className="calculator-equals-button"
        onClick={onEqual}
      >
        =
      </Button>
      <Button
        className="calculator-decide-button"
        onClick={onDecide}
      >
        決定
      </Button>
    </div>
  </div>
);
