import React, { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'neutral' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-[10px] text-xs font-bold border-2 leading-none';
  
  const variants = {
    primary: 'bg-primary/20 text-primary border-primary',
    success: 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]',
    danger: 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]',
    warning: 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]',
    neutral: 'bg-white/10 text-white border-white/20',
    outline: 'bg-transparent text-white border-white/20'
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
