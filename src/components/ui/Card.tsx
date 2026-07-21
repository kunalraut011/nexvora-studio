import React, { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  hoverShadowVariant?: 'primary' | 'success' | 'danger' | 'warning' | 'default';
  hasPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  interactive = false,
  hoverShadowVariant = 'primary',
  hasPadding = true,
  ...props
}) => {
  const shadowVariants = {
    primary: 'hover:shadow-[6px_6px_0px_0px_#7C3AED] hover:border-[rgba(255,255,255,0.24)]',
    success: 'hover:shadow-[6px_6px_0px_0px_#22C55E] hover:border-[rgba(255,255,255,0.24)]',
    danger: 'hover:shadow-[6px_6px_0px_0px_#EF4444] hover:border-[rgba(255,255,255,0.24)]',
    warning: 'hover:shadow-[6px_6px_0px_0px_#F59E0B] hover:border-[rgba(255,255,255,0.24)]',
    default: 'hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.25)] hover:border-[rgba(255,255,255,0.24)]'
  };

  return (
    <div
      className={cn(
        'bg-[#161616] border-2 border-[rgba(255,255,255,0.12)] rounded-[18px] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.12)] text-white transition-all duration-200 ease-out',
        hasPadding ? 'p-6' : '',
        interactive ? 'cursor-pointer hover:-translate-x-[2px] hover:-translate-y-[2px]' : '',
        interactive ? shadowVariants[hoverShadowVariant] : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
