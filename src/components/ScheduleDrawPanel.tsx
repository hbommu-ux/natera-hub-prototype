import React, { useState } from 'react';
import { SideDrawer } from './SideDrawer';
import { Button } from './Button';
import { Chip } from './Chip';
import { MPJobConfirmationPanel } from './MPJobConfirmationPanel';

interface ScheduleDrawPanelProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    jobType: string;
    address: {
      line1: string;
      line2: string;
      isPrimary: boolean;
    };
    contact: {
      name: string;
      phone: string;
      type: string;
    };
    assignedPC: {
      name: string;
      title: string;
    };
  };
}

interface PatientCoordinator {
  id: string;
  name: string;
  title: string;
  isMe?: boolean;
}

interface TimeSlot {
  id: string;
  date: string;
  timeRange: string;
  displayText: string;
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
    gap: 'var(--spacing-space-16)',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0, 0, 0, 0.16)',
    borderRadius: 'var(--radius-radius-md)',
    padding: '0 var(--spacing-space-12) var(--spacing-space-8) var(--spacing-space-12)',
  },
  sectionNoBorder: {
    display: 'flex',
    flexDirection: 'column',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  label: {
    flex: 1,
    padding: 'var(--spacing-space-12) 0',
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
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--spacing-space-4) var(--spacing-space-8) var(--spacing-space-4) var(--spacing-space-16)',
    border: '1px solid rgba(0, 0, 0, 0.16)',
    borderRadius: 'var(--radius-radius-sm)',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    gap: 'var(--spacing-space-12)',
  },
  searchText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    flex: 1,
    margin: 0,
    padding: '10px 0',
  },
  addressContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-space-8)',
    padding: 'var(--spacing-space-2)',
    width: '100%',
  },
  radioContainer: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    gap: 'var(--spacing-space-4)',
    padding: 'var(--spacing-space-8) 0',
  },
  radioButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '7px',
    cursor: 'pointer',
  },
  addressText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  showMoreButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 'var(--spacing-space-4) 6px',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '1.4px',
    textTransform: 'uppercase',
    color: 'var(--primary-color-primary-main)',
    borderRadius: 'var(--radius-radius-sm)',
  },
  addButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 'var(--spacing-space-4) 6px',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '1.4px',
    textTransform: 'uppercase',
    color: 'var(--primary-color-primary-main)',
    borderRadius: 'var(--radius-radius-sm)',
  },
  dropdown: {
    width: '100%',
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 'var(--radius-radius-sm)',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    color: 'var(--text-color-text-primary)',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M7 10l5 5 5-5z\' fill=\'%23000000\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    paddingRight: '40px',
  },
  dateRangeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-space-12) 0',
  },
  dateRangeText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '18px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  navButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-radius-sm)',
    color: 'var(--text-color-text-secondary)',
  },
  timeSlotChipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing-space-8)',
    padding: 'var(--spacing-space-8) 0',
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 'var(--spacing-space-8)',
    padding: 'var(--spacing-space-8) 0',
  },
  calendarDayLabel: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    color: 'var(--text-color-text-secondary)',
    textAlign: 'center',
    padding: 'var(--spacing-space-8) 0',
  },
  calendarDay: {
    background: 'none',
    border: '1px solid rgba(0, 0, 0, 0.16)',
    borderRadius: 'var(--radius-radius-sm)',
    cursor: 'pointer',
    padding: 'var(--spacing-space-8)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '20px',
    color: 'var(--text-color-text-primary)',
    textAlign: 'center',
    minHeight: '40px',
    transition: 'all 0.2s ease',
  },
  calendarDaySelected: {
    backgroundColor: 'var(--primary-color-primary-main)',
    color: 'white',
    borderColor: 'var(--primary-color-primary-main)',
  },
  timeRangeContainer: {
    display: 'flex',
    gap: 'var(--spacing-space-8)',
    padding: 'var(--spacing-space-8) 0',
  },
  timeRangeButton: {
    flex: 1,
    background: 'none',
    border: '1px solid rgba(0, 0, 0, 0.16)',
    borderRadius: 'var(--radius-radius-sm)',
    cursor: 'pointer',
    padding: 'var(--spacing-space-8) var(--spacing-space-12)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
    color: 'var(--text-color-text-primary)',
    textAlign: 'center',
    transition: 'all 0.2s ease',
  },
  timeRangeButtonSelected: {
    backgroundColor: 'var(--primary-color-primary-main)',
    color: 'white',
    borderColor: 'var(--primary-color-primary-main)',
  },
  textarea: {
    width: '100%',
    minHeight: '80px',
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 'var(--radius-radius-sm)',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    color: 'var(--text-color-text-primary)',
    resize: 'vertical',
  },
  typeaheadContainer: {
    position: 'relative',
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
    fontWeight: 500,
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
  buttonContainer: {
    padding: 'var(--spacing-space-24) 0 0 0',
  },
};

// Icon components
const SearchIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const AddIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const ChevronDownIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

const ChevronLeftIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

const ChevronRightIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const RadioCheckedIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
  </svg>
);

const CloseIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const ScheduleDrawPanel: React.FC<ScheduleDrawPanelProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  const [showMoreAddress, setShowMoreAddress] = useState(false);
  const [showMoreContact, setShowMoreContact] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState('Alaska');
  const [selectedDates, setSelectedDates] = useState<number[]>([16, 18, 20]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('9 AM - 12 PM');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: '1', date: '3/16', timeRange: '9 AM - 12 PM', displayText: '3/16 9 AM - 12 PM' },
    { id: '2', date: '3/18', timeRange: '9 AM - 12 PM', displayText: '3/18 9 AM - 12 PM' },
    { id: '3', date: '3/20', timeRange: '9 AM - 12 PM', displayText: '3/20 9 AM - 12 PM' },
  ]);
  const [notesToPhlebotomist, setNotesToPhlebotomist] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [currentWeekStart, setCurrentWeekStart] = useState(16);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Assigned PC states (same as OrderKitPanel)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPC, setSelectedPC] = useState<PatientCoordinator | null>({
    id: '1',
    name: 'Jordan Whitaker',
    title: 'Patient Coordinator',
    isMe: true,
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  // Patient coordinators data (same as OrderKitPanel)
  const patientCoordinators: PatientCoordinator[] = [
    { id: '1', name: 'Jordan Whitaker', title: 'Patient Coordinator', isMe: true },
    { id: '2', name: 'Sarah Johnson', title: 'Senior Patient Coordinator' },
    { id: '3', name: 'Michael Chen', title: 'Patient Coordinator' },
    { id: '4', name: 'Emily Rodriguez', title: 'Lead Patient Coordinator' },
    { id: '5', name: 'David Thompson', title: 'Patient Coordinator' },
    { id: '6', name: 'Amanda Wilson', title: 'Senior Patient Coordinator' },
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

  const handleClearPC = () => {
    setSelectedPC(null);
    setSearchQuery('');
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = Array.from({ length: 7 }, (_, i) => currentWeekStart + i);
  const timeRanges = ['9 AM - 12 PM', '12 PM - 3 PM', '3 PM - 6 PM'];

  const handleDateToggle = (date: number) => {
    setSelectedDates(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  const handleRemoveTimeSlot = (id: string) => {
    setTimeSlots(prev => prev.filter(slot => slot.id !== id));
  };

  const handlePrevWeek = () => {
    setCurrentWeekStart(prev => prev - 7);
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(prev => prev + 7);
  };

  const handleCreateJob = () => {
    // Handle job creation
    setShowConfirmation(true);
  };

  // Format availability slots for confirmation
  const formatAvailability = () => {
    return timeSlots.map(slot => {
      const dateObj = new Date(2025, 1, parseInt(slot.date.split('/')[1])); // February 2025
      const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateObj.getDay()];
      const monthName = 'Feb';
      const year = 2025;
      const timeOfDay = slot.timeRange.includes('9 AM') ? 'Morning' : slot.timeRange.includes('12 PM') ? 'Afternoon' : 'Evening';
      return `${dayName}, ${monthName} ${slot.date.split('/')[1]} ${year} ${timeOfDay} ${slot.timeRange}`;
    });
  };

  const jobConfirmationData = {
    jobType: orderData.jobType,
    address: orderData.address,
    contact: orderData.contact,
    availability: formatAvailability(),
    notesToPhlebotomist,
    assignedPC: selectedPC ? { name: selectedPC.name, title: selectedPC.title } : orderData.assignedPC,
    submittedBy: selectedPC ? { name: selectedPC.name, title: selectedPC.title } : orderData.assignedPC,
    submittedOn: new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZoneName: 'short',
    }),
  };

  return (
    <>
    <SideDrawer isOpen={isOpen} onClose={onClose} title="Draw at home | Schedule Draw" width="512px">
      <div style={styles.container}>
        <div style={styles.scrollContainer}>
          {/* Job Type Section */}
          <div style={styles.sectionNoBorder}>
            <div style={styles.toolbar}>
              <div style={styles.label}>
                <p style={styles.sectionTitle}>Job type</p>
              </div>
            </div>
            <div style={styles.searchBar}>
              <SearchIcon style={{ color: 'var(--text-color-text-secondary)' }} />
              <p style={styles.searchText}>{orderData.jobType}</p>
            </div>
          </div>

          {/* Draw Address Section */}
          <div style={styles.section}>
            <div style={styles.toolbar}>
              <div style={styles.label}>
                <p style={styles.sectionTitle}>Draw Address</p>
              </div>
              <button
                style={styles.addButton}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <AddIcon />
                ADD ADDRESS
              </button>
            </div>
            <div style={styles.addressContainer}>
              <div style={styles.radioContainer}>
                <div style={styles.radioButton}>
                  <RadioCheckedIcon style={{ color: 'var(--primary-color-primary-main)' }} />
                </div>
                <p style={styles.addressText}>
                  {orderData.address.line1}
                  <br />
                  {orderData.address.line2}
                </p>
              </div>
              {orderData.address.isPrimary && (
                <Chip label="Primary" size="small" />
              )}
            </div>
            <button
              style={styles.showMoreButton}
              onClick={() => setShowMoreAddress(!showMoreAddress)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              SHOW {showMoreAddress ? 'LESS' : 'MORE'}
              <ChevronDownIcon style={{ transform: showMoreAddress ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
            </button>
          </div>

          {/* Preferred Contact Section */}
          <div style={styles.section}>
            <div style={styles.toolbar}>
              <div style={styles.label}>
                <p style={styles.sectionTitle}>Preferred Contact</p>
              </div>
              <button
                style={styles.addButton}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <AddIcon />
                ADD CONTACT
              </button>
            </div>
            <div style={styles.addressContainer}>
              <div style={styles.radioContainer}>
                <div style={styles.radioButton}>
                  <RadioCheckedIcon style={{ color: 'var(--primary-color-primary-main)' }} />
                </div>
                <p style={styles.addressText}>
                  {orderData.contact.name}
                  <br />
                  {orderData.contact.phone}
                </p>
              </div>
              <Chip label={orderData.contact.type} size="small" />
            </div>
            <button
              style={styles.showMoreButton}
              onClick={() => setShowMoreContact(!showMoreContact)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              SHOW {showMoreContact ? 'LESS' : 'MORE'}
              <ChevronDownIcon style={{ transform: showMoreContact ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
            </button>
          </div>

          {/* Select Availability Section */}
          <div style={styles.section}>
            <div style={styles.toolbar}>
              <div style={styles.label}>
                <p style={styles.sectionTitle}>Select Availability</p>
              </div>
            </div>
            
            {/* Patient Timezone */}
            <div style={{ marginBottom: 'var(--spacing-space-12)' }}>
              <p style={{ ...styles.addressText, fontSize: '12px', marginBottom: 'var(--spacing-space-4)', color: 'var(--text-color-text-secondary)' }}>
                Patient Timezone
              </p>
              <select
                style={styles.dropdown}
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
              >
                <option value="Alaska">Alaska</option>
                <option value="Pacific">Pacific</option>
                <option value="Mountain">Mountain</option>
                <option value="Central">Central</option>
                <option value="Eastern">Eastern</option>
              </select>
            </div>

            {/* Date Range Navigation */}
            <div style={styles.dateRangeContainer}>
              <button style={styles.navButton} onClick={handlePrevWeek}>
                <ChevronLeftIcon />
              </button>
              <p style={styles.dateRangeText}>March {currentWeekStart} - {currentWeekStart + 6}</p>
              <button style={styles.navButton} onClick={handleNextWeek}>
                <ChevronRightIcon />
              </button>
            </div>

            {/* Time Slot Chips */}
            {timeSlots.length > 0 && (
              <div style={styles.timeSlotChipsContainer}>
                {timeSlots.map(slot => (
                  <Chip
                    key={slot.id}
                    label={slot.displayText}
                    size="small"
                    onDelete={() => handleRemoveTimeSlot(slot.id)}
                  />
                ))}
              </div>
            )}

            {/* Calendar Grid */}
            <div style={styles.calendarGrid}>
              {weekDays.map(day => (
                <div key={day} style={styles.calendarDayLabel}>{day}</div>
              ))}
            </div>
            <div style={styles.calendarGrid}>
              {dates.map(date => (
                <button
                  key={date}
                  style={{
                    ...styles.calendarDay,
                    ...(selectedDates.includes(date) ? styles.calendarDaySelected : {}),
                  }}
                  onClick={() => handleDateToggle(date)}
                >
                  {date}
                </button>
              ))}
            </div>

            {/* Time Range Selection */}
            <div style={styles.timeRangeContainer}>
              {timeRanges.map(range => (
                <button
                  key={range}
                  style={{
                    ...styles.timeRangeButton,
                    ...(selectedTimeRange === range ? styles.timeRangeButtonSelected : {}),
                  }}
                  onClick={() => setSelectedTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Assigned PC Section */}
          <div style={styles.sectionNoBorder}>
            <div style={styles.toolbar}>
              <div style={styles.label}>
                <p style={styles.sectionTitle}>Assigned PC</p>
              </div>
            </div>
            <div style={styles.typeaheadContainer}>
              {selectedPC ? (
                <div style={styles.typeaheadSelectedValue}>
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

          {/* Notes to Phlebotomist Section */}
          <div style={styles.sectionNoBorder}>
            <div style={styles.toolbar}>
              <div style={styles.label}>
                <p style={styles.sectionTitle}>Notes to Phlebotomist</p>
              </div>
            </div>
            <textarea
              style={styles.textarea}
              placeholder="Input text"
              value={notesToPhlebotomist}
              onChange={(e) => setNotesToPhlebotomist(e.target.value)}
            />
          </div>

          {/* Internal Notes Section */}
          <div style={styles.sectionNoBorder}>
            <div style={styles.toolbar}>
              <div style={styles.label}>
                <p style={styles.sectionTitle}>Internal notes</p>
              </div>
            </div>
            <textarea
              style={styles.textarea}
              placeholder="Input text"
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Action Button */}
        <div style={styles.buttonContainer}>
          <Button variant="filled" fullWidth onClick={handleCreateJob}>
            CREATE MP JOB
          </Button>
        </div>
      </div>
    </SideDrawer>

    {/* MP Job Confirmation Panel */}
    <MPJobConfirmationPanel
      isOpen={showConfirmation}
      onClose={() => {
        setShowConfirmation(false);
        onClose(); // Close both panels when confirmation is closed
      }}
      jobData={jobConfirmationData}
    />
  </>
  );
};
