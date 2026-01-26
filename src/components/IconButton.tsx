import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonSize = 'small' | 'medium' | 'large';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
  children: ReactNode;
  ariaLabel?: string;
}

const getIconButtonStyles = (size: IconButtonSize, disabled: boolean): React.CSSProperties => {
  const sizeMap: Record<IconButtonSize, React.CSSProperties> = {
    small: {
      width: '32px',
      height: '32px',
      padding: '4px',
    },
    medium: {
      width: '40px',
      height: '40px',
      padding: '8px',
    },
    large: {
      width: '48px',
      height: '48px',
      padding: '12px',
    },
  };

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-radius-circle)',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s ease',
    opacity: disabled ? 0.6 : 1,
    outline: 'none',
    ...sizeMap[size],
  };
};

export const IconButton: React.FC<IconButtonProps> = ({
  size = 'medium',
  disabled = false,
  children,
  ariaLabel,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const buttonStyle = {
    ...getIconButtonStyles(size, disabled),
    backgroundColor: isHovered && !disabled ? 'var(--action-color-hovered)' : 'transparent',
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
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
};
