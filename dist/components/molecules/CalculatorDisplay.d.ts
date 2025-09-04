import type { RefObject } from 'react';
export interface CalculatorDisplayProps {
    value: string;
    error?: string;
    inputRef?: RefObject<HTMLDivElement>;
}
export declare const CalculatorDisplay: ({ value, error, inputRef }: CalculatorDisplayProps) => import("react/jsx-runtime").JSX.Element;
