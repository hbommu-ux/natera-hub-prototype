import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { ArrowDropDownIcon } from './Icons';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  searchable?: boolean;
}

const styles = {
  container: {
    position: 'relative' as const,
    display: 'inline-flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  label: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '0.15px',
    color: 'var(--text-color-text-secondary)',
    marginBottom: '4px',
  },
  selectButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minHeight: '48px',
    minWidth: '200px',
    outline: 'none',
  },
  selectButtonFocused: {
    borderColor: 'var(--primary-color-primary-main)',
    boxShadow: '0 0 0 1px var(--primary-color-primary-main)',
  },
  selectButtonError: {
    borderColor: 'var(--error-color-error-main)',
  },
  selectButtonDisabled: {
    backgroundColor: 'var(--action-color-disabled)',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  placeholder: {
    color: 'var(--text-color-text-secondary)',
  },
  dropdown: {
    position: 'absolute' as const,
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    backgroundColor: 'var(--surface-color-surface-lowest)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-md)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    maxHeight: '320px',
    overflowY: 'auto' as const,
    zIndex: 1000,
    marginTop: '4px',
  },
  searchContainer: {
    padding: '8px',
    borderBottom: '1px solid var(--component-color-divider)',
    position: 'sticky' as const,
    top: 0,
    backgroundColor: 'var(--surface-color-surface-lowest)',
    zIndex: 1,
  },
  searchInput: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
    outline: 'none',
  },
  option: {
    padding: '12px 16px',
    cursor: 'pointer',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    transition: 'background-color 0.2s ease',
  },
  optionHovered: {
    backgroundColor: 'var(--action-color-hovered)',
  },
  optionSelected: {
    backgroundColor: 'var(--action-color-selected)',
    fontWeight: 500,
  },
  helperText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    lineHeight: '16px',
    letterSpacing: '0.15px',
    marginTop: '4px',
  },
  helperTextNormal: {
    color: 'var(--text-color-text-secondary)',
  },
  helperTextError: {
    color: 'var(--error-color-error-main)',
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
};

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  placeholder = 'Select an option',
  label,
  onChange,
  disabled = false,
  error = false,
  helperText,
  fullWidth = false,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = searchable && searchTerm
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setIsFocused(!isOpen);
      if (!isOpen) {
        setSearchTerm('');
      }
    }
  };

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
    setIsFocused(false);
    setSearchTerm('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsFocused(false);
    setSearchTerm('');
  };

  const containerStyle = {
    ...styles.container,
    width: fullWidth ? '100%' : 'auto',
  };

  const buttonStyle = {
    ...styles.selectButton,
    ...(isFocused ? styles.selectButtonFocused : {}),
    ...(error ? styles.selectButtonError : {}),
    ...(disabled ? styles.selectButtonDisabled : {}),
    width: fullWidth ? '100%' : 'auto',
  };

  return (
    <>
      {isOpen && <div style={styles.overlay} onClick={handleClose} />}
      <div ref={selectRef} style={containerStyle}>
        {label && <label style={styles.label}>{label}</label>}
        
        <button
          type="button"
          style={buttonStyle}
          onClick={handleToggle}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !isOpen && setIsFocused(false)}
        >
          <span style={selectedOption ? {} : styles.placeholder}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ArrowDropDownIcon
            style={{
              width: '24px',
              height: '24px',
              color: 'var(--text-color-text-secondary)',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>

        {isOpen && (
          <div style={styles.dropdown}>
            {searchable && (
              <div style={styles.searchContainer}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={styles.searchInput}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === value;
                const isHovered = hoveredIndex === index;
                
                const optionStyle = {
                  ...styles.option,
                  ...(isHovered && !isSelected ? styles.optionHovered : {}),
                  ...(isSelected ? styles.optionSelected : {}),
                };

                return (
                  <div
                    key={option.value}
                    style={optionStyle}
                    onClick={() => handleSelect(option.value)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {option.label}
                  </div>
                );
              })
            ) : (
              <div style={{ ...styles.option, cursor: 'default', color: 'var(--text-color-text-secondary)' }}>
                No options found
              </div>
            )}
          </div>
        )}

        {helperText && (
          <span
            style={{
              ...styles.helperText,
              ...(error ? styles.helperTextError : styles.helperTextNormal),
            }}
          >
            {helperText}
          </span>
        )}
      </div>
    </>
  );
};
