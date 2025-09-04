import type { ButtonHTMLAttributes, ReactNode } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}
export declare const Button: ({ children, className, ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
