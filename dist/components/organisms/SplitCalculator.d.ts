interface Participant {
    id: string;
    name: string;
    amount: string;
}
interface SplitCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
    onCalculate: (participants: Participant[], total: number, perPerson: number) => void;
    initialParticipants?: Participant[];
}
export declare const SplitCalculator: ({ isOpen, onClose, onCalculate, initialParticipants, }: SplitCalculatorProps) => import("react").ReactPortal | null;
export {};
