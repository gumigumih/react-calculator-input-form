import { fireEvent, render, screen } from '@testing-library/react';
import { Calculator } from '../Calculator';

jest.mock('../../molecules/CalculatorKeypad', () => ({
  CalculatorKeypad: ({ onButtonClick, onEqual, onDecide }: any) => (
    <div>
      <button onClick={() => onButtonClick('1')}>1</button>
      <button onClick={() => onButtonClick('+')}>+</button>
      <button onClick={() => onButtonClick('2')}>2</button>
      <button onClick={() => onButtonClick('×')}>×</button>
      <button onClick={() => onButtonClick('3')}>3</button>
      <button onClick={onEqual}>=</button>
      <button onClick={onDecide}>決定</button>
    </div>
  ),
}));

jest.mock('../../molecules/CalculatorDisplay', () => ({
  CalculatorDisplay: ({ value, error }: any) => (
    <div>
      <div data-testid="display">{value}</div>
      {error ? <div>{error}</div> : null}
    </div>
  ),
}));

jest.mock('../../atoms/Icon', () => ({
  Icon: () => <span />,
}));

describe('Calculator', () => {
  it('calculates basic arithmetic without eval', () => {
    const onCalculate = jest.fn();
    render(
      <Calculator
        isOpen
        onClose={jest.fn()}
        onCalculate={onCalculate}
      />
    );

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByTestId('display')).toHaveTextContent('3');
  });

  it('chains operations left to right', () => {
    const onCalculate = jest.fn();
    render(
      <Calculator
        isOpen
        onClose={jest.fn()}
        onCalculate={onCalculate}
      />
    );

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.keyDown(window, { key: '*' });
    fireEvent.click(screen.getAllByRole('button', { name: '3' })[0]);
    fireEvent.click(screen.getByText('決定'));

    expect(onCalculate).toHaveBeenCalledWith('9');
  });

  it('returns 0 for invalid input', () => {
    const onCalculate = jest.fn();
    render(
      <Calculator
        isOpen
        onClose={jest.fn()}
        onCalculate={onCalculate}
      />
    );

    fireEvent.click(screen.getByText('決定'));

    expect(onCalculate).not.toHaveBeenCalled();
    expect(screen.getByText('金額を入力してください')).toBeInTheDocument();
  });

  it('supports division and decimal values', () => {
    const onCalculate = jest.fn();
    render(
      <Calculator
        isOpen
        onClose={jest.fn()}
        onCalculate={onCalculate}
      />
    );

    fireEvent.click(screen.getAllByRole('button', { name: '1' })[0]);
    fireEvent.keyDown(window, { key: '/' });
    fireEvent.click(screen.getAllByRole('button', { name: '2' })[0]);
    fireEvent.keyDown(window, { key: '.' });
    fireEvent.keyDown(window, { key: '5' });
    fireEvent.click(screen.getByText('決定'));

    expect(onCalculate).toHaveBeenCalledWith('0.4');
  });

  it('returns 0 for division by zero', () => {
    const onCalculate = jest.fn();
    render(
      <Calculator
        isOpen
        onClose={jest.fn()}
        onCalculate={onCalculate}
      />
    );

    fireEvent.click(screen.getAllByRole('button', { name: '1' })[0]);
    fireEvent.keyDown(window, { key: '/' });
    fireEvent.keyDown(window, { key: '0' });
    fireEvent.click(screen.getByText('決定'));

    expect(onCalculate).toHaveBeenCalledWith('0');
  });
});
