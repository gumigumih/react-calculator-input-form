import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calculator } from '../Calculator';

describe('Calculator', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    onCalculate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('focuses the numeric input when opened', async () => {
    render(<Calculator {...defaultProps} />);

    const input = await screen.findByPlaceholderText('数値を入力');

    await waitFor(() => {
      expect(input).toHaveFocus();
    });
  });

  it('calculates a value typed directly into the focused input', async () => {
    render(<Calculator {...defaultProps} />);

    const input = await screen.findByPlaceholderText('数値を入力');
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(screen.getByText('決定'));

    expect(defaultProps.onCalculate).toHaveBeenCalledWith('123');
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('uses the current input value when deciding before state catches up', async () => {
    render(<Calculator {...defaultProps} />);

    const input = await screen.findByPlaceholderText('数値を入力') as globalThis.HTMLInputElement;
    input.value = '456';
    fireEvent.click(screen.getByText('決定'));

    expect(defaultProps.onCalculate).toHaveBeenCalledWith('456');
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('starts a new operand after typing an operator in the focused input', async () => {
    const user = userEvent.setup();
    render(<Calculator {...defaultProps} />);

    const input = await screen.findByPlaceholderText('数値を入力');
    await user.type(input, '123+45');
    fireEvent.click(screen.getByText('決定'));

    expect(defaultProps.onCalculate).toHaveBeenCalledWith('168');
  });

  it('calculates basic arithmetic without eval', async () => {
    render(<Calculator {...defaultProps} />);

    fireEvent.click(await screen.findByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByPlaceholderText('数値を入力')).toHaveValue('3');
  });

  it('chains operations left to right', async () => {
    render(<Calculator {...defaultProps} />);

    fireEvent.click(await screen.findByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.keyDown(window, { key: '*' });
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('決定'));

    expect(defaultProps.onCalculate).toHaveBeenCalledWith('9');
  });

  it('shows an error when deciding without input', async () => {
    render(<Calculator {...defaultProps} />);

    fireEvent.click(await screen.findByText('決定'));

    expect(defaultProps.onCalculate).not.toHaveBeenCalled();
    expect(screen.getByText('金額を入力してください')).toBeInTheDocument();
  });

  it('supports division and decimal values', async () => {
    render(<Calculator {...defaultProps} />);

    fireEvent.click(await screen.findByText('1'));
    fireEvent.keyDown(window, { key: '/' });
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('決定'));

    expect(defaultProps.onCalculate).toHaveBeenCalledWith('0.4');
  });

  it('returns 0 for division by zero', async () => {
    render(<Calculator {...defaultProps} />);

    fireEvent.click(await screen.findByText('1'));
    fireEvent.keyDown(window, { key: '/' });
    fireEvent.keyDown(window, { key: '0' });
    fireEvent.click(screen.getByText('決定'));

    expect(defaultProps.onCalculate).toHaveBeenCalledWith('0');
  });
});
