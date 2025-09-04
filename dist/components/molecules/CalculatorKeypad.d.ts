export interface CalculatorKeypadProps {
    onButtonClick: (val: string) => void;
    onEqual: () => void;
    onDecide: () => void;
    onTaxInclude: (rate: number) => void;
    onTaxExclude: (rate: number) => void;
}
export declare const CalculatorKeypad: ({ onButtonClick, onEqual, onDecide, onTaxInclude, onTaxExclude }: CalculatorKeypadProps) => import("react/jsx-runtime").JSX.Element;
