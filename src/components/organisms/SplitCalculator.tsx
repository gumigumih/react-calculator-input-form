import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../atoms/Icon';
import { SplitKeypad } from '../molecules/SplitKeypad';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
// CSSは外部で読み込む必要があります
// import '../styles/calculator.css';

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

function formatNumber(value: string) {
  if (!value) return '';
  const parts = value.split('.');
  const integerPart = parts[0].replace(/,/g, '');
  const decimalPart = parts[1];
  const formattedInt = integerPart ? Number(integerPart).toLocaleString() : '0';
  return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
}

function normalizeNumberString(num: number, maxFractionDigits: number = 6) {
  if (!isFinite(num)) return '0';
  const fixed = num.toFixed(maxFractionDigits);
  const trimmed = fixed.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  return trimmed;
}

function calculateExpression(expr: string): string {
  try {
    const sanitized = expr.replace(/,/g, '').replace(/×/g, '*').replace(/÷/g, '/');
    // eslint-disable-next-line no-eval
    const result = eval(sanitized);
    if (isNaN(result) || !isFinite(result)) return '0';
    return normalizeNumberString(result);
  } catch {
    return '0';
  }
}

export const SplitCalculator = ({
  isOpen,
  onClose,
  onCalculate,
  initialParticipants = [],
}: SplitCalculatorProps) => {
  const [participants, setParticipants] = useState<Participant[]>(
    initialParticipants.length > 0 ? initialParticipants : [
      { id: '1', name: 'Aさん', amount: '0' },
      { id: '2', name: 'Bさん', amount: '0' }
    ]
  );
  const [selectedParticipantId, setSelectedParticipantId] = useState<string | null>(null);
  const [input, setInput] = useState('0');

  useEffect(() => {
    if (isOpen) {
      setParticipants(initialParticipants.length > 0 ? initialParticipants : [
        { id: '1', name: 'Aさん', amount: '0' },
        { id: '2', name: 'Bさん', amount: '0' }
      ]);
      setSelectedParticipantId(null);
      setInput('0');
    }
  }, [isOpen, initialParticipants]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      const activeElement = document.activeElement as HTMLElement | null;
      if (activeElement && activeElement.tagName === 'INPUT') return;
      
      if (e.key >= '0' && e.key <= '9') {
        handleButtonClick(e.key);
        e.preventDefault();
      } else if (e.key === '.') {
        handleButtonClick('.');
        e.preventDefault();
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleButtonClick(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
        e.preventDefault();
      } else if (e.key === 'Backspace') {
        handleButtonClick('←');
        e.preventDefault();
      } else if (e.key === 'Enter' || e.key === '=') {
        handleDecide();
        e.preventDefault();
      } else if (e.key === 'Escape') {
        onClose();
        e.preventDefault();
      } else if (e.key === 'c' || e.key === 'C') {
        handleButtonClick('C');
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, input, participants]);

  const handleButtonClick = (val: string) => {
    if (!selectedParticipantId) return;
    
    if (val === 'C') {
      setInput('0');
    } else if (val === '←') {
      setInput((prev) => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else if (val === '.') {
      setInput((prev) => {
        if (!prev || prev === '0') return '0.';
        const lastSegment = prev.split(/[+\-×÷]/).pop() || '';
        if (lastSegment.includes('.')) return prev;
        return prev + '.';
      });
    } else if (['+', '-', '×', '÷'].includes(val)) {
      if (!input || /[+\-×÷]$/.test(input)) return;
      setInput((prev) => prev + val);
    } else {
      setInput((prev) => (prev === '0' ? val : prev + val));
    }
  };

  const handleEqual = () => {
    if (!input || !selectedParticipantId) return;
    const result = calculateExpression(input);
    setInput(result);
  };

  const handleDecide = () => {
    if (!selectedParticipantId) return;
    
    const result = calculateExpression(input);
    setParticipants(prev => 
      prev.map(p => 
        p.id === selectedParticipantId 
          ? { ...p, amount: result }
          : p
      )
    );
    setSelectedParticipantId(null);
    setInput('0');
  };

  const handleParticipantSelect = (participantId: string) => {
    const participant = participants.find(p => p.id === participantId);
    if (participant) {
      setSelectedParticipantId(participantId);
      setInput(participant.amount === '0' ? '0' : participant.amount);
    }
  };

  const handleClearParticipant = (participantId: string) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === participantId 
          ? { ...p, amount: '0' }
          : p
      )
    );
  };

  const addParticipant = () => {
    const newId = String(participants.length + 1);
    const newName = String.fromCharCode(65 + participants.length) + 'さん';
    setParticipants(prev => [...prev, { id: newId, name: newName, amount: '0' }]);
  };

  const removeParticipant = (participantId: string) => {
    if (participants.length <= 2) return;
    setParticipants(prev => prev.filter(p => p.id !== participantId));
    if (selectedParticipantId === participantId) {
      setSelectedParticipantId(null);
      setInput('0');
    }
  };

  const calculateResults = () => {
    const total = participants.reduce((sum, p) => sum + parseFloat(p.amount || '0'), 0);
    const perPerson = total / participants.length;
    onCalculate(participants, total, perPerson);
  };

  const totalAmount = participants.reduce((sum, p) => sum + parseFloat(p.amount || '0'), 0);

  if (!isOpen) return null;

  const modal = (
    <div className="calculator-overlay">
      {/* Background Pattern */}
      <div className="calculator-background-pattern">
        <div>
          <div className="calculator-pattern-item">¥</div>
          <div className="calculator-pattern-item">🛒</div>
          <div className="calculator-pattern-item">💳</div>
          <div className="calculator-pattern-item">🧮</div>
          <div className="calculator-pattern-item">✈️</div>
          <div className="calculator-pattern-item">👥</div>
        </div>
      </div>

      <div className="calculator-modal">
        {/* Header */}
        <div className="calculator-header">
          <div className="calculator-logo-container">
            <div className="calculator-logo">
              <span className="calculator-logo-text">¥</span>
            </div>
            <div>
              <h1 className="calculator-title">わりまる</h1>
              <p className="calculator-subtitle">飲み会や旅行の支払いを簡単に計算</p>
            </div>
          </div>
          <button onClick={onClose} className="calculator-close-button">
            <Icon icon={faTimes} className="w-6 h-6" />
          </button>
        </div>

        {/* Participants */}
        <div className="calculator-participants">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className={`calculator-participant-row ${
                selectedParticipantId === participant.id ? 'selected' : ''
              }`}
              onClick={() => handleParticipantSelect(participant.id)}
            >
              <div className="calculator-participant-info">
                <span className="calculator-participant-name">{participant.name}</span>
              </div>
              <div className="calculator-participant-amount">
                <span className="calculator-amount-text">
                  {formatNumber(participant.amount)}
                </span>
                <span className="calculator-currency">円</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearParticipant(participant.id);
                  }}
                  className="calculator-clear-button"
                >
                  <Icon icon={faTrash} className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add/Remove Participant Buttons */}
          <div className="calculator-participant-controls">
            <button
              onClick={addParticipant}
              className="calculator-add-button"
            >
              参加者を追加
            </button>
            {participants.length > 2 && (
              <button
                onClick={() => removeParticipant(participants[participants.length - 1].id)}
                className="calculator-remove-button"
              >
                削除
              </button>
            )}
          </div>
        </div>

        {/* Calculator Keypad */}
        {selectedParticipantId && (
          <div className="calculator-keypad-section">
            <div className="calculator-display">
              <div className="calculator-display-input">
                {formatNumber(input)}
              </div>
            </div>
            <SplitKeypad
              onButtonClick={handleButtonClick}
              onEqual={handleEqual}
              onDecide={handleDecide}
            />
          </div>
        )}

        {/* Total and Calculate Button */}
        <div className="calculator-total-section">
          <div className="calculator-total-row">
            <span className="calculator-total-label">合計金額</span>
            <span className="calculator-total-amount">
              {formatNumber(String(totalAmount))}円
            </span>
          </div>
          <button
            onClick={calculateResults}
            className="calculator-calculate-button"
          >
            計算結果を見る
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};
