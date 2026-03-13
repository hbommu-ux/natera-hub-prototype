import React, { useState } from 'react';
import { SideDrawer } from './SideDrawer';
import { Button } from './Button';
import Checkbox from '@mui/material/Checkbox';
import { OrderConfirmationPanel } from './OrderConfirmationPanel';

interface OrderKitPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}

interface Test {
  id: string;
  name: string;
  selected: boolean;
}

interface Address {
  id: string;
  line1: string;
  line2: string;
}

interface ShipmentMethod {
  id: string;
  type: string;
  duration: string;
  dateRange: string;
}

interface PatientCoordinator {
  id: string;
  name: string;
  title: string;
  isMe?: boolean;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-16)',
    height: '100%',
  },
  scrollContainer: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-16)',
  },
  section: {
    border: '1px solid var(--component-card-outlined-color-card-outlined-enabled-border)',
    borderRadius: 'var(--radius-radius-md)',
    padding: 'var(--spacing-space-12)',
    paddingBottom: 'var(--spacing-space-8)',
  },
  sectionNoBorder: {
    padding: 0,
  },
  sectionHeaderNoBorder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: 'var(--spacing-space-12)',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 'var(--spacing-space-12)',
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
    flex: 1,
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
  checkboxList: {
    padding: 'var(--spacing-space-8)',
    display: 'flex',
    flexDirection: 'column',
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-4)',
    width: '100%',
  },
  checkboxLabel: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  addressItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-space-4)',
    padding: 'var(--spacing-space-8)',
    cursor: 'pointer',
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
  shipmentOption: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '4px',
    padding: 'var(--spacing-space-8)',
    cursor: 'pointer',
  },
  shipmentInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-2)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
  },
  shipmentText: {
    margin: 0,
  },
  typeaheadContainer: {
    position: 'relative' as const,
    width: '100%',
  },
  typeaheadInput: {
    width: '100%',
    padding: '12px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 'var(--radius-radius-md)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s ease',
    backgroundColor: 'var(--surface-color-surface-lowest)',
  },
  typeaheadInputFocused: {
    borderColor: 'var(--primary-color-primary-main)',
  },
  typeaheadDropdown: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '4px',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-md)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    maxHeight: '240px',
    overflowY: 'auto' as const,
    zIndex: 1000,
  },
  typeaheadOption: {
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  typeaheadOptionHovered: {
    backgroundColor: 'var(--action-color-hovered)',
  },
  typeaheadOptionName: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  typeaheadOptionTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    lineHeight: '18px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  typeaheadSeparator: {
    color: 'var(--text-color-text-secondary)',
    margin: '0 4px',
  },
  typeaheadSelectedValue: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 'var(--radius-radius-md)',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    cursor: 'pointer',
    transition: 'border-color 0.2s ease',
  },
  typeaheadSelectedText: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
  },
  clearButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--text-color-text-secondary)',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',
  },
  notesSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-12)',
  },
  notesTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: '0.1px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
    paddingTop: 'var(--spacing-space-12)',
    paddingBottom: 'var(--spacing-space-12)',
  },
  textarea: {
    width: '100%',
    height: '80px',
    padding: 'var(--spacing-space-12)',
    border: '1px solid var(--component-input-outlined-color-input-outlined-enabled-border)',
    borderRadius: 'var(--radius-radius-md)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    resize: 'none',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textareaPlaceholder: {
    color: 'var(--text-color-text-tertiary)',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-16)',
  },
  headerWithBack: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
  },
  backButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    color: 'var(--text-color-text-primary)',
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

const ChevronLeftIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const CloseIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const OrderKitPanel: React.FC<OrderKitPanelProps> = ({ isOpen, onClose, onBack }) => {
  const [tests, setTests] = useState<Test[]>([
    { id: '1', name: 'Signatera #1', selected: true },
    { id: '2', name: 'Altera', selected: true },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState('1');
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const [selectedShipmentId, setSelectedShipmentId] = useState('rush');

  const [notes, setNotes] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPC, setSelectedPC] = useState<PatientCoordinator | null>({
    id: '1',
    name: 'Jordan Whitaker',
    title: 'Patient Coordinator',
    isMe: true,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const patientCoordinators: PatientCoordinator[] = [
    { id: '1', name: 'Jordan Whitaker', title: 'Patient Coordinator', isMe: true },
    { id: '2', name: 'Sarah Johnson', title: 'Senior Patient Coordinator' },
    { id: '3', name: 'Michael Chen', title: 'Patient Coordinator' },
    { id: '4', name: 'Emily Rodriguez', title: 'Lead Patient Coordinator' },
    { id: '5', name: 'David Thompson', title: 'Patient Coordinator' },
    { id: '6', name: 'Amanda Wilson', title: 'Senior Patient Coordinator' },
  ];

  const addresses: Address[] = [
    { id: '1', line1: '1257 MAPLEWOOD DRIVE, UNIT 4B', line2: 'SEATTLE, WA 98102' },
    { id: '2', line1: '456 Oak Street, Suite 200', line2: 'Seattle, WA 98103' },
    { id: '3', line1: '789 Pine Avenue', line2: 'Seattle, WA 98104' },
  ];

  const shipmentMethods: ShipmentMethod[] = [
    { id: 'rush', type: 'Rush (1-2 Business days)', duration: 'Rush (1-2 Business days)', dateRange: 'Friday, Feb 14 - Monday Feb 17' },
    { id: 'ground', type: 'Ground  (3 - 5 Business Days)', duration: 'Ground  (3 - 5 Business Days)', dateRange: 'Tuesday, Feb 18 - Thursday Feb 20' },
  ];

  const handleTestToggle = (testId: string) => {
    setTests(tests.map(test => 
      test.id === testId ? { ...test, selected: !test.selected } : test
    ));
  };

  const filteredCoordinators = patientCoordinators.filter(pc =>
    pc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPC = (pc: PatientCoordinator) => {
    setSelectedPC(pc);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleClearPC = () => {
    setSelectedPC(null);
    setSearchQuery('');
    setShowDropdown(true);
  };

  const handleOrderKit = () => {
    setShowConfirmation(true);
  };

  const orderConfirmationData = {
    kits: tests.filter(t => t.selected).map(t => t.name),
    deliveryTimeline: shipmentMethods.find(m => m.id === selectedShipmentId)?.dateRange || '',
    address: {
      line1: addresses.find(a => a.id === selectedAddressId)?.line1 || '',
      line2: addresses.find(a => a.id === selectedAddressId)?.line2 || '',
    },
    notes: notes,
    assignedPC: {
      name: selectedPC?.name || '',
      title: selectedPC?.title || '',
    },
    orderedBy: {
      name: 'Jordan Whitaker',
      title: 'Patient Coordinator',
    },
    orderedOn: new Date().toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true,
      timeZoneName: 'short' 
    }),
  };

  const visibleAddresses = showAllAddresses ? addresses : addresses.slice(0, 1);

  const customTitle = (
    <div style={styles.headerWithBack}>
      <button style={styles.backButton} onClick={onBack}>
        <ChevronLeftIcon />
      </button>
      <span>Draw at home | Order Kit</span>
    </div>
  );

  return (
    <SideDrawer isOpen={isOpen} onClose={onClose} title={customTitle as any} width="512px">
      <div style={styles.container}>
        <div style={styles.scrollContainer}>
          {/* Order Kit(s) For Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <p style={styles.sectionTitle}>Order Kit(s) For</p>
            </div>
            <div style={styles.checkboxList}>
              {tests.map((test) => (
                <div key={test.id} style={styles.checkboxItem}>
                  <Checkbox
                    checked={test.selected}
                    onChange={() => handleTestToggle(test.id)}
                    size="small"
                    sx={{
                      color: 'var(--text-color-text-secondary)',
                      '&.Mui-checked': {
                        color: 'var(--primary-color-primary-main)',
                      },
                    }}
                  />
                  <p style={styles.checkboxLabel}>{test.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <p style={styles.sectionTitle}>Delivery address</p>
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

            <div>
              {visibleAddresses.map((address) => (
                <div
                  key={address.id}
                  style={styles.addressItem}
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
                  <p style={styles.addressText}>
                    {address.line1}
                    <br />
                    {address.line2}
                  </p>
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

          {/* Shipment Method Section */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <p style={styles.sectionTitle}>Shipment method</p>
            </div>
            <div style={styles.checkboxList}>
              {shipmentMethods.map((method) => (
                <div
                  key={method.id}
                  style={styles.shipmentOption}
                  onClick={() => setSelectedShipmentId(method.id)}
                >
                  <div style={styles.radioButton}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={styles.radioIcon}>
                      {selectedShipmentId === method.id ? (
                        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="var(--primary-color-primary-main)" />
                      ) : (
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="var(--text-color-text-secondary)" />
                      )}
                    </svg>
                  </div>
                  <div style={styles.shipmentInfo}>
                    <p style={styles.shipmentText}>{method.duration}</p>
                    <p style={styles.shipmentText}>{method.dateRange}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned PC Section */}
          <div style={styles.sectionNoBorder}>
            <div style={styles.sectionHeaderNoBorder}>
              <p style={styles.sectionTitle}>Assigned PC</p>
            </div>
            <div style={styles.typeaheadContainer}>
              {selectedPC ? (
                <div
                  style={styles.typeaheadSelectedValue}
                  onClick={() => {
                    setSelectedPC(null);
                    setShowDropdown(true);
                  }}
                >
                  <div style={styles.typeaheadSelectedText}>
                    <span style={styles.typeaheadOptionName}>
                      {selectedPC.name}{selectedPC.isMe ? ' (Me)' : ''}
                    </span>
                    <span style={styles.typeaheadSeparator}>•</span>
                    <span style={{ ...styles.typeaheadOptionTitle, margin: 0 }}>
                      {selectedPC.title}
                    </span>
                  </div>
                  <button
                    style={styles.clearButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearPC();
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    <CloseIcon />
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    style={{
                      ...styles.typeaheadInput,
                      ...(showDropdown ? styles.typeaheadInputFocused : {}),
                    }}
                    placeholder="Search patient coordinators..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => {
                      setTimeout(() => setShowDropdown(false), 200);
                    }}
                  />
                  {showDropdown && filteredCoordinators.length > 0 && (
                    <div style={styles.typeaheadDropdown}>
                      {filteredCoordinators.map((pc, index) => (
                        <div
                          key={pc.id}
                          style={{
                            ...styles.typeaheadOption,
                            ...(hoveredIndex === index ? styles.typeaheadOptionHovered : {}),
                          }}
                          onClick={() => handleSelectPC(pc)}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(-1)}
                        >
                          <span style={styles.typeaheadOptionName}>
                            {pc.name}{pc.isMe ? ' (Me)' : ''}
                          </span>
                          <span style={styles.typeaheadSeparator}>•</span>
                          <span style={styles.typeaheadOptionTitle}>{pc.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div style={styles.notesSection}>
            <p style={styles.notesTitle}>Notes</p>
            <textarea
              style={styles.textarea}
              placeholder="Input text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonContainer}>
          <Button variant="filled" fullWidth onClick={handleOrderKit}>
            ORDER KIT
          </Button>
          <Button variant="outlined" fullWidth>
            KIT NOT NEEDED
          </Button>
        </div>
      </div>

      {/* Order Confirmation Panel */}
      <OrderConfirmationPanel
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          onClose();
        }}
        orderData={orderConfirmationData}
      />
    </SideDrawer>
  );
};
