export interface CalculatorProps {
    isOpen: boolean;
    onClose: () => void;
    onCalculate: (value: string) => void;
    initialValue?: string;
    initialDescription?: string;
    personName?: string;
    isDetailMode?: boolean;
}
export declare const Calculator: ({ isOpen, onClose, onCalculate, initialValue, initialDescription, personName, isDetailMode, }: CalculatorProps) => import("react").ReactPortal | null;
