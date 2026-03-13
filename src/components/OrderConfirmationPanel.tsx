import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { SideDrawer } from './SideDrawer';
import { Button } from './Button';
import { ScheduleDrawPanel } from './ScheduleDrawPanel';

interface OrderConfirmationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    kits: string[];
    deliveryTimeline: string;
    address: {
      line1: string;
      line2: string;
    };
    notes: string;
    assignedPC: {
      name: string;
      title: string;
    };
    orderedBy: {
      name: string;
      title: string;
    };
    orderedOn: string;
  };
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
    height: '100%',
  },
  scrollContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-32)',
  },
  successSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-space-16)',
  },
  successIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'var(--component-alert-color-alert-success-fill, #ddf3eb)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: '32px',
    height: '32px',
    color: 'var(--component-alert-color-alert-success-text, #2e7d32)',
  },
  successTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: '0.15px',
    color: 'var(--text-color-text-primary)',
    textAlign: 'center',
    margin: 0,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'var(--radius-radius-md)',
    overflow: 'hidden',
  },
  detailsHeader: {
    backgroundColor: 'var(--surface-color-surface-low)',
    padding: 'var(--spacing-space-8)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: '0.1px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  detailsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 'var(--spacing-space-8)',
  },
  detailItem: {
    padding: 'var(--spacing-space-8)',
    display: 'flex',
    flexDirection: 'column',
  },
  detailItemHalf: {
    width: '50%',
  },
  detailItemFull: {
    width: '100%',
  },
  detailLabel: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
    paddingTop: 'var(--spacing-space-4)',
  },
  detailValue: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
    paddingBottom: 'var(--spacing-space-4)',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--component-color-divider)',
    width: '100%',
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-space-8)',
    padding: 'var(--spacing-space-4) var(--spacing-space-8)',
  },
  listItemLabel: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
    width: '142px',
    flexShrink: 0,
  },
  listItemValue: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
    flex: 1,
  },
  editButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    minWidth: '32px',
    minHeight: '32px',
    color: 'var(--text-color-text-secondary)',
    transition: 'background-color 0.2s ease',
  },
  buttonContainer: {
    padding: 'var(--spacing-space-24) 0 0 0',
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1200,
  },
  modal: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderRadius: 'var(--radius-radius-md)',
    boxShadow: '0px 3px 13px 0px rgba(0,0,0,0.04), 0px 10.5px 36px 0px rgba(0,0,0,0.19)',
    width: '460px',
    maxWidth: '90vw',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  modalHeader: {
    padding: 'var(--spacing-space-16) var(--spacing-space-24)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '0.15px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
    flex: 1,
  },
  modalContent: {
    padding: 'var(--spacing-space-16) var(--spacing-space-24) var(--spacing-space-24) var(--spacing-space-24)',
  },
  modalTypeaheadContainer: {
    position: 'relative' as const,
    width: '100%',
  },
  modalTypeaheadButton: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 'var(--radius-radius-sm)',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  modalTypeaheadText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: 'var(--text-color-text-primary)',
    textAlign: 'left' as const,
  },
  modalTypeaheadIcons: {
    display: 'flex',
    gap: 'var(--spacing-space-8)',
    alignItems: 'center',
  },
  modalActions: {
    display: 'flex',
    gap: 'var(--spacing-space-16)',
    justifyContent: 'flex-end',
    padding: 'var(--spacing-space-8) var(--spacing-space-16) var(--spacing-space-16) var(--spacing-space-24)',
  },
  modalButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px var(--spacing-space-8)',
    borderRadius: 'var(--radius-radius-sm)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '1.25px',
    textTransform: 'uppercase' as const,
    color: 'var(--primary-color-primary-main)',
    transition: 'background-color 0.2s ease',
  },
  modalDropdown: {
    position: 'absolute' as const,
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    backgroundColor: 'var(--surface-color-surface-lowest)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-md)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    maxHeight: '240px',
    overflowY: 'auto' as const,
    zIndex: 1201,
  },
  modalDropdownOption: {
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  modalDropdownOptionHovered: {
    backgroundColor: 'var(--action-color-hovered)',
  },
};

const CheckIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const EditIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const ArrowForwardIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

const CloseIconSmall: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const ArrowDownIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

export const OrderConfirmationPanel: React.FC<OrderConfirmationPanelProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  const [showEditPCModal, setShowEditPCModal] = useState(false);
  const [showScheduleDrawPanel, setShowScheduleDrawPanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPC, setSelectedPC] = useState<PatientCoordinator>({
    id: '1',
    name: orderData.assignedPC.name,
    title: orderData.assignedPC.title,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  // Sample patient coordinators data
  const patientCoordinators: PatientCoordinator[] = [
    { id: '1', name: 'Jordan Whitaker', title: 'Patient Coordinator', isMe: true },
    { id: '2', name: 'Alex Morgan', title: 'Senior Patient Coordinator' },
    { id: '3', name: 'Taylor Smith', title: 'Patient Coordinator' },
    { id: '4', name: 'Casey Johnson', title: 'Lead Patient Coordinator' },
    { id: '5', name: 'Morgan Lee', title: 'Patient Coordinator' },
  ];

  const filteredCoordinators = patientCoordinators.filter(pc =>
    pc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPC = (pc: PatientCoordinator) => {
    setSelectedPC(pc);
    setShowDropdown(false);
    setSearchQuery('');
  };

  const handleDone = () => {
    // Update the assigned PC in the order data
    orderData.assignedPC = {
      name: selectedPC.name,
      title: selectedPC.title,
    };
    setShowEditPCModal(false);
  };

  const handleModalClose = () => {
    // Reset to original value
    setSelectedPC({
      id: '1',
      name: orderData.assignedPC.name,
      title: orderData.assignedPC.title,
    });
    setShowEditPCModal(false);
    setShowDropdown(false);
    setSearchQuery('');
  };

  return (
    <>
    <SideDrawer isOpen={isOpen} onClose={onClose} title="Draw at home | Order Kit" width="512px">
      <div style={styles.container}>
        <div style={styles.scrollContainer}>
          {/* Success Section */}
          <div style={styles.successSection}>
            <div style={styles.successIcon}>
              <CheckIcon style={styles.checkIcon} />
            </div>
            <h2 style={styles.successTitle}>Kit Order Submitted!</h2>
          </div>

          {/* Confirmation Details */}
          <div style={styles.detailsContainer}>
            <p style={styles.detailsHeader}>Confirmation details</p>

            {/* Order Details Grid */}
            <div style={styles.detailsGrid}>
              <div style={{ ...styles.detailItem, ...styles.detailItemHalf }}>
                <p style={styles.detailLabel}>Order Kit(s) For</p>
                <p style={styles.detailValue}>{orderData.kits.join(', ')}</p>
              </div>

              <div style={{ ...styles.detailItem, ...styles.detailItemHalf }}>
                <p style={styles.detailLabel}>Est Delivery Timeline</p>
                <p style={styles.detailValue}>{orderData.deliveryTimeline}</p>
              </div>

              <div style={{ ...styles.detailItem, ...styles.detailItemHalf }}>
                <p style={styles.detailLabel}>Address</p>
                <p style={styles.detailValue}>
                  {orderData.address.line1}
                  <br />
                  {orderData.address.line2}
                </p>
              </div>

              {orderData.notes && (
                <div style={{ ...styles.detailItem, ...styles.detailItemFull }}>
                  <p style={styles.detailLabel}>Notes</p>
                  <p style={styles.detailValue}>{orderData.notes}</p>
                </div>
              )}
            </div>

            <div style={styles.divider} />

            {/* Kit Information Grid */}
            <div style={styles.detailsGrid}>
              <div style={{ ...styles.detailItem, ...styles.detailItemHalf }}>
                <p style={styles.detailLabel}>Kit Order No</p>
                <p style={{ ...styles.detailValue, color: 'var(--text-color-text-primary)' }}>-</p>
              </div>

              <div style={{ ...styles.detailItem, ...styles.detailItemHalf }}>
                <p style={styles.detailLabel}>Kit Serial Number</p>
                <p style={styles.detailValue}>-</p>
              </div>

              <div style={{ ...styles.detailItem, ...styles.detailItemHalf }}>
                <p style={styles.detailLabel}>Tracking Number</p>
                <p style={{ ...styles.detailValue, color: 'var(--text-color-text-secondary)' }}>-</p>
              </div>

              <div style={{ ...styles.detailItem, ...styles.detailItemHalf }}>
                <p style={styles.detailLabel}>Return Tracking</p>
                <p style={{ ...styles.detailValue, color: 'var(--text-color-text-secondary)' }}>-</p>
              </div>
            </div>

            <div style={styles.divider} />

            {/* Additional Information List */}
            <div style={{ padding: 'var(--spacing-space-8)' }}>
              <div style={styles.listItem}>
                <p style={styles.listItemLabel}>Assigned PC</p>
                <p style={styles.listItemValue}>
                  {orderData.assignedPC.name}, {orderData.assignedPC.title}
                </p>
                <button
                  style={styles.editButton}
                  onClick={() => setShowEditPCModal(true)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <EditIcon />
                </button>
              </div>

              <div style={styles.listItem}>
                <p style={styles.listItemLabel}>Ordered by</p>
                <p style={styles.listItemValue}>
                  {orderData.orderedBy.name}, {orderData.orderedBy.title}
                </p>
              </div>

              <div style={styles.listItem}>
                <p style={styles.listItemLabel}>Ordered on</p>
                <p style={styles.listItemValue}>{orderData.orderedOn}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div style={styles.buttonContainer}>
          <Button 
            variant="filled" 
            fullWidth 
            endIcon={<ArrowForwardIcon />}
            onClick={() => setShowScheduleDrawPanel(true)}
          >
            SCHEDULE MOBILE PHLEBOTOMY
          </Button>
        </div>
      </div>
    </SideDrawer>

    {/* Schedule Draw Panel */}
    <ScheduleDrawPanel
      isOpen={showScheduleDrawPanel}
      onClose={() => setShowScheduleDrawPanel(false)}
      orderData={{
        jobType: orderData.kits.join(', '),
        address: orderData.address,
        contact: {
          name: 'Jane Preston Doe',
          phone: '+1 512-902-1215',
          type: 'Patient',
        },
        assignedPC: orderData.assignedPC,
      }}
    />

    {/* Edit PC Modal - Rendered via Portal to center on entire screen */}
    {showEditPCModal && ReactDOM.createPortal(
      <div style={styles.modalOverlay} onClick={handleModalClose}>
        <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>Select an Assigned PC</h2>
          </div>

          {/* Modal Content */}
          <div style={styles.modalContent}>
            <div style={styles.modalTypeaheadContainer}>
              <button
                style={styles.modalTypeaheadButton}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span style={styles.modalTypeaheadText}>
                  {selectedPC.name}, {selectedPC.title}
                </span>
                <div style={styles.modalTypeaheadIcons}>
                  <CloseIconSmall style={{ width: '24px', height: '24px' }} />
                  <ArrowDownIcon style={{ width: '24px', height: '24px' }} />
                </div>
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div style={styles.modalDropdown}>
                  {filteredCoordinators.map((pc, index) => (
                    <div
                      key={pc.id}
                      style={{
                        ...styles.modalDropdownOption,
                        ...(hoveredIndex === index ? styles.modalDropdownOptionHovered : {}),
                      }}
                      onClick={() => handleSelectPC(pc)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(-1)}
                    >
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px', fontWeight: 500 }}>
                        {pc.name}{pc.isMe ? ' (Me)' : ''}
                      </span>
                      <span style={{ color: 'var(--text-color-text-secondary)', margin: '0 4px' }}>•</span>
                      <span style={{ fontFamily: 'Roboto, sans-serif', fontSize: '15px', color: 'var(--text-color-text-secondary)' }}>
                        {pc.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modal Actions */}
          <div style={styles.modalActions}>
            <button
              style={styles.modalButton}
              onClick={handleModalClose}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              CLOSE
            </button>
            <button
              style={styles.modalButton}
              onClick={handleDone}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              DONE
            </button>
          </div>
        </div>
      </div>,
      document.body
    )}
  </>
  );
};
