import { render, screen, fireEvent } from '@testing-library/react';
import { CalculatorInputForm } from '../CalculatorInputForm';

// Mock the Calculator component
jest.mock('../Calculator', () => ({
  Calculator: ({ isOpen, onClose, onCalculate }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="calculator-modal">
        <div>Calculator Modal</div>
        <button onClick={() => onCalculate('1000')}>Calculate</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  },
}));

describe('CalculatorInputForm', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field with placeholder', () => {
    render(<CalculatorInputForm {...defaultProps} />);
    expect(screen.getByPlaceholderText('クリックして金額を入力')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<CalculatorInputForm {...defaultProps} placeholder="Custom placeholder" />);
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(<CalculatorInputForm {...defaultProps} value="1234" />);
    expect(screen.getByDisplayValue('1234')).toBeInTheDocument();
  });

  it('opens calculator modal when clicked', () => {
    render(<CalculatorInputForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('クリックして金額を入力');
    fireEvent.click(input);
    
    expect(screen.getByTestId('calculator-modal')).toBeInTheDocument();
  });

  it('calls onChange when calculator returns value', () => {
    render(<CalculatorInputForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('クリックして金額を入力');
    fireEvent.click(input);
    
    const calculateButton = screen.getByText('Calculate');
    fireEvent.click(calculateButton);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('1000');
  });

  it('closes modal when calculator calls onClose', () => {
    render(<CalculatorInputForm {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('クリックして金額を入力');
    fireEvent.click(input);
    
    expect(screen.getByTestId('calculator-modal')).toBeInTheDocument();
    
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    
    expect(screen.queryByTestId('calculator-modal')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CalculatorInputForm {...defaultProps} className="custom-input" />);
    const input = screen.getByPlaceholderText('クリックして金額を入力');
    expect(input).toHaveClass('custom-input');
  });
});
