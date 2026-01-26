import React from 'react';

export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'success' | 'default' | 'warning' | 'error' | 'info' | 'neutral';
export type ChipSize = 'small' | 'default';
export type ChipRadius = 'default' | 'shaped';
export type ChipType = 'standard' | 'status' | 'choice';

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  radius?: ChipRadius;
  type?: ChipType;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onClick?: () => void;
  onDelete?: () => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

const getChipStyles = (
  variant: ChipVariant,
  color: ChipColor,
  size: ChipSize,
  radius: ChipRadius,
  type: ChipType,
  selected: boolean,
  disabled: boolean,
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s, box-shadow 0.2s',
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none',
    border: 'none',
  };

  // Size styles
  const sizeStyles: Record<ChipSize, React.CSSProperties> = {
    small: {
      fontSize: '14px',
      lineHeight: '18px',
      height: '24px',
      padding: hasLeadingIcon || hasTrailingIcon ? '3px 4px' : '3px 8px',
      letterSpacing: '0.15px',
    },
    default: {
      fontSize: '14px',
      lineHeight: '18px',
      height: '28px',
      padding: hasLeadingIcon || hasTrailingIcon ? '3px 4px' : '3px 8px',
      letterSpacing: '0.15px',
    },
  };

  // Radius styles
  const radiusStyles: Record<ChipRadius, React.CSSProperties> = {
    default: {
      borderRadius: '16px',
    },
    shaped: {
      borderRadius: '8px',
    },
  };

  // Status/Color-specific styles
  const colorStyles: Record<ChipVariant, Record<ChipColor, React.CSSProperties>> = {
    filled: {
      neutral: {
        backgroundColor: disabled ? 'rgba(25, 28, 29, 0.12)' : 'var(--component-chip-color-chip-enabled-fill, rgba(25, 28, 29, 0.12))',
        color: disabled ? 'rgba(25, 28, 29, 0.38)' : 'var(--text-color-text-primary, rgba(25, 28, 29, 0.87))',
      },
      default: {
        backgroundColor: disabled ? 'rgba(25, 28, 29, 0.12)' : 'var(--component-chip-color-chip-enabled-fill, rgba(25, 28, 29, 0.12))',
        color: disabled ? 'rgba(25, 28, 29, 0.38)' : 'var(--text-color-text-primary, rgba(25, 28, 29, 0.87))',
      },
      success: {
        backgroundColor: disabled ? 'rgba(46, 125, 50, 0.12)' : (selected ? 'rgba(46, 125, 50, 0.24)' : 'rgba(46, 125, 50, 0.12)'),
        color: disabled ? 'rgba(46, 125, 50, 0.38)' : '#2e7d32',
      },
      warning: {
        backgroundColor: disabled ? 'rgba(237, 108, 2, 0.12)' : (selected ? 'rgba(237, 108, 2, 0.24)' : 'rgba(237, 108, 2, 0.12)'),
        color: disabled ? 'rgba(237, 108, 2, 0.38)' : '#ed6c02',
      },
      error: {
        backgroundColor: disabled ? 'rgba(211, 47, 47, 0.12)' : (selected ? 'rgba(211, 47, 47, 0.24)' : 'rgba(211, 47, 47, 0.12)'),
        color: disabled ? 'rgba(211, 47, 47, 0.38)' : '#d32f2f',
      },
      info: {
        backgroundColor: disabled ? 'rgba(2, 136, 209, 0.12)' : (selected ? 'rgba(2, 136, 209, 0.24)' : 'rgba(2, 136, 209, 0.12)'),
        color: disabled ? 'rgba(2, 136, 209, 0.38)' : '#0288d1',
      },
    },
    outlined: {
      neutral: {
        backgroundColor: 'transparent',
        color: disabled ? 'rgba(25, 28, 29, 0.38)' : 'var(--text-color-text-primary, rgba(25, 28, 29, 0.87))',
        border: disabled ? '1px solid rgba(25, 28, 29, 0.12)' : '1px solid var(--component-color-divider, rgba(25, 28, 29, 0.12))',
      },
      default: {
        backgroundColor: 'transparent',
        color: disabled ? 'rgba(25, 28, 29, 0.38)' : 'var(--text-color-text-primary, rgba(25, 28, 29, 0.87))',
        border: disabled ? '1px solid rgba(25, 28, 29, 0.12)' : '1px solid var(--component-color-divider, rgba(25, 28, 29, 0.12))',
      },
      success: {
        backgroundColor: 'transparent',
        color: disabled ? 'rgba(46, 125, 50, 0.38)' : '#2e7d32',
        border: disabled ? '1px solid rgba(46, 125, 50, 0.12)' : '1px solid rgba(46, 125, 50, 0.5)',
      },
      warning: {
        backgroundColor: 'transparent',
        color: disabled ? 'rgba(237, 108, 2, 0.38)' : '#ed6c02',
        border: disabled ? '1px solid rgba(237, 108, 2, 0.12)' : '1px solid rgba(237, 108, 2, 0.5)',
      },
      error: {
        backgroundColor: 'transparent',
        color: disabled ? 'rgba(211, 47, 47, 0.38)' : '#d32f2f',
        border: disabled ? '1px solid rgba(211, 47, 47, 0.12)' : '1px solid rgba(211, 47, 47, 0.5)',
      },
      info: {
        backgroundColor: 'transparent',
        color: disabled ? 'rgba(2, 136, 209, 0.38)' : '#0288d1',
        border: disabled ? '1px solid rgba(2, 136, 209, 0.12)' : '1px solid rgba(2, 136, 209, 0.5)',
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...radiusStyles[radius],
    ...colorStyles[variant][color],
  };
};

const iconContainerStyles = (size: ChipSize, position: 'leading' | 'trailing'): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: position === 'leading' ? '4px' : '0',
  paddingRight: position === 'trailing' ? '4px' : '0',
});

const iconStyles = (size: ChipSize): React.CSSProperties => ({
  fontSize: size === 'small' ? '18px' : '18px',
  width: size === 'small' ? '18px' : '18px',
  height: size === 'small' ? '18px' : '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const labelStyles: React.CSSProperties = {
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'filled',
  color = 'default',
  size = 'default',
  radius = 'default',
  type = 'standard',
  leadingIcon,
  trailingIcon,
  onClick,
  onDelete,
  selected = false,
  disabled = false,
  className,
}) => {
  const hasLeadingIcon = !!leadingIcon;
  const hasTrailingIcon = !!trailingIcon || !!onDelete;

  const chipStyle = getChipStyles(
    variant,
    color,
    size,
    radius,
    type,
    selected,
    disabled,
    hasLeadingIcon,
    hasTrailingIcon
  );

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onDelete) {
      onDelete();
    }
  };

  return (
    <div
      style={chipStyle}
      className={className}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
    >
      {leadingIcon && (
        <div style={iconContainerStyles(size, 'leading')}>
          <div style={iconStyles(size)}>{leadingIcon}</div>
        </div>
      )}
      <div style={labelStyles}>{label}</div>
      {(trailingIcon || onDelete) && (
        <div style={iconContainerStyles(size, 'trailing')} onClick={onDelete ? handleDelete : undefined}>
          <div style={iconStyles(size)}>{trailingIcon}</div>
        </div>
      )}
    </div>
  );
};
