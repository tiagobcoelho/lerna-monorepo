import React from 'react';
import './styles/button.scss';
/**
 * Primary UI component for user interaction
 */
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    primary?: boolean;
    backgroundColor?: string;
    size: 'small' | 'medium' | 'large';
    label: string;
    onClick?: () => void;
}
export declare const Button: React.FC<ButtonProps>;
