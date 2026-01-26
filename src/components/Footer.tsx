import React from 'react';
import { PhoneIcon, ChevronDownIcon } from './Icons';

const styles = {
  footer: {
    backgroundColor: 'var(--surface-color-surface-low)',
    borderTop: '1px solid var(--component-card-outlined-color-card-outlined-enabled-border)',
    padding: 'var(--spacing-space-8) var(--spacing-space-24)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-12)',
    boxShadow: '0px -1.5px 5.5px 0px rgba(196,196,196,0.25)',
    width: '100%',
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    zIndex: 10,
  },
  chip: {
    backgroundColor: 'var(--component-chip-color-chip-enabled-fill)',
    borderRadius: 'var(--radius-radius-sm)',
    padding: '2px var(--spacing-space-4)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-4)',
  },
  chipContent: {
    padding: '3px var(--spacing-space-8)',
  },
  chipText: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '18px',
    letterSpacing: '0.15px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  icon: {
    width: '18px',
    height: '18px',
  },
};

export const Footer: React.FC = () => {
  return (
    <div style={styles.footer}>
      <div style={styles.chip}>
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 'var(--spacing-space-4)' }}>
           <PhoneIcon style={{ ...styles.icon, color: 'var(--color-content-high-emphasis)' }} />
        </div>
        <div style={styles.chipContent}>
          <p style={styles.chipText}>Twilio</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: 'var(--spacing-space-4)' }}>
           <ChevronDownIcon style={{ ...styles.icon, color: 'var(--color-content-high-emphasis)' }} />
        </div>
      </div>
    </div>
  );
};
