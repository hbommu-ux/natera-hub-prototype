import React, { useState } from 'react';
import { SideDrawer } from './SideDrawer';
import { Button } from './Button';
import { Chip } from './Chip';
import { OrderKitPanel } from './OrderKitPanel';

interface BloodCollectionPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Address {
  id: string;
  line1: string;
  line2: string;
  isPrimary?: boolean;
}

interface BloodDrawMethod {
  id: string;
  title: string;
  description: string;
  closestLocation?: string;
  distance?: string;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-16)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 'var(--spacing-space-12)',
  },
  sectionTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: '0.1px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  sectionNumber: {
    marginRight: 'var(--spacing-space-4)',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 'var(--spacing-space-4)',
    borderRadius: 'var(--radius-radius-sm)',
    color: 'var(--primary-color-primary-main)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '1.4px',
    textTransform: 'uppercase',
    transition: 'background-color 0.2s ease',
  },
  addressList: {
    backgroundColor: 'var(--surface-color-surface-low)',
    borderRadius: 'var(--radius-radius-md)',
    padding: 'var(--spacing-space-8)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
  },
  addressItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-space-8)',
    padding: 'var(--spacing-space-8)',
    borderRadius: 'var(--radius-radius-md)',
    cursor: 'pointer',
  },
  selectedAddress: {
    backgroundColor: 'var(--surface-color-surface-low)',
  },
  radioButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '7px',
  },
  radioIcon: {
    width: '18px',
    height: '18px',
  },
  addressContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
  },
  addressText: {
    flex: 1,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  showMoreButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 'var(--spacing-space-4)',
    color: 'var(--primary-color-primary-main)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '1.4px',
    textTransform: 'uppercase',
    marginTop: 'var(--spacing-space-8)',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--component-color-divider)',
    margin: 'var(--spacing-space-16) 0',
  },
  methodsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-12)',
  },
  methodCard: {
    backgroundColor: 'var(--component-card-outlined-color-card-outlined-enabled-fill)',
    border: '1px solid var(--component-card-outlined-color-card-outlined-enabled-border)',
    borderRadius: 'var(--radius-radius-md)',
    padding: 'var(--spacing-space-16)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-8)',
  },
  methodHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-12)',
  },
  methodIcon: {
    width: '48px',
    height: '48px',
    backgroundColor: 'var(--content-color-content-lowest-emphasis)',
    borderRadius: 'var(--radius-radius-xs)',
  },
  methodContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-2)',
  },
  methodTitleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--spacing-space-8)',
  },
  methodTitle: {
    flex: 1,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0.15px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  methodDescription: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  locationInfo: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  findLinkContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 'var(--spacing-space-12)',
  },
  findLink: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-link)',
    textDecoration: 'underline',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    margin: 0,
  },
};

const AddIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const ChevronDownIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
);

const ArrowForwardIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

export const BloodCollectionPanel: React.FC<BloodCollectionPanelProps> = ({ isOpen, onClose }) => {
  const [selectedAddressId, setSelectedAddressId] = useState('1');
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [orderKitPanelOpen, setOrderKitPanelOpen] = useState(false);

  const addresses: Address[] = [
    { id: '1', line1: '1257 Maplewood Dr, Apt 4B', line2: 'Seattle, WA 98102', isPrimary: true },
    { id: '2', line1: '1257 Maplewood Dr, Apt 4B', line2: 'Seattle, WA 98102' },
    { id: '3', line1: '1257 Maplewood Dr, Apt 4B', line2: 'Seattle, WA 98102' },
    { id: '4', line1: '1257 Maplewood Dr, Apt 4B', line2: 'Seattle, WA 98102' },
  ];

  const bloodDrawMethods: BloodDrawMethod[] = [
    {
      id: '1',
      title: 'Draw at Home',
      description: 'For patients who plan to have their blood drawn from a licensed phlebotomist at home',
    },
    {
      id: '2',
      title: 'Draw at Patient Service Center',
      description: 'Closest PSC:',
      closestLocation: 'Natera Patient Service Center - Kirkland',
      distance: '3.89 miles from the patient\'s address',
    },
    {
      id: '3',
      title: 'Draw at Preferred Lab',
      description: 'Closest lab:',
      closestLocation: 'MD Lab Solutions (MOMs)',
      distance: '0.45 miles from the patient\'s address',
    },
    {
      id: '4',
      title: 'Draw at Clinic',
      description: 'For patients who plan to have their blood drawn with their provider',
    },
  ];

  const visibleAddresses = showAllAddresses ? addresses : addresses.slice(0, 1);

  return (
    <SideDrawer isOpen={isOpen} onClose={onClose} title="Blood Collection" width="512px">
      <div style={styles.container}>
        {/* Section 1: Select an Address */}
        <div>
          <div style={styles.sectionHeader}>
            <p style={styles.sectionTitle}>
              <span style={styles.sectionNumber}>1.</span>
              Select an Address
            </p>
            <button
              style={styles.addButton}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              <AddIcon />
              ADD ADDRESS
            </button>
          </div>

          <div style={styles.addressList}>
            {visibleAddresses.map((address) => (
              <div
                key={address.id}
                style={{
                  ...styles.addressItem,
                  ...(selectedAddressId === address.id ? styles.selectedAddress : {}),
                }}
                onClick={() => setSelectedAddressId(address.id)}
              >
                <div style={styles.radioButton}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={styles.radioIcon}>
                    {selectedAddressId === address.id ? (
                      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="var(--primary-color-primary-main)" />
                    ) : (
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="var(--text-color-text-secondary)" />
                    )}
                  </svg>
                </div>
                <div style={styles.addressContent}>
                  <p style={styles.addressText}>
                    {address.line1}
                    <br />
                    {address.line2}
                  </p>
                  {address.isPrimary && <Chip label="Primary" size="small" />}
                </div>
              </div>
            ))}
          </div>

          {!showAllAddresses && addresses.length > 1 && (
            <button
              style={styles.showMoreButton}
              onClick={() => setShowAllAddresses(true)}
            >
              SHOW MORE
              <ChevronDownIcon />
            </button>
          )}
        </div>

        <div style={styles.divider} />

        {/* Section 2: Choose a blood draw method */}
        <div>
          <div style={styles.sectionHeader}>
            <p style={styles.sectionTitle}>
              <span style={styles.sectionNumber}>2.</span>
              Choose a blood draw method for this patient
            </p>
          </div>

          <div style={styles.methodsContainer}>
            {bloodDrawMethods.map((method) => (
              <div key={method.id} style={styles.methodCard}>
                <div style={styles.methodHeader}>
                  <div style={styles.methodIcon} />
                  <div style={styles.methodContent}>
                    <div style={styles.methodTitleRow}>
                      <p style={styles.methodTitle}>{method.title}</p>
                      <Button 
                        variant="text" 
                        size="small" 
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => {
                          if (method.id === '1') {
                            setOrderKitPanelOpen(true);
                          }
                        }}
                      >
                        PROCEED
                      </Button>
                    </div>
                    <p style={styles.methodDescription}>{method.description}</p>
                    {method.closestLocation && (
                      <>
                        <p style={styles.locationInfo}><strong>{method.closestLocation}</strong></p>
                        <p style={styles.locationInfo}>{method.distance}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.findLinkContainer}>
            <button style={styles.findLink}>
              Find another Natera PSC or Preferred Lab
            </button>
          </div>
        </div>
      </div>

      {/* Order Kit Panel - Opens when Draw at Home is selected */}
      <OrderKitPanel
        isOpen={orderKitPanelOpen}
        onClose={() => setOrderKitPanelOpen(false)}
        onBack={() => setOrderKitPanelOpen(false)}
      />
    </SideDrawer>
  );
};
