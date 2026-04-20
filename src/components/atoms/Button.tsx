import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className = '', type = 'button', ...props }: ButtonProps) => (
  <button
    className={`py-2 px-4 rounded-md font-bold focus:outline-none focus:ring-2 transition-colors ${className}`}
    type={type}
    {...props}
  >
    {children}
  </button>
); 
