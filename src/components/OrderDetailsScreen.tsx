import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './Button';
import { ListItemDense } from './ListItemDense';
import { Chip } from './Chip';
import { SideDrawer } from './SideDrawer';
import { CreateTaskForm, type CreateTaskData } from './CreateTaskForm';
import { Snackbar } from './Snackbar';
import { TwilioCallWindow } from './TwilioCallWindow';
import { BloodCollectionPanel } from './BloodCollectionPanel';
import { ActivityTimeline } from './ActivityTimeline';
import { navigation } from '../utils/navigation';
import { getTaskByOrderId, getTasksByQueueId, getOrderTasksByOrderId, createTask, updateTaskStatus, type Task, type OrderTask } from '../data/tasks';
import { getAllQueues } from '../data/queues';
import { formatDateForDisplay } from '../data/constants';
import PersonIcon from '@mui/icons-material/PersonOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { OrdersIcon } from './Icons';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PhoneIcon from '@mui/icons-material/PhoneOutlined';
import MessageIcon from '@mui/icons-material/ChatBubbleOutline';
import LinkIcon from '@mui/icons-material/Link';
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleFilledIcon from '@mui/icons-material/AccountCircle';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import GroupIcon from '@mui/icons-material/GroupOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TimelineIcon from '@mui/icons-material/TimelineOutlined';
import PatientNumberIcon from '@mui/icons-material/Badge';
// PackageOutlinedIcon and PackageFilledIcon replaced with OrdersIcon from ./Icons
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';

interface OrderDetailsScreenProps {
  orderId: string;
  patientName: string;
  queueId?: string;
  queueName?: string;
  showOverview?: boolean;
}

const styles = {
  container: {
    backgroundColor: 'var(--surface-color-surface-low)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  pageContent: {
    display: 'flex',
    flex: 1,
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
  patientHeader: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderBottom: '1px solid var(--component-color-divider)',
    padding: 'var(--spacing-space-16)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-space-12)',
  },
  patientHeaderTop: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    alignItems: 'center',
  },
  patientNameSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
    height: 'fit-content',
  },
  patientName: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '25px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    lineHeight: '30px',
    margin: 0,
  },
  spacer: {
    flex: 1,
  },
  actionBar: {
    display: 'flex',
    gap: 'var(--spacing-space-24)',
    alignItems: 'center',
  },
  iconButtons: {
    display: 'flex',
    gap: 'var(--spacing-space-8)',
  },
  iconButton: {
    padding: 'var(--spacing-space-4)',
    borderRadius: 'var(--radius-radius-circle)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splitButton: {
    display: 'inline-flex',
    borderRadius: 'var(--radius-radius-sm)',
    overflow: 'hidden' as const,
  },
  splitButtonLeft: {
    backgroundColor: 'var(--component-button-color-button-tonal-fill)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    padding: '6px var(--spacing-space-8)',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s ease',
  },
  splitButtonDivider: {
    width: '1px',
    backgroundColor: 'var(--component-button-color-button-tonal-text)',
    opacity: 0.4,
  },
  splitButtonRight: {
    backgroundColor: 'var(--component-button-color-button-tonal-fill)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-space-4) var(--spacing-space-8)',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s ease',
  },
  splitButtonHover: {
    backgroundColor: 'var(--component-button-color-button-tonal-fill-hover)',
  },
  patientInfo: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px 16px',
    alignItems: 'center',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--spacing-space-4) 0',
  },
  infoIcon: {
    width: '18px',
    height: '18px',
    marginRight: 'var(--spacing-space-8)',
    color: 'var(--color-content-high-emphasis)',
    marginTop: '3px',
    marginBottom: '3px',
  },
  infoText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 400,
    color: 'var(--text-color-text-primary)',
    letterSpacing: '0.25px',
    lineHeight: '24px',
    paddingRight: 'var(--spacing-space-4)',
  },
  infoLabel: {
    color: 'var(--text-color-text-secondary)',
  },
  infoDivider: {
    width: '1px',
    height: '24px',
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
  },
  tabsContainer: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid var(--component-color-divider)',
  },
  tab: {
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    cursor: 'pointer',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '1.25px',
    lineHeight: '24px',
  },
  tabTextActive: {
    color: 'var(--primary-color-primary-main)',
  },
  tabTextInactive: {
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
  contentArea: {
    flex: 1,
    padding: '12px 16px',
    overflowY: 'auto' as const,
  },
  testHeader: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-space-4)',
    paddingTop: 'var(--spacing-space-8)',
    paddingBottom: 'var(--spacing-space-12)',
  },
  testTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-12)',
  },
  testTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    lineHeight: '32px',
    letterSpacing: '0.15px',
    margin: 0,
  },
  orderIdText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 400,
    color: 'var(--text-color-text-primary)',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    margin: 0,
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--spacing-space-16)',
    padding: 'var(--spacing-space-16) 0',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-space-48)',
    minHeight: '400px',
    color: 'var(--text-color-text-secondary)',
    textAlign: 'center' as const,
  },
  emptyStateText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    marginTop: 'var(--spacing-space-16)',
  },
  workflowsCard: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-md)',
    padding: 'var(--spacing-space-16)',
    marginTop: 'var(--spacing-space-24)',
  },
  workflowsTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    lineHeight: '32px',
    letterSpacing: '0.15px',
    margin: 0,
    paddingBottom: 'var(--spacing-space-16)',
  },
  workflowItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-12)',
    padding: 'var(--spacing-space-12)',
    borderRadius: 'var(--radius-radius-sm)',
  },
  workflowIcon: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-radius-circle)',
    backgroundColor: 'rgba(244, 67, 54, 0.12)',
    color: '#f44336',
  },
  workflowContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-space-4)',
  },
  workflowName: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  workflowDate: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 400,
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  workflowLink: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--primary-color-primary-main)',
    textDecoration: 'none',
    cursor: 'pointer',
    marginLeft: 'var(--spacing-space-4)',
  },
  workflowActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-12)',
    position: 'relative' as const,
  },
  statusDropdownContainer: {
    position: 'relative' as const,
  },
  statusDropdown: {
    position: 'absolute' as const,
    top: 'calc(100% + 4px)',
    right: 0,
    backgroundColor: 'var(--surface-color-surface-lowest)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '280px',
    maxHeight: '400px',
    overflow: 'visible' as const,
    zIndex: 1000,
  },
  statusDropdownItem: {
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
    cursor: 'pointer',
    borderBottom: '1px solid var(--component-color-divider)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background-color 0.2s ease',
  },
  statusDropdownItemActive: {
    backgroundColor: 'var(--surface-color-surface-low)',
  },
  statusDropdownItemHover: {
    backgroundColor: 'var(--action-color-hovered)',
  },
  statusSubmenu: {
    position: 'absolute' as const,
    right: '100%',
    top: 0,
    backgroundColor: 'var(--surface-color-surface-lowest)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '300px',
    maxHeight: '400px',
    overflowY: 'auto' as const,
    zIndex: 1001,
    marginRight: '4px',
  },
  submenuItem: {
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
    cursor: 'pointer',
    borderBottom: '1px solid var(--component-color-divider)',
    transition: 'background-color 0.2s ease',
  },
  submenuItemHover: {
    backgroundColor: 'var(--action-color-hovered)',
  },
  taskListContainer: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderRadius: 'var(--radius-radius-sm)',
    marginTop: 'var(--spacing-space-16)',
  },
  taskSection: {
    borderBottom: '1px solid var(--component-color-divider)',
  },
  taskSectionLast: {
    borderBottom: 'none',
  },
  taskSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    cursor: 'pointer',
    userSelect: 'none' as const,
  },
  taskSectionHeaderText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  taskSectionIcon: {
    marginRight: 'var(--spacing-space-8)',
    color: 'var(--text-color-text-secondary)',
    fontSize: '20px',
  },
  taskTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  taskTableHeader: {
    backgroundColor: 'var(--surface-color-surface-low)',
    borderTop: '1px solid var(--component-color-divider)',
    borderBottom: '1px solid var(--component-color-divider)',
  },
  taskTableHeaderCell: {
    padding: 'var(--spacing-space-8) var(--spacing-space-16)',
    textAlign: 'left' as const,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-color-text-secondary)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  taskTableHeaderCellCheckbox: {
    width: '48px',
    padding: 'var(--spacing-space-8) var(--spacing-space-16)',
  },
  taskTableRow: {
    borderBottom: '1px solid var(--component-color-divider)',
  },
  taskTableCell: {
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    color: 'var(--text-color-text-primary)',
  },
  taskTableCellCheckbox: {
    width: '48px',
    padding: 'var(--spacing-space-12) 0 var(--spacing-space-12) var(--spacing-space-16)',
  },
  rightSidebar: {
    width: '33.33%',
    minWidth: '360px',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderLeft: '1px solid var(--component-color-divider)',
    overflowY: 'auto' as const,
  },
  sidebarHeader: {
    padding: 'var(--spacing-space-16)',
    borderBottom: '1px solid var(--component-color-divider)',
  },
  sidebarTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
  },
  sidebarContent: {
    padding: 'var(--spacing-space-16)',
  },
  // Order Overview Styles
  ordersHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 0 var(--spacing-space-16) 0',
  },
  ordersTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
  },
  ordersCount: {
    fontWeight: 400,
    color: 'var(--text-color-text-secondary)',
  },
  sortButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
    fontSize: '14px',
    color: 'var(--text-color-text-secondary)',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'Roboto, sans-serif',
  },
  filtersRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
    padding: '0 0 var(--spacing-space-16) 0',
  },
  filterChip: {
    cursor: 'pointer',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-space-16)',
  },
  orderCard: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderRadius: 'var(--radius-radius-md)',
    boxShadow: '0px 0.25px 1px 0px rgba(0,0,0,0.04), 0px 0.85px 3px 0px rgba(0,0,0,0.19)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s ease',
  },
  orderCardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 'var(--spacing-space-16)',
  },
  orderTitleSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-space-8)',
  },
  orderTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
  },
  orderCardTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  syncIcon: {
    width: '18px',
    height: '18px',
    color: 'var(--text-color-text-secondary)',
  },
  weeksText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    color: 'var(--text-color-text-secondary)',
  },
  orderIdRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
  },
  orderIdIcon: {
    width: '18px',
    height: '18px',
    color: 'var(--text-color-text-secondary)',
  },
  orderIdValue: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-secondary)',
  },
  orderActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-16)',
  },
  editButton: {
    width: '26px',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: '50%',
  },
  orderDetailsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    padding: '0 var(--spacing-space-16)',
  },
  orderDetailItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    padding: 'var(--spacing-space-8)',
  },
  orderDetailLabel: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-secondary)',
  },
  orderDetailValue: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
  },
  orderDetailSubValue: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
  },
  testTable: {
    margin: 'var(--spacing-space-16)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    overflow: 'hidden',
  },
  testTableHeader: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr 1fr 1fr 110px 80px',
    borderBottom: '1px solid var(--component-color-divider)',
  },
  testTableHeaderCell: {
    padding: 'var(--spacing-space-8) var(--spacing-space-16)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
  },
  testTableDataRow: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr 1fr 1fr 110px 80px',
    borderBottom: '1px solid var(--component-color-divider)',
  },
  testTableDataCell: {
    padding: 'var(--spacing-space-8) var(--spacing-space-16)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
  },
  testTableDataCellWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-4)',
  },
  backToOverviewButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-4)',
    padding: 'var(--spacing-space-8) 0',
    fontSize: '14px',
    color: 'var(--primary-color-primary-main)',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'Roboto, sans-serif',
  },
  testCountBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color-primary-main)',
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: 500,
  },
};

// Status dropdown item component
interface StatusMenuItemProps {
  label: string;
  hasSubmenu: boolean;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: () => void;
}

const StatusMenuItem: React.FC<StatusMenuItemProps> = ({ label, hasSubmenu, isActive, onClick, onMouseEnter }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.statusDropdownItem,
        ...(isActive ? styles.statusDropdownItemActive : {}),
        ...(isHovered ? styles.statusDropdownItemHover : {}),
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span>{label}</span>
      {hasSubmenu && <ChevronRightIcon style={{ width: '18px', height: '18px' }} />}
    </div>
  );
};

// Submenu item component
interface SubmenuItemProps {
  label: string;
  onClick: () => void;
}

const SubmenuItem: React.FC<SubmenuItemProps> = ({ label, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.submenuItem,
        ...(isHovered ? styles.submenuItemHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

// Workflow status options with hierarchical structure
const workflowStatusOptions = [
  { label: 'Order created', submenu: null },
  { 
    label: 'Draw Delay', 
    submenu: [
      'Medical',
      'Remote Region',
      'GIS Pending'
    ]
  },
  { 
    label: 'Draw in Progress', 
    submenu: [
      'Patient Contact Attempt #1',
      'Patient Contact Attempt #2',
      'MP Scheduled',
      'Mobile Phlebotomy Submitted',
      'Draw at Lab/Clinic'
    ]
  },
  { 
    label: 'Awaiting Clinic response', 
    submenu: [
      'Need Alternate Patient Contact',
      'Patient Stopped Responding',
      'Patient Validation Needed'
    ]
  },
  { 
    label: 'Field Response Pending', 
    submenu: [
      'Sales/Patient Education by Clinic Needed',
      'Sales/Patient Declined All Testing',
      'Sales/FRP Other',
      'Sales/Clinic Draw Requested',
      'Sales/Cadence clarification',
      'CX/Unresponsive Patient',
      'CX/Phone Number',
      'CX/Patient Left Clinic/Changed Provider',
      'CX/Patient in Hospice',
      'CX/Patient Deceased'
    ]
  },
  { label: 'Clinic Response Received', submenu: null },
  { label: 'Clinic Contact Exhausted', submenu: null },
  { label: 'MP Action Required', submenu: null },
  { label: 'Patient Contacts Exhausted', submenu: null },
  { 
    label: 'Redraw in Progress', 
    submenu: [
      'Redraw Patient Contact Attempt',
      'Redraw MP Scheduled',
      'Mobile Phlebotomy Redraw Submitted',
      'Redraw at Lab/Clinic'
    ]
  },
];

export const OrderDetailsScreen: React.FC<OrderDetailsScreenProps> = ({ orderId, patientName, queueId, queueName, showOverview }) => {
  const [activeTab, setActiveTab] = useState<'testDetails' | 'orderTasks' | 'activityTimeline'>('testDetails');
  // If showOverview is true (from Twilio call), start with Order Overview. Otherwise show Order Details.
  const [currentView, setCurrentView] = useState<'orderOverview' | 'orderDetails'>(showOverview ? 'orderOverview' : 'orderDetails');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<typeof patientOrders[0] | null>(null);
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [orderTasks, setOrderTasks] = useState<OrderTask[]>([]);
  const [activeTasksExpanded, setActiveTasksExpanded] = useState<boolean>(true);
  const [completedTasksExpanded, setCompletedTasksExpanded] = useState<boolean>(false);
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());
  const [pendingTimeouts, setPendingTimeouts] = useState<Map<string, NodeJS.Timeout>>(new Map());
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [workflowStatus, setWorkflowStatus] = useState<string>('Order created');
  const [showStatusDropdown, setShowStatusDropdown] = useState<boolean>(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuTimer, setSubmenuTimer] = useState<NodeJS.Timeout | null>(null);
  const [createTaskDrawerOpen, setCreateTaskDrawerOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [highlightedTaskId, setHighlightedTaskId] = useState<string | null>(null);
  const [activeOrderFilter, setActiveOrderFilter] = useState<string | null>(null);
  const [showOutgoingCall, setShowOutgoingCall] = useState<boolean>(false);
  const [bloodCollectionPanelOpen, setBloodCollectionPanelOpen] = useState<boolean>(false);

  // Get patient phone number based on patient name
  const getPatientPhone = () => {
    if (patientName === 'Diana Prince') return '+1 512-902-1215';
    return '+1 512-902-1215'; // Default phone for demo
  };

  // Mock patient orders data - different for each patient
  const getPatientOrders = () => {
    if (patientName === 'Diana Prince') {
      return [
        {
          id: '1',
          orderId: 'WkT9xPm3QvZn',
          testName: 'Empower',
          status: 'Active' as const,
          weeksAgo: 2,
          orderingClinic: 'Themyscira Medical Center',
          clinicId: '10001',
          clinician: 'Dr. Hippolyta',
          createdOn: '15 Jan 2026',
          expCollectionDate: '30 Jan 2026',
          tests: [
            { name: 'Empower', managedBy: 'Natera', caseNumber: '789456', estimateStatus: 'Estimate Available', balance: '$250.00' },
          ],
        },
        {
          id: '2',
          orderId: 'Hn4bRcL8FjYs',
          testName: 'Horizon',
          status: 'Completed' as const,
          weeksAgo: 8,
          orderingClinic: 'Themyscira Medical Center',
          clinicId: '10001',
          clinician: 'Dr. Hippolyta',
          createdOn: '01 Dec 2025',
          expCollectionDate: '15 Dec 2025',
          tests: [
            { name: 'Horizon', managedBy: 'Natera', caseNumber: '789123', estimateStatus: 'Paid', balance: '$0.00' },
          ],
        },
      ];
    }
    
    // Default orders for other patients
    return [
      {
        id: '1',
        orderId: 'YZb7Kx8WnX0F',
        testName: 'Signatera',
        status: 'Active' as const,
        weeksAgo: 4,
        orderingClinic: 'Boston Medical Center',
        clinicId: '29495',
        clinician: 'Dr. Norma Kamal',
        createdOn: '01 Jan 2025',
        expCollectionDate: '01 Dec 2025',
        tests: [
          { name: 'Signatera', managedBy: 'Natera', caseNumber: '333331, 333332', estimateStatus: 'Estimate Available', balance: '$99,999.99' },
        ],
      },
      {
        id: '2',
        orderId: 'YZb7Kx8WnX0F',
        testName: 'Altera · Signatera',
        status: 'Completed' as const,
        weeksAgo: 6,
        hasMultipleTests: true,
        testCount: 1,
        orderingClinic: 'Boston Medical Center',
        clinicId: '29495',
        clinician: 'Dr. Norma Kamal',
        createdOn: '01 Jan 2025',
        expCollectionDate: '01 Jan 2025',
        tests: [
          { name: 'Signatera', managedBy: 'Natera', caseNumber: '333331, 333332', estimateStatus: 'Estimate Available', balance: '$99,999.99' },
          { name: 'Altera', managedBy: 'Natera', caseNumber: '333331', estimateStatus: 'Estimate Available', balance: '$99,999.99' },
        ],
      },
      {
        id: '3',
        orderId: 'DEF456UVW',
        testName: 'Horizon',
        status: 'Cancelled' as const,
        weeksAgo: 8,
        orderingClinic: 'Cleveland Clinic',
        clinicId: '67890',
        clinician: 'Dr. Michael Chen',
        createdOn: '01 Dec 2024',
        expCollectionDate: '15 Dec 2024',
        tests: [
          { name: 'Horizon', managedBy: 'Natera', caseNumber: '555551', estimateStatus: 'Cancelled', balance: '$0.00' },
        ],
      },
    ];
  };

  const patientOrders = getPatientOrders();

  const orderFilterCounts = {
    Created: patientOrders.filter(o => (o.status as string) === 'Created').length,
    Active: patientOrders.filter(o => o.status === 'Active').length,
    Completed: patientOrders.filter(o => o.status === 'Completed').length,
    Cancelled: patientOrders.filter(o => o.status === 'Cancelled').length,
  };

  const filteredOrders = activeOrderFilter
    ? patientOrders.filter(o => o.status === activeOrderFilter)
    : patientOrders;

  const getOrderStatusChipColor = (status: string): 'info' | 'success' | 'default' | 'error' => {
    switch (status) {
      case 'Active': return 'info';
      case 'Completed': return 'success';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const handleOrderCardClick = (order: typeof patientOrders[0]) => {
    setSelectedOrderId(order.id);
    setSelectedOrder(order);
    setCurrentView('orderDetails');
  };

  const handleBackToOverview = () => {
    setCurrentView('orderOverview');
    setSelectedOrderId(null);
    setSelectedOrder(null);
  };

  // Clear highlight after 1 second
  useEffect(() => {
    if (highlightedTaskId) {
      const timer = setTimeout(() => {
        setHighlightedTaskId(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [highlightedTaskId]);

  useEffect(() => {
    // Populate all queues and their tasks to ensure tasks are cached
    const allQueues = getAllQueues();
    allQueues.forEach(queue => {
      getTasksByQueueId(queue.id);
    });
    // Fetch the task by orderId
    const foundTask = getTaskByOrderId(orderId);
    setTask(foundTask);
  }, [orderId]);

  useEffect(() => {
    // Fetch order tasks
    const tasks = getOrderTasksByOrderId(orderId);
    setOrderTasks(tasks);
  }, [orderId]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      pendingTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [pendingTimeouts]);

  // Handle window resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Breakpoint for responsive sidebar - switch to tab below 1200px
  const SIDEBAR_BREAKPOINT = 1200;
  const showSidebarAsTab = windowWidth < SIDEBAR_BREAKPOINT;

  // Switch back to testDetails tab when resizing from small to large screen
  useEffect(() => {
    if (!showSidebarAsTab && activeTab === 'activityTimeline') {
      setActiveTab('testDetails');
    }
  }, [showSidebarAsTab, activeTab]);

  // Close status dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside the entire dropdown container
      const dropdownContainer = document.querySelector('[data-status-dropdown]');
      if (showStatusDropdown && dropdownContainer && !dropdownContainer.contains(target)) {
        setShowStatusDropdown(false);
        setActiveSubmenu(null);
      }
    };

    if (showStatusDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showStatusDropdown]);

  const handleSubmenuEnter = (label: string) => {
    if (submenuTimer) {
      clearTimeout(submenuTimer);
      setSubmenuTimer(null);
    }
    setActiveSubmenu(label);
  };

  const handleSubmenuLeave = () => {
    const timer = setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
    setSubmenuTimer(timer);
  };

  const handleTaskCheckbox = (taskId: string) => {
    const newSelected = new Set(selectedTasks);
    const newTimeouts = new Map(pendingTimeouts);
    
    if (newSelected.has(taskId)) {
      // Unchecking - cancel the timeout and remove from selected
      const existingTimeout = newTimeouts.get(taskId);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        newTimeouts.delete(taskId);
      }
      newSelected.delete(taskId);
      // Revert task status in data layer
      updateTaskStatus(taskId, 'active');
    } else {
      // Checking - add to selected and set timeout to move to completed
      newSelected.add(taskId);
      
      const timeout = setTimeout(() => {
        // Move task from active to completed in local state
        setOrderTasks(prevTasks => 
          prevTasks.map(t => 
            t.id === taskId ? { ...t, status: 'completed' as const } : t
          )
        );
        // Update task status in data layer
        updateTaskStatus(taskId, 'completed');
        // Remove from selected tasks
        setSelectedTasks(prev => {
          const updated = new Set(prev);
          updated.delete(taskId);
          return updated;
        });
        // Remove timeout from map
        setPendingTimeouts(prev => {
          const updated = new Map(prev);
          updated.delete(taskId);
          return updated;
        });
      }, 2000);
      
      newTimeouts.set(taskId, timeout);
    }
    
    setSelectedTasks(newSelected);
    setPendingTimeouts(newTimeouts);
  };

  const handleNateraHubClick = () => {
    navigation.navigateToDashboard();
  };

  const handleTasksClick = () => {
    if (queueId && queueName) {
      navigation.navigateToTaskList(queueId, queueName);
    } else {
      // Fallback to dashboard if queue info is not available
      navigation.navigateToDashboard();
    }
  };

  const handleCreateTask = (taskData: CreateTaskData) => {
    // Create the task in the data layer (adds to both queue and order task caches)
    const { orderTask } = createTask({
      patientName: taskData.patientName,
      orderId: taskData.orderId,
      taskType: taskData.taskType,
      assignedTo: taskData.assignedTo,
      dueDate: taskData.dueDate,
      queueId: queueId,
    });

    // Add the new task to the local order tasks list for immediate UI update
    setOrderTasks(prevTasks => [orderTask, ...prevTasks]);
    
    // Close the drawer
    setCreateTaskDrawerOpen(false);
    
    // Highlight the newly created task
    setHighlightedTaskId(orderTask.id);
    
    // Show success snackbar
    setSnackbarMessage('Task created successfully!');
    setSnackbarOpen(true);
  };

  const activeTasks = orderTasks.filter(t => t.status === 'active');
  const completedTasks = orderTasks.filter(t => t.status === 'completed');

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
          <div style={styles.breadcrumbSeparator}>
            <ChevronRightIcon style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
          </div>
          <div style={styles.breadcrumbItemClickable} onClick={handleTasksClick}>
            <CheckCircleIcon style={styles.breadcrumbIcon} />
            <span style={styles.breadcrumbText}>Tasks</span>
          </div>
          <div style={styles.breadcrumbSeparator}>
            <ChevronRightIcon style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
          </div>
          {currentView === 'orderOverview' ? (
            /* Order Overview - Patient name is the last item (active) */
          <div style={styles.breadcrumbItem}>
              <PersonIcon style={styles.breadcrumbIcon} />
              <span style={{...styles.breadcrumbText, ...styles.breadcrumbTextActive}}>{patientName}</span>
            </div>
          ) : (
            /* Order Details - Patient name is clickable, Order ID is the last item */
            <>
              <div style={styles.breadcrumbItemClickable} onClick={handleBackToOverview}>
            <PersonIcon style={styles.breadcrumbIcon} />
            <span style={styles.breadcrumbText}>{patientName}</span>
          </div>
          <div style={styles.breadcrumbSeparator}>
            <ChevronRightIcon style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
          </div>
          <div style={styles.breadcrumbItem}>
            <OrdersIcon style={styles.breadcrumbIcon} />
                <span style={{...styles.breadcrumbText, ...styles.breadcrumbTextActive}}>{selectedOrder?.orderId || orderId}</span>
          </div>
            </>
          )}
        </div>
      </div>

      {/* Page Content */}
      <div style={styles.pageContent}>
        {/* Left Navigation Rail */}
        <div style={styles.navRail}>
          <div style={{...styles.navItem, ...styles.navItemActive}}>
            <OrdersIcon style={{...styles.navIcon, ...styles.navIconActive}} />
            <span style={{...styles.navLabel, ...styles.navLabelActive}}>Orders</span>
          </div>
          <div style={styles.navItem}>
            <AccountBalanceOutlinedIcon style={styles.navIcon} />
            <span style={{...styles.navLabel, ...styles.navLabelInactive}}>Billing</span>
          </div>
          <div style={styles.navItem}>
            <FolderIcon style={styles.navIcon} />
            <span style={{...styles.navLabel, ...styles.navLabelInactive}}>Files</span>
          </div>
          <div style={styles.navItem}>
            <AccountCircleIcon style={styles.navIcon} />
            <span style={{...styles.navLabel, ...styles.navLabelInactive}}>Profile</span>
          </div>
          <div style={styles.navItem}>
            <CheckCircleOutlinedIcon style={styles.navIcon} />
            <span style={{...styles.navLabel, ...styles.navLabelInactive}}>Tasks</span>
          </div>
          {showSidebarAsTab && (
            <div 
              style={{
                ...styles.navItem, 
                ...(activeTab === 'activityTimeline' ? styles.navItemActive : {})
              }}
              onClick={() => setActiveTab('activityTimeline')}
            >
              <TimelineIcon 
                style={{
                  ...styles.navIcon, 
                  ...(activeTab === 'activityTimeline' ? styles.navIconActive : {})
                }} 
              />
              <span 
                style={{
                  ...styles.navLabel, 
                  ...(activeTab === 'activityTimeline' ? styles.navLabelActive : styles.navLabelInactive)
                }}
              >
                Timeline
              </span>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div style={styles.mainContent}>
          {/* Patient Header */}
          <div style={styles.patientHeader}>
            <div style={{...styles.patientHeaderTop, paddingTop: 0, paddingBottom: 0}}>
              <div style={styles.patientNameSection}>
                <p style={styles.patientName}>{patientName}</p>
                <KeyboardArrowDownIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
              </div>
              <div style={styles.spacer} />
              <div style={styles.actionBar}>
                <div style={styles.iconButtons}>
                  <div style={styles.iconButton}>
                    <LinkIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
                  </div>
                  <div style={styles.iconButton}>
                    <RefreshIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
                  </div>
                </div>
                <Button 
                  variant="tonal" 
                  size="small" 
                  startIcon={<PhoneIcon style={{ width: '18px', height: '18px' }} />}
                  onClick={() => setShowOutgoingCall(true)}
                >
                  Call
                </Button>
                <Button 
                  variant="tonal" 
                  size="small" 
                  startIcon={<MessageIcon style={{ width: '18px', height: '18px' }} />}
                >
                  Message
                </Button>
              </div>
            </div>

            <div style={styles.patientInfo}>
              <div style={styles.infoItem}>
                <PatientNumberIcon style={styles.infoIcon} />
                <span style={styles.infoText}>{orderId}</span>
              </div>
              <div style={styles.infoItem}>
                <CalendarIcon style={styles.infoIcon} />
                <span style={styles.infoText}>07/30/1982</span>
              </div>
              <div style={styles.infoItem}>
                <PhoneIcon style={styles.infoIcon} />
                <span style={styles.infoText}>512-902-1215</span>
                <div style={styles.iconButton}>
                  <MoreHorizIcon style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
                </div>
              </div>
              <div style={styles.infoItem}>
                <GroupIcon style={styles.infoIcon} />
                <span style={styles.infoText}>Billy Adams</span>
                <div style={styles.iconButton}>
                  <MoreHorizIcon style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
                </div>
              </div>
              <div style={styles.infoDivider} />
              <div style={styles.infoItem}>
                <span style={{...styles.infoText, ...styles.infoLabel}}>Patient Balance</span>
                <span style={styles.infoText}>$4,200.89</span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div style={styles.contentArea}>
            {currentView === 'orderOverview' ? (
              /* Order Overview - List of Patient's Orders */
              <>
                {/* Orders Header */}
                <div style={styles.ordersHeader}>
                  <h2 style={styles.ordersTitle}>
                    Orders <span style={styles.ordersCount}>{patientOrders.length}</span>
                  </h2>
                  <button style={styles.sortButton}>
                    Newest First
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
                    </svg>
                  </button>
                </div>

                {/* Filters */}
                <div style={styles.filtersRow}>
                  {(['Created', 'Active', 'Completed', 'Cancelled'] as const).map((filter) => (
                    <div
                      key={filter}
                      style={styles.filterChip}
                      onClick={() => setActiveOrderFilter(activeOrderFilter === filter ? null : filter)}
                    >
                      <Chip
                        label={`${filter} ${orderFilterCounts[filter]}`}
                        variant={activeOrderFilter === filter ? 'filled' : 'outlined'}
                        color="default"
                        size="small"
                      />
                    </div>
                  ))}
                </div>

                {/* Orders List */}
                <div style={styles.ordersList}>
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      style={styles.orderCard}
                      onClick={() => handleOrderCardClick(order)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0px 2px 8px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0px 0.25px 1px 0px rgba(0,0,0,0.04), 0px 0.85px 3px 0px rgba(0,0,0,0.19)';
                      }}
                    >
                      {/* Order Card Header */}
                      <div style={styles.orderCardHeader}>
                        <div style={styles.orderTitleSection}>
                          <div style={styles.orderTitleRow}>
                            <h3 style={styles.orderCardTitle}>{order.testName}</h3>
                            {'hasMultipleTests' in order && order.hasMultipleTests && (
                              <span style={styles.testCountBadge}>{'testCount' in order ? order.testCount : ''}</span>
                            )}
                            <svg style={styles.syncIcon} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                            </svg>
                            <span style={styles.weeksText}>{order.weeksAgo} Weeks</span>
                            {'hasMultipleTests' in order && order.hasMultipleTests && (
                              <>
                                <svg style={styles.syncIcon} viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                                </svg>
                                <span style={styles.weeksText}>6 Weeks</span>
                              </>
                            )}
                          </div>
                          <div style={styles.orderIdRow}>
                            <OrdersIcon style={styles.orderIdIcon} />
                            <span style={styles.orderIdValue}>{order.orderId}</span>
                          </div>
                        </div>
                        <div style={styles.orderActions}>
                          <Chip
                            label={order.status}
                            color={getOrderStatusChipColor(order.status)}
                            size="small"
                            variant="filled"
                            type="status"
                          />
                          <div 
                            style={styles.editButton}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-color-text-secondary)">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div style={styles.orderDetailsRow}>
                        <div style={styles.orderDetailItem}>
                          <span style={styles.orderDetailLabel}>Ordering Clinic</span>
                          <span style={styles.orderDetailValue}>{order.orderingClinic}</span>
                          <span style={styles.orderDetailSubValue}>ID {order.clinicId}</span>
                        </div>
                        <div style={styles.orderDetailItem}>
                          <span style={styles.orderDetailLabel}>Clinician</span>
                          <span style={styles.orderDetailValue}>{order.clinician}</span>
                        </div>
                        <div style={styles.orderDetailItem}>
                          <span style={styles.orderDetailLabel}>Created on</span>
                          <span style={styles.orderDetailValue}>{order.createdOn}</span>
                        </div>
                        <div style={styles.orderDetailItem}>
                          <span style={styles.orderDetailLabel}>Exp. Collection Date</span>
                          <span style={styles.orderDetailValue}>{order.expCollectionDate}</span>
                        </div>
                      </div>

                      {/* Tests Table */}
                      <div style={styles.testTable}>
                        <div style={styles.testTableHeader}>
                          <div style={styles.testTableHeaderCell}>Test</div>
                          <div style={styles.testTableHeaderCell}>Managed by</div>
                          <div style={styles.testTableHeaderCell}>Case number</div>
                          <div style={styles.testTableHeaderCell}>Estimate status</div>
                          <div style={styles.testTableHeaderCell}>Balance</div>
                          <div style={styles.testTableHeaderCell}></div>
                        </div>
                        {order.tests.map((test, idx) => (
                          <div key={idx} style={{...styles.testTableDataRow, borderBottom: idx === order.tests.length - 1 ? 'none' : '1px solid var(--component-color-divider)'}}>
                            <div style={styles.testTableDataCell}>{test.name}</div>
                            <div style={styles.testTableDataCell}>{test.managedBy}</div>
                            <div style={styles.testTableDataCell}>{test.caseNumber}</div>
                            <div style={styles.testTableDataCell}>{test.estimateStatus}</div>
                            <div style={styles.testTableDataCell}>{test.balance}</div>
                            <div style={{...styles.testTableDataCell, ...styles.testTableDataCellWithIcon}}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-color-text-secondary)">
                                <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                              </svg>
                              <span style={styles.weeksText}>6 mo.plan</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (task || selectedOrder) ? (
              /* Order Details View */
              <>
                {/* Back to Overview */}
                <button style={styles.backToOverviewButton} onClick={handleBackToOverview}>
                  <ChevronRightIcon style={{ width: '18px', height: '18px', transform: 'rotate(180deg)' }} />
                  Back to Orders
                </button>

                {/* Test Header */}
                <div style={styles.testHeader}>
                  <div style={styles.testTitleRow}>
                    <h6 style={styles.testTitle}>{selectedOrder?.testName || task?.testNames || 'Unknown Test'}</h6>
                    <Chip 
                      label={selectedOrder?.status || 'Active'} 
                      color={selectedOrder ? getOrderStatusChipColor(selectedOrder.status) : 'success'} 
                      size="small" 
                      variant="filled" 
                      type="status" 
                    />
                  </div>
                  <p style={styles.orderIdText}>Order ID: {selectedOrder?.orderId || task?.orderId || orderId}</p>
                </div>

                <div style={styles.detailsGrid}>
                  <ListItemDense label="Ordering Clinic" title={selectedOrder?.orderingClinic || task?.accountName || '-'} />
                  <ListItemDense label="Clinician" title={selectedOrder?.clinician || task?.clinician || '-'} />
                  <ListItemDense label="Source" title={task?.source || 'EMR'} />
                  <ListItemDense label="Created by" title={task?.createdBy || '-'} />
                  <ListItemDense label="LIMS ID" title={task?.limsId || '-'} />
                  <ListItemDense label="Created at" title={selectedOrder?.createdOn || task?.createdAt || '-'} />
                  <ListItemDense label="Exp. Collection Date" title={selectedOrder?.expCollectionDate || task?.edoc || '-'} />
                  <ListItemDense label="Act. Collection Date" title={task?.actualCollectionDate || '-'} />
          </div>

          {/* Tabs */}
          <div style={styles.tabsContainer}>
            <div style={styles.tab} onClick={() => setActiveTab('testDetails')}>
              <p style={{...styles.tabText, ...(activeTab === 'testDetails' ? styles.tabTextActive : styles.tabTextInactive)}}>
                TEST DETAILS
              </p>
              {activeTab === 'testDetails' && <div style={styles.tabIndicator} />}
            </div>
            <div style={styles.tab} onClick={() => setActiveTab('orderTasks')}>
              <p style={{...styles.tabText, ...(activeTab === 'orderTasks' ? styles.tabTextActive : styles.tabTextInactive)}}>
                      ORDER TASKS ({orderTasks.length})
              </p>
              {activeTab === 'orderTasks' && <div style={styles.tabIndicator} />}
            </div>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<AddIcon style={{ width: '18px', height: '18px' }} />}
                    style={{ marginLeft: 'auto', marginRight: 'var(--spacing-space-16)' }}
                    onClick={() => setCreateTaskDrawerOpen(true)}
                  >
                    Create a Task
                  </Button>
          </div>

                {/* Workflows Card - only show in Test Details tab */}
                {activeTab === 'testDetails' && (
                  <div style={styles.workflowsCard}>
                    <h6 style={styles.workflowsTitle}>Workflows</h6>
                    <div style={styles.workflowItem}>
                      <div style={styles.workflowIcon}>
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 32 32" 
                          fill="none"
                          style={{ display: 'block' }}
                        >
                          <path 
                            d="M16 2C16 2 8 12 8 18C8 22.4183 11.5817 26 16 26C20.4183 26 24 22.4183 24 18C24 12 16 2 16 2Z" 
                            fill="#f44336"
                          />
                        </svg>
                      </div>
                      <div style={styles.workflowContent}>
                        <p style={styles.workflowName}>Blood Collection</p>
                        <p style={styles.workflowDate}>
                          Target Date 27 Nov 2024
                          <a style={styles.workflowLink}>Change</a>
                        </p>
                      </div>
                      <div style={styles.workflowActions}>
                        <div style={styles.statusDropdownContainer} data-status-dropdown>
                          <div onClick={() => setShowStatusDropdown(!showStatusDropdown)}>
                            <Chip 
                              label={workflowStatus} 
                              color="neutral" 
                              size="small" 
                              variant="filled"
                              type="status"
                              trailingIcon={<ArrowDropDownIcon />}
                            />
                          </div>
                          {showStatusDropdown && (
                            <div style={styles.statusDropdown}>
                              {workflowStatusOptions.map((option) => (
                                <div 
                                  key={option.label} 
                                  style={{ position: 'relative' }}
                                  onMouseEnter={() => {
                                    if (submenuTimer) {
                                      clearTimeout(submenuTimer);
                                      setSubmenuTimer(null);
                                    }
                                    if (option.submenu) {
                                      setActiveSubmenu(option.label);
                                    } else {
                                      setActiveSubmenu(null);
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    // Check if we're moving to the submenu
                                    const relatedTarget = e.relatedTarget as HTMLElement;
                                    const currentTarget = e.currentTarget as HTMLElement;
                                    
                                    // If moving to a child element (submenu), don't close
                                    if (relatedTarget && currentTarget.contains(relatedTarget)) {
                                      return;
                                    }
                                    
                                    if (option.submenu) {
                                      handleSubmenuLeave();
                                    }
                                  }}
                                >
                                  <StatusMenuItem
                                    label={option.label}
                                    hasSubmenu={!!option.submenu}
                                    isActive={workflowStatus === option.label || (option.submenu?.includes(workflowStatus) ?? false)}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!option.submenu) {
                                        setWorkflowStatus(option.label);
                                        setShowStatusDropdown(false);
                                        setActiveSubmenu(null);
                                      } else {
                                        // Toggle submenu on click and clear any hover timers
                                        if (submenuTimer) {
                                          clearTimeout(submenuTimer);
                                          setSubmenuTimer(null);
                                        }
                                        setActiveSubmenu(activeSubmenu === option.label ? null : option.label);
                                      }
                                    }}
                                    onMouseEnter={() => {}}
                                  />
                                  {option.submenu && activeSubmenu === option.label && (
                                    <div 
                                      style={styles.statusSubmenu}
                                      onMouseEnter={() => {
                                        if (submenuTimer) {
                                          clearTimeout(submenuTimer);
                                          setSubmenuTimer(null);
                                        }
                                      }}
                                      onMouseLeave={() => {
                                        handleSubmenuLeave();
                                      }}
                                    >
                                      {option.submenu.map((subitem) => (
                                        <SubmenuItem
                                          key={subitem}
                                          label={subitem}
                                          onClick={() => {
                                            setWorkflowStatus(subitem);
                                            setShowStatusDropdown(false);
                                            setActiveSubmenu(null);
                                          }}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button size="small" onClick={() => setBloodCollectionPanelOpen(true)}>
                          Start
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Tasks - only show in Order Tasks tab */}
                {activeTab === 'orderTasks' && (
                  <div style={styles.taskListContainer}>
                    {/* Active Tasks Section */}
                    <div style={styles.taskSection}>
                      <div 
                        style={styles.taskSectionHeader}
                        onClick={() => setActiveTasksExpanded(!activeTasksExpanded)}
                      >
                        {activeTasksExpanded ? (
                          <ChevronUpIcon style={styles.taskSectionIcon} />
                        ) : (
                          <ChevronDownIcon style={styles.taskSectionIcon} />
                        )}
                        <p style={styles.taskSectionHeaderText}>
                          Active ({activeTasks.length})
                        </p>
                      </div>
                      
                      {activeTasksExpanded && activeTasks.length > 0 && (
                        <table style={styles.taskTable}>
                          <thead style={styles.taskTableHeader}>
                            <tr>
                              <th style={styles.taskTableHeaderCellCheckbox}></th>
                              <th style={styles.taskTableHeaderCell}># SF-ID</th>
                              <th style={styles.taskTableHeaderCell}>Task Type</th>
                              <th style={styles.taskTableHeaderCell}>Assigned to</th>
                              <th style={styles.taskTableHeaderCell}>Date created</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeTasks.map((task) => {
                              const isChecked = selectedTasks.has(task.id);
                              const isHighlighted = task.id === highlightedTaskId;
                              const rowStyle: React.CSSProperties = {
                                ...styles.taskTableRow,
                                textDecoration: isChecked ? 'line-through' : 'none',
                                opacity: isChecked ? 0.6 : 1,
                                backgroundColor: isHighlighted ? 'var(--component-button-color-button-tonal-fill)' : 'transparent',
                                transition: 'opacity 0.2s ease, text-decoration 0.2s ease, background-color 1s ease',
                              };
                              const cellStyle = {
                                ...styles.taskTableCell,
                                textDecoration: isChecked ? 'line-through' : 'none',
                              };
                              return (
                                <tr key={task.id} style={rowStyle}>
                                  <td style={styles.taskTableCellCheckbox}>
                                    <Checkbox
                                      checked={isChecked}
                                      onChange={() => handleTaskCheckbox(task.id)}
                                      size="small"
                                      sx={{
                                        color: 'var(--text-color-text-secondary)',
                                        '&.Mui-checked': {
                                          color: 'var(--primary-color-primary-main)',
                                        },
                                      }}
                                    />
                                  </td>
                                  <td style={cellStyle}>#{task.sfId}</td>
                                  <td style={cellStyle}>{task.taskType}</td>
                                  <td style={cellStyle}>{task.assignedTo}</td>
                                  <td style={cellStyle}>{task.dateCreated}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>

                    {/* Completed Tasks Section */}
                    <div style={{...styles.taskSection, ...styles.taskSectionLast}}>
                      <div 
                        style={styles.taskSectionHeader}
                        onClick={() => setCompletedTasksExpanded(!completedTasksExpanded)}
                      >
                        {completedTasksExpanded ? (
                          <ChevronUpIcon style={styles.taskSectionIcon} />
                        ) : (
                          <ChevronDownIcon style={styles.taskSectionIcon} />
                        )}
                        <p style={styles.taskSectionHeaderText}>
                          Completed ({completedTasks.length})
                        </p>
                      </div>
                      
                      {completedTasksExpanded && completedTasks.length > 0 && (
                        <table style={styles.taskTable}>
                          <thead style={styles.taskTableHeader}>
                            <tr>
                              <th style={styles.taskTableHeaderCellCheckbox}></th>
                              <th style={styles.taskTableHeaderCell}># SF-ID</th>
                              <th style={styles.taskTableHeaderCell}>Task Type</th>
                              <th style={styles.taskTableHeaderCell}>Assigned to</th>
                              <th style={styles.taskTableHeaderCell}>Date created</th>
                            </tr>
                          </thead>
                          <tbody>
                            {completedTasks.map((task) => (
                              <tr key={task.id} style={styles.taskTableRow}>
                                <td style={styles.taskTableCellCheckbox}>
                                  <Checkbox
                                    checked={true}
                                    disabled={true}
                                    size="small"
                                    sx={{
                                      color: 'var(--text-color-text-secondary)',
                                      '&.Mui-checked': {
                                        color: 'var(--primary-color-primary-main)',
                                      },
                                      '&.Mui-disabled': {
                                        color: 'var(--text-color-text-disabled)',
                                      },
                                    }}
                                  />
                                </td>
                                <td style={styles.taskTableCell}>#{task.sfId}</td>
                                <td style={styles.taskTableCell}>{task.taskType}</td>
                                <td style={styles.taskTableCell}>{task.assignedTo}</td>
                                <td style={styles.taskTableCell}>{task.dateCreated}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                )}

                {/* Activity Timeline Tab (only show when in tab mode and tab is active) */}
                {activeTab === 'activityTimeline' && showSidebarAsTab && (
                  <ActivityTimeline />
                )}
              </>
            ) : (
            <div style={styles.emptyState}>
              <OrdersIcon style={{ width: '64px', height: '64px', color: 'var(--text-color-text-secondary)' }} />
                <p style={styles.emptyStateText}>Loading order details...</p>
            </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Activity Timeline (only show when screen is large enough) */}
        {!showSidebarAsTab && (
        <div style={styles.rightSidebar}>
          <div style={styles.sidebarHeader}>
            <p style={styles.sidebarTitle}>Activity Timeline</p>
          </div>
          <div style={styles.sidebarContent}>
            <ActivityTimeline />
          </div>
        </div>
        )}
      </div>

      <Footer />

      {/* Create Task Side Drawer */}
      <SideDrawer
        isOpen={createTaskDrawerOpen}
        onClose={() => setCreateTaskDrawerOpen(false)}
        title="Create a Task"
        width="480px"
      >
        <CreateTaskForm
          patientName={patientName}
          orderId={orderId}
          onSubmit={handleCreateTask}
          onCancel={() => setCreateTaskDrawerOpen(false)}
        />
      </SideDrawer>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity="success"
        onClose={() => setSnackbarOpen(false)}
      />

      {/* Outgoing Call Twilio Window */}
      <TwilioCallWindow
        isOpen={showOutgoingCall}
        onClose={() => setShowOutgoingCall(false)}
        onAccept={() => {}} // Not used for outgoing calls
        onDecline={() => setShowOutgoingCall(false)}
        callerNumber={getPatientPhone()}
        queueName={patientName}
        isConnected={true}
        isOutgoing={true}
      />

      {/* Blood Collection Panel */}
      <BloodCollectionPanel
        isOpen={bloodCollectionPanelOpen}
        onClose={() => setBloodCollectionPanelOpen(false)}
      />
    </div>
  );
};
