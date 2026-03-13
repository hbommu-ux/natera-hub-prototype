import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ActivityTimeline } from './ActivityTimeline';
import { OncologySupportTable, sampleOncologySupportTickets } from './OncologySupportTable';
import { navigation } from '../utils/navigation';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BusinessIcon from '@mui/icons-material/BusinessOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LinkIcon from '@mui/icons-material/Link';
import UpdateIcon from '@mui/icons-material/Update';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import SearchIcon from '@mui/icons-material/Search';

interface ClinicViewScreenProps {
  limsId: string;
  accountName: string;
  queueId?: string;
  queueName?: string;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: 'var(--surface-color-surface-low)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  breadcrumbsContainer: {
    padding: '12px var(--spacing-space-24)',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderBottom: '1px solid var(--component-color-divider)',
    height: 'fit-content',
  },
  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
  },
  breadcrumbItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
  },
  breadcrumbItemClickable: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
    cursor: 'pointer',
  },
  breadcrumbText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    fontWeight: 400,
    color: 'var(--text-color-text-secondary)',
    letterSpacing: '0.5px',
  },
  breadcrumbTextActive: {
    color: 'var(--text-color-text-primary)',
  },
  breadcrumbIcon: {
    width: '18px',
    height: '18px',
    color: 'var(--color-content-high-emphasis)',
  },
  breadcrumbSeparator: {
    display: 'flex',
    padding: '3px 7px',
  },
  pageContent: {
    display: 'flex',
    flex: 1,
  },
  navRail: {
    width: '72px',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-space-8)',
    padding: 'var(--spacing-space-8) 0',
    borderRight: '1px solid var(--component-color-divider)',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: 'var(--spacing-space-4)',
    padding: '14px 0',
    cursor: 'pointer',
    position: 'relative' as const,
  },
  navItemActive: {
    backgroundColor: 'rgba(0, 100, 149, 0.12)',
    borderRadius: 'var(--radius-radius-md)',
    margin: '0 8px',
  },
  navIcon: {
    width: '24px',
    height: '24px',
    color: 'var(--color-content-high-emphasis)',
  },
  navIconActive: {
    color: 'var(--primary-color-primary-main)',
  },
  navLabel: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    textAlign: 'center' as const,
    letterSpacing: '0.1px',
  },
  navLabelActive: {
    color: 'var(--primary-color-primary-main)',
  },
  navLabelInactive: {
    color: 'var(--text-color-text-secondary)',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-space-48)',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '500px',
    textAlign: 'center',
  },
  emptyStateIcon: {
    width: '120px',
    height: '120px',
    color: 'var(--text-color-text-disabled)',
    marginBottom: 'var(--spacing-space-24)',
  },
  emptyStateTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '32px',
    color: 'var(--text-color-text-primary)',
    margin: '0 0 var(--spacing-space-16) 0',
  },
  emptyStateMessage: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  limsIdBadge: {
    display: 'inline-block',
    backgroundColor: 'var(--surface-color-surface-medium)',
    padding: 'var(--spacing-space-8) var(--spacing-space-16)',
    borderRadius: 'var(--radius-radius-md)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    marginTop: 'var(--spacing-space-16)',
  },
  clinicHeader: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderBottom: '1px solid var(--component-color-divider)',
    padding: 'var(--spacing-space-16)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-space-12)',
  },
  clinicHeaderTop: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    alignItems: 'center',
  },
  clinicNameSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
    height: 'fit-content',
  },
  clinicName: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '25px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    lineHeight: '30px',
    margin: 0,
  },
  dropdownIcon: {
    width: '24px',
    height: '24px',
    color: 'var(--color-content-high-emphasis)',
    cursor: 'pointer',
  },
  actionBar: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'var(--spacing-space-24)',
    alignItems: 'center',
  },
  iconButtons: {
    display: 'flex',
    gap: 'var(--spacing-space-8)',
  },
  iconButton: {
    padding: 'var(--spacing-space-4)',
    borderRadius: '100px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '24px',
    height: '24px',
    color: 'var(--color-content-high-emphasis)',
  },
  actionButtons: {
    display: 'flex',
    gap: 'var(--spacing-space-8)',
  },
  splitButton: {
    display: 'flex',
    overflow: 'hidden',
    borderRadius: 'var(--radius-radius-sm)',
  },
  splitButtonMain: {
    backgroundColor: 'rgba(0, 100, 149, 0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-space-4) 10px var(--spacing-space-4) var(--spacing-space-8)',
    gap: '6px',
    cursor: 'pointer',
    border: 'none',
  },
  splitButtonDivider: {
    width: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
  },
  splitButtonDropdown: {
    backgroundColor: 'rgba(0, 100, 149, 0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-space-4) var(--spacing-space-8)',
    cursor: 'pointer',
    border: 'none',
  },
  buttonIcon: {
    width: '18px',
    height: '18px',
    color: 'var(--primary-color-primary-main)',
  },
  buttonText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '22px',
    letterSpacing: '1.4px',
    textTransform: 'uppercase' as const,
    color: 'var(--primary-color-primary-main)',
  },
  clinicInfo: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px var(--spacing-space-16)',
  },
  infoItem: {
    display: 'flex',
    padding: 'var(--spacing-space-4) 0',
  },
  infoLabel: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-secondary)',
    paddingRight: 'var(--spacing-space-8)',
  },
  infoValue: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    paddingRight: 'var(--spacing-space-4)',
  },
  rightSidebar: {
    width: '33.33%',
    minWidth: '360px',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderLeft: '1px solid var(--component-color-divider)',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  sidebarHeader: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderBottom: '1px solid var(--component-color-divider)',
    padding: 'var(--spacing-space-4) var(--spacing-space-16) var(--spacing-space-4) var(--spacing-space-16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1,
  },
  sidebarHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  filterButton: {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--spacing-space-12)',
    borderRadius: '100px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
  },
  filterLabel: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
  },
  sidebarHeaderRight: {
    display: 'flex',
    alignItems: 'center',
  },
  sortText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-secondary)',
  },
  headerIconButton: {
    padding: 'var(--spacing-space-12)',
    borderRadius: '100px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: '1px',
    height: '32px',
    backgroundColor: 'var(--component-color-divider)',
    margin: '0 var(--spacing-space-4)',
  },
  sidebarContent: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: 'var(--spacing-space-16)',
  },
  tabsContainer: {
    display: 'flex',
    borderBottom: '1px solid var(--component-color-divider)',
  },
  tab: {
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    cursor: 'pointer',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '1.25px',
    textTransform: 'uppercase' as const,
    border: 'none',
    backgroundColor: 'transparent',
    position: 'relative' as const,
  },
  tabActive: {
    color: 'var(--primary-color-primary-main)',
  },
  tabInactive: {
    color: 'var(--text-color-text-secondary)',
  },
  tabIndicator: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    backgroundColor: 'var(--primary-color-primary-main)',
  },
  tableContainer: {
    padding: 'var(--spacing-space-16)',
  },
};

export const ClinicViewScreen: React.FC<ClinicViewScreenProps> = ({ limsId, accountName, queueId, queueName }) => {
  const [activeNav, setActiveNav] = useState<'tasks' | 'orders' | 'patients' | 'files' | 'contacts' | 'settings'>('tasks');
  const [activeTaskTab, setActiveTaskTab] = useState<'open' | 'closed'>('open');
  
  const handleNateraHubClick = () => {
    navigation.navigateToDashboard();
  };

  const handleTasksClick = () => {
    if (queueId && queueName) {
      navigation.navigateToTaskList(queueId, queueName);
    }
  };

  // Filter tickets by clinic
  const clinicTickets = sampleOncologySupportTickets.filter(ticket => ticket.accountName === accountName);
  
  // Separate open and closed tasks
  const openTasks = clinicTickets.filter(ticket => ticket.status !== 'Closed');
  const closedTasks = clinicTickets.filter(ticket => ticket.status === 'Closed');

  return (
    <div style={styles.container}>
      <Header />

      {/* Breadcrumbs */}
      <div style={styles.breadcrumbsContainer}>
        <div style={styles.breadcrumbs}>
          <div style={styles.breadcrumbItemClickable} onClick={handleNateraHubClick}>
            <HomeIcon style={styles.breadcrumbIcon} />
            <span style={styles.breadcrumbText}>NateraHub</span>
          </div>
          
          {queueId && queueName && (
            <>
              <div style={styles.breadcrumbSeparator}>
                <ChevronRightIcon style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
              </div>
              <div style={styles.breadcrumbItemClickable} onClick={handleTasksClick}>
                <CheckCircleIcon style={styles.breadcrumbIcon} />
                <span style={styles.breadcrumbText}>{queueName}</span>
              </div>
            </>
          )}
          
          <div style={styles.breadcrumbSeparator}>
            <ChevronRightIcon style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
          </div>
          <div style={styles.breadcrumbItem}>
            <BusinessIcon style={styles.breadcrumbIcon} />
            <span style={{ ...styles.breadcrumbText, ...styles.breadcrumbTextActive }}>{accountName}</span>
          </div>
        </div>
      </div>

      {/* Page Content with Navigation Rail */}
      <div style={styles.pageContent}>
        {/* Navigation Rail */}
        <div style={styles.navRail}>
          <div 
            style={{
              ...styles.navItem,
              ...(activeNav === 'tasks' ? styles.navItemActive : {})
            }}
            onClick={() => setActiveNav('tasks')}
          >
            <CheckCircleOutlinedIcon 
              style={{
                ...styles.navIcon,
                ...(activeNav === 'tasks' ? styles.navIconActive : {})
              }} 
            />
            <span style={{...styles.navLabel, ...(activeNav === 'tasks' ? styles.navLabelActive : styles.navLabelInactive)}}>Tasks</span>
          </div>
          <div 
            style={{
              ...styles.navItem,
              ...(activeNav === 'orders' ? styles.navItemActive : {})
            }}
            onClick={() => setActiveNav('orders')}
          >
            <LocalShippingOutlinedIcon 
              style={{
                ...styles.navIcon,
                ...(activeNav === 'orders' ? styles.navIconActive : {})
              }} 
            />
            <span style={{...styles.navLabel, ...(activeNav === 'orders' ? styles.navLabelActive : styles.navLabelInactive)}}>Orders</span>
          </div>
          <div 
            style={{
              ...styles.navItem,
              ...(activeNav === 'patients' ? styles.navItemActive : {})
            }}
            onClick={() => setActiveNav('patients')}
          >
            <AccountCircleOutlinedIcon 
              style={{
                ...styles.navIcon,
                ...(activeNav === 'patients' ? styles.navIconActive : {})
              }} 
            />
            <span style={{...styles.navLabel, ...(activeNav === 'patients' ? styles.navLabelActive : styles.navLabelInactive)}}>Patients</span>
          </div>
          <div 
            style={{
              ...styles.navItem,
              ...(activeNav === 'files' ? styles.navItemActive : {})
            }}
            onClick={() => setActiveNav('files')}
          >
            <FolderOutlinedIcon 
              style={{
                ...styles.navIcon,
                ...(activeNav === 'files' ? styles.navIconActive : {})
              }} 
            />
            <span style={{...styles.navLabel, ...(activeNav === 'files' ? styles.navLabelActive : styles.navLabelInactive)}}>Files</span>
          </div>
          <div 
            style={{
              ...styles.navItem,
              ...(activeNav === 'contacts' ? styles.navItemActive : {})
            }}
            onClick={() => setActiveNav('contacts')}
          >
            <ContactsOutlinedIcon 
              style={{
                ...styles.navIcon,
                ...(activeNav === 'contacts' ? styles.navIconActive : {})
              }} 
            />
            <span style={{...styles.navLabel, ...(activeNav === 'contacts' ? styles.navLabelActive : styles.navLabelInactive)}}>Contacts</span>
          </div>
          <div 
            style={{
              ...styles.navItem,
              ...(activeNav === 'settings' ? styles.navItemActive : {})
            }}
            onClick={() => setActiveNav('settings')}
          >
            <SettingsOutlinedIcon 
              style={{
                ...styles.navIcon,
                ...(activeNav === 'settings' ? styles.navIconActive : {})
              }} 
            />
            <span style={{...styles.navLabel, ...(activeNav === 'settings' ? styles.navLabelActive : styles.navLabelInactive)}}>Settings</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={styles.mainContent}>
          {/* Clinic Header */}
          <div style={styles.clinicHeader}>
            {/* Top Row */}
            <div style={styles.clinicHeaderTop}>
              {/* Clinic Name Section */}
              <div style={styles.clinicNameSection}>
                <h1 style={styles.clinicName}>{accountName}</h1>
                <ArrowDropDownIcon style={styles.dropdownIcon} />
              </div>

              {/* Spacer */}
              <div style={styles.spacer} />

              {/* Action Bar */}
              <div style={styles.actionBar}>
                {/* Icon Buttons */}
                <div style={styles.iconButtons}>
                  <button style={styles.iconButton}>
                    <LinkIcon style={styles.icon} />
                  </button>
                  <button style={styles.iconButton}>
                    <UpdateIcon style={styles.icon} />
                  </button>
                </div>

                {/* Action Buttons */}
                <div style={styles.actionButtons}>
                  {/* Call Split Button */}
                  <div style={styles.splitButton}>
                    <button style={styles.splitButtonMain}>
                      <PhoneOutlinedIcon style={styles.buttonIcon} />
                      <span style={styles.buttonText}>CALL</span>
                    </button>
                    <div style={styles.splitButtonDivider} />
                    <button style={styles.splitButtonDropdown}>
                      <ArrowDropDownIcon style={styles.buttonIcon} />
                    </button>
                  </div>

                  {/* Message Split Button */}
                  <div style={styles.splitButton}>
                    <button style={styles.splitButtonMain}>
                      <ChatBubbleOutlineIcon style={styles.buttonIcon} />
                      <span style={styles.buttonText}>MESSAGE</span>
                    </button>
                    <div style={styles.splitButtonDivider} />
                    <button style={styles.splitButtonDropdown}>
                      <ArrowDropDownIcon style={styles.buttonIcon} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Info Row */}
            <div style={styles.clinicInfo}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>LIMS ID</span>
                <span style={styles.infoValue}>{limsId}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Phone</span>
                <span style={styles.infoValue}>###-###-####</span>
              </div>
            </div>
          </div>

          {/* Content Area - Conditional based on active tab */}
          {activeNav === 'tasks' ? (
            /* Tasks Tab - Show tabs and table */
            <>
              {/* Task Tabs */}
              <div style={styles.tabsContainer}>
                <button
                  style={{
                    ...styles.tab,
                    ...(activeTaskTab === 'open' ? styles.tabActive : styles.tabInactive),
                  }}
                  onClick={() => setActiveTaskTab('open')}
                >
                  ALL OPEN TASKS ({openTasks.length})
                  {activeTaskTab === 'open' && <div style={styles.tabIndicator} />}
                </button>
                <button
                  style={{
                    ...styles.tab,
                    ...(activeTaskTab === 'closed' ? styles.tabActive : styles.tabInactive),
                  }}
                  onClick={() => setActiveTaskTab('closed')}
                >
                  RECENTLY CLOSED TASKS ({closedTasks.length})
                  {activeTaskTab === 'closed' && <div style={styles.tabIndicator} />}
                </button>
              </div>
              
              {/* Table Container */}
              <div style={styles.tableContainer}>
                <OncologySupportTable 
                  tickets={activeTaskTab === 'open' ? openTasks : closedTasks}
                  queueId={queueId}
                  queueName={queueName}
                  hideAccountName={true}
                />
              </div>
            </>
          ) : (
            /* Other Tabs - Show Empty State */
            <div style={styles.content}>
              <div style={styles.emptyState}>
                <svg
                  style={styles.emptyStateIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                </svg>
                <h2 style={styles.emptyStateTitle}>{activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}</h2>
                <p style={styles.emptyStateMessage}>
                  {activeNav} for <strong>{accountName}</strong> will be displayed here.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Activity Timeline */}
        <div style={styles.rightSidebar}>
          {/* Sidebar Header */}
          <div style={styles.sidebarHeader}>
            <div style={styles.sidebarHeaderLeft}>
              <button style={styles.filterButton}>
                <FilterListIcon style={styles.icon} />
              </button>
              <span style={styles.filterLabel}>Filter</span>
            </div>
            <div style={styles.sidebarHeaderRight}>
              <span style={styles.sortText}>Newest First</span>
              <button style={styles.headerIconButton}>
                <SortIcon style={styles.icon} />
              </button>
              <div style={styles.divider} />
              <button style={styles.headerIconButton}>
                <NoteAddOutlinedIcon style={styles.icon} />
              </button>
              <button style={styles.headerIconButton}>
                <SearchIcon style={styles.icon} />
              </button>
            </div>
          </div>
          {/* Sidebar Content */}
          <div style={styles.sidebarContent}>
            <ActivityTimeline />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
