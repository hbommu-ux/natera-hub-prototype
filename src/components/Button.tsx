import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

const getButtonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  disabled: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    fontFamily: 'var(--font-family-font-component)',
    fontWeight: 500,
    letterSpacing: '1.25px',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    border: 'none',
    outline: 'none',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  // Size-specific styles
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    small: {
      fontSize: '13px',
      lineHeight: '20px',
      padding: '4px 12px',
      minHeight: '32px',
    },
    medium: {
      fontSize: '14px',
      lineHeight: '24px',
      padding: '6px 16px',
      minHeight: '40px',
    },
    large: {
      fontSize: '15px',
      lineHeight: '26px',
      padding: '8px 20px',
      minHeight: '48px',
    },
  };

  // Variant-specific styles
  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    filled: {
      backgroundColor: 'var(--primary-color-primary-main)',
      color: 'var(--color-content-inverse)',
    },
    tonal: {
      backgroundColor: 'var(--component-button-color-button-tonal-fill)',
      color: 'var(--component-button-color-button-tonal-text)',
    },
    outlined: {
      backgroundColor: 'transparent',
      color: 'var(--primary-color-primary-main)',
      border: '1px solid var(--component-button-color-button-primary-outlined-border)',
    },
    text: {
      backgroundColor: 'transparent',
      color: 'var(--primary-color-primary-main)',
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

const getHoverStyles = (variant: ButtonVariant): React.CSSProperties => {
  const hoverStyles: Record<ButtonVariant, React.CSSProperties> = {
    filled: {
      backgroundColor: 'var(--primary-color-primary-dark)',
    },
    tonal: {
      backgroundColor: 'var(--component-button-color-button-tonal-fill-hover)',
    },
    outlined: {
      backgroundColor: 'var(--action-color-hovered)',
    },
    text: {
      backgroundColor: 'var(--action-color-hovered)',
    },
  };
  return hoverStyles[variant];
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'medium',
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const buttonStyle = {
    ...getButtonStyles(variant, size, fullWidth, disabled),
    ...(isHovered && !disabled ? getHoverStyles(variant) : {}),
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  return (
    <button
      style={buttonStyle}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {startIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{startIcon}</span>}
      {children}
      {endIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{endIcon}</span>}
    </button>
  );
};
