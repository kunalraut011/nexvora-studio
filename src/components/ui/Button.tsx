import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn'; // Let's define this helper later

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold border-2 border-white rounded-[18px] transition-all duration-100 ease-out cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px]';
  
  const variants = {
    primary: 'bg-primary text-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-[#8B5CF6]',
    success: 'bg-accent text-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-[#4ADE80]',
    danger: 'bg-danger text-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-[#F87171]',
    warning: 'bg-warning text-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:bg-[#FBBF24]',
    dark: 'bg-[#161616] text-white border-[rgba(255,255,255,0.12)] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.12)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.25)]',
    outline: 'bg-transparent text-white border-[rgba(255,255,255,0.25)] shadow-[3px_3px_0px_0px_rgba(255,255,255,0.05)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:border-white'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
