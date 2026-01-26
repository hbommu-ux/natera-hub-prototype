import React, { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';

export type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';

interface SnackbarProps {
  open: boolean;
  message: string;
  severity?: SnackbarSeverity;
  autoHideDuration?: number;
  onClose: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1300,
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-12)',
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    borderRadius: 'var(--radius-radius-sm)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '300px',
    maxWidth: '500px',
    animation: 'slideUp 0.3s ease',
  },
  success: {
    backgroundColor: '#1b5e20',
    color: '#ffffff',
  },
  error: {
    backgroundColor: '#c62828',
    color: '#ffffff',
  },
  warning: {
    backgroundColor: '#e65100',
    color: '#ffffff',
  },
  info: {
    backgroundColor: '#0277bd',
    color: '#ffffff',
  },
  icon: {
    width: '24px',
    height: '24px',
    flexShrink: 0,
  },
  message: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    flex: 1,
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    padding: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
    opacity: 0.7,
    transition: 'opacity 0.2s ease',
    borderRadius: '4px',
  },
  hidden: {
    display: 'none',
  },
};

// Add keyframes for animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
`;
if (!document.querySelector('style[data-snackbar-styles]')) {
  styleSheet.setAttribute('data-snackbar-styles', 'true');
  document.head.appendChild(styleSheet);
}

const severityIcons: Record<SnackbarSeverity, React.ReactNode> = {
  success: <CheckCircleIcon style={styles.icon} />,
  error: <ErrorIcon style={styles.icon} />,
  warning: <WarningIcon style={styles.icon} />,
  info: <InfoIcon style={styles.icon} />,
};

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity = 'success',
  autoHideDuration = 4000,
  onClose,
}) => {
  useEffect(() => {
    if (open && autoHideDuration) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div style={{ ...styles.container, ...styles[severity] }}>
      {severityIcons[severity]}
      <p style={styles.message}>{message}</p>
      <button
        style={styles.closeButton}
        onClick={onClose}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.opacity = '0.7';
        }}
      >
        <CloseIcon style={{ width: '20px', height: '20px' }} />
      </button>
    </div>
  );
};
