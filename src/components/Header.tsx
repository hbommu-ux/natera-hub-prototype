import React from 'react';
import { ASSETS } from './assets';
import { MenuIcon, AddIcon, SearchIcon } from './Icons';

const styles = {
  header: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    display: 'flex',
    flexWrap: 'nowrap' as const,
    alignItems: 'center',
    padding: 'var(--spacing-space-16) 0',
    width: '100%',
    position: 'relative' as const,
    borderBottom: '1px solid var(--component-color-divider)',
  },
  drawerIconContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 'var(--spacing-space-16)',
    flexShrink: 0,
  },
  iconButton: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-space-12)',
    borderRadius: 'var(--radius-radius-circle)',
  },
  content: {
    display: 'flex',
    flex: '1 0 0',
    gap: 'var(--spacing-space-16)',
    alignItems: 'center',
    padding: 'var(--spacing-space-8) var(--spacing-space-24)',
    minWidth: 0,
  },
  logoContainer: {
    display: 'flex',
    gap: 'var(--spacing-space-8)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-space-4)',
  },
  logo: {
    height: '32px',
    width: 'auto',
  },
  actionArea: {
    display: 'flex',
    flexWrap: 'nowrap' as const,
    gap: 'var(--spacing-space-16)',
    alignItems: 'center',
    paddingRight: 'var(--spacing-space-16)',
    flexShrink: 0,
  },
  createButton: {
    backgroundColor: 'var(--primary-color-primary-main)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px var(--spacing-space-16) 6px var(--spacing-space-12)',
    borderRadius: 'var(--radius-radius-sm)',
    boxShadow: '0px 0.25px 1px 0px rgba(0,0,0,0.04), 0px 0.85px 3px 0px rgba(0,0,0,0.19)',
  },
  createButtonContent: {
    display: 'flex',
    gap: 'var(--spacing-space-8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '1.25px',
    color: 'var(--primary-color-primary-on-primary)',
    textTransform: 'uppercase' as const,
    margin: 0,
  },
  searchBar: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    width: '300px',
    border: 'none',
    background: 'none',
    padding: 0,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-space-4) var(--spacing-space-8) var(--spacing-space-4) var(--spacing-space-16)',
    width: '100%',
    position: 'relative' as const,
    backgroundColor: '#f1f3f4', // Assuming search bg from image or fallback
    borderRadius: '4px', // Estimated
  },
  searchInputContainer: {
    display: 'flex',
    flex: '1 0 0',
    gap: 'var(--spacing-space-8)',
    alignItems: 'center',
    padding: '10px 0',
  },
  searchText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-tertiary)',
    margin: 0,
    lineHeight: '20px',
  },
  userProfile: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  userInfo: {
    display: 'flex',
    gap: 'var(--spacing-space-12)',
    alignItems: 'center',
    paddingLeft: 'var(--spacing-space-16)',
    paddingRight: 'var(--spacing-space-8)',
  },
  avatar: {
    backgroundColor: 'var(--surface-color-surface-medium)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-radius-circle)',
    width: '40px',
    height: '40px',
    position: 'relative' as const,
  },
  avatarText: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
    textAlign: 'center' as const,
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
  },
  userName: {
    margin: 0,
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
    lineHeight: '20px',
  },
  userRole: {
    margin: 0,
    fontSize: '12px',
    color: 'var(--text-color-text-secondary)',
    lineHeight: '16px',
    letterSpacing: '0.4px',
  },
};

export const Header: React.FC = () => {
  return (
    <div style={styles.header}>
      <div style={styles.drawerIconContainer}>
        <div style={styles.iconButton}>
          <MenuIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.logoContainer}>
          <img src={ASSETS.nateraHubLogo} alt="Natera Hub" style={styles.logo} />
        </div>
      </div>

      <div style={styles.actionArea}>
        <div style={styles.createButton}>
          <div style={styles.createButtonContent}>
            <AddIcon style={{ width: '18px', height: '18px', color: '#ffffff' }} />
            <p style={styles.createButtonText}>CREATE</p>
          </div>
        </div>

        <button style={styles.searchBar}>
          <div style={styles.searchContainer}>
            <div style={{ display: 'flex', flex: '1 0 0', alignItems: 'center' }}>
                <div style={{ paddingRight: '12px' }}>
                     <SearchIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
                </div>
                <div style={styles.searchInputContainer}>
                    <p style={styles.searchText}>Search</p>
                </div>
            </div>
          </div>
        </button>

        <div style={styles.userProfile}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              <p style={styles.avatarText}>A</p>
            </div>
            <div style={styles.userDetails}>
              <p style={styles.userName}>Carl Sainz</p>
              <p style={styles.userRole}>Patient Co-ordinator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
