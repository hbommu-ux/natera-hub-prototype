import React from 'react';

interface ListItemDenseProps {
  label: string;
  title: string;
  className?: string;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    padding: '0 var(--spacing-space-8)',
    cursor: 'pointer',
  },
  label: {
    fontFamily: 'var(--font-family-font-component, Roboto, sans-serif)',
    fontSize: 'var(--font-size-font-size-500, 15px)',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-secondary)',
    paddingTop: 'var(--spacing-space-4)',
    width: '100%',
    margin: 0,
  },
  title: {
    fontFamily: 'var(--font-family-font-component, Roboto, sans-serif)',
    fontSize: 'var(--font-size-font-size-500, 15px)',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    paddingBottom: 'var(--spacing-space-4)',
    width: '100%',
    margin: 0,
  },
};

export const ListItemDense: React.FC<ListItemDenseProps> = ({ label, title, className }) => {
  return (
    <div style={styles.container} className={className}>
      <p style={styles.label}>{label}</p>
      <p style={styles.title}>{title}</p>
    </div>
  );
};
