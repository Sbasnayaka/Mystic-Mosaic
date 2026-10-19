import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function PixelButton({ children, variant = 'primary', className = '', ...props }: PixelButtonProps) {
  const baseStyles = "pixel-btn w-full md:w-auto text-center";
  const variants = {
    primary: "bg-accent text-white border-magic-900 dark:border-cosmic-950",
    secondary: "bg-magic-200 dark:bg-cosmic-800 text-magic-900 dark:text-magic-100 border-magic-900 dark:border-cosmic-800",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}