import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { getTasksByQueueId, getMyTasksByQueueId, createTask } from '../data/tasks';
import { isSampleCollectionQueue } from '../data/queues';
import { navigation } from '../utils/navigation';
import { QueueDropdown } from './QueueDropdown';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { SideDrawer } from './SideDrawer';
import { CreateTaskForm, type CreateTaskData } from './CreateTaskForm';
import { Snackbar } from './Snackbar';
import {
  ArrowDownwardIcon,
  ArrowDropDownIcon,
  SearchIcon,
  FilterSortIcon,
  ViewCardIcon,
  AddIcon,
} from './Icons';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface TaskListScreenProps {
  queueId: string;
  queueName: string;
}

const styles = {
  container: {
    backgroundColor: 'var(--surface-color-surface-low)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
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
  toolbar: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-space-16)',
    padding: 'var(--spacing-space-16) var(--spacing-space-24)',
    backgroundColor: 'var(--surface-color-surface-low)',
  },
  queueNameContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative' as const,
  },
  queueTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '21px',
    lineHeight: '25px',
    letterSpacing: '0.15px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
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
  content: {
    flex: 1,
    padding: 'var(--spacing-space-16) var(--spacing-space-24)',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 var(--spacing-space-16)',
    marginBottom: '8px',
  },
  tableTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '17px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  filtersContainer: {
    display: 'flex',
    gap: 'var(--spacing-space-8)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chip: {
    backgroundColor: 'var(--component-chip-color-chip-enabled-fill)',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 'var(--spacing-space-4)',
    borderRadius: 'var(--radius-radius-sm)',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s ease',
  },
  chipContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 'var(--spacing-space-8)',
    paddingRight: 'var(--spacing-space-8)',
    paddingTop: '3px',
    paddingBottom: '3px',
  },
  chipLabel: {
    fontFamily: 'var(--font-family-font-component)',
    fontWeight: 400,
    fontSize: 'var(--font-size-font-size-400)',
    lineHeight: 'var(--font-line-height-lh-300)',
    letterSpacing: '0.15px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-space-48)',
    minHeight: '400px',
  },
  emptyStateIcon: {
    width: '120px',
    height: '120px',
    marginBottom: 'var(--spacing-space-24)',
    opacity: 0.3,
  },
  emptyStateTitle: {
    fontFamily: 'var(--font-family-font-headline)',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '32px',
    color: 'var(--text-color-text-primary)',
    margin: '0 0 var(--spacing-space-8) 0',
  },
  emptyStateMessage: {
    fontFamily: 'var(--font-family-font-body)',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
    textAlign: 'center' as const,
    maxWidth: '400px',
  },
  groupByDropdownContainer: {
    position: 'relative' as const,
  },
  groupByDropdown: {
    position: 'absolute' as const,
    top: 'calc(100% + 8px)',
    right: 0,
    backgroundColor: 'var(--surface-color-surface-lowest)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-md)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '220px',
    zIndex: 1000,
    padding: 'var(--spacing-space-8)',
  },
  groupByOption: {
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    cursor: 'pointer',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
    borderRadius: 'var(--radius-radius-sm)',
    transition: 'background-color 0.2s ease',
  },
  groupByOptionActive: {
    backgroundColor: 'var(--action-color-selected)',
    fontWeight: 500,
  },
  groupByHeader: {
    padding: 'var(--spacing-space-16)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-color-text-secondary)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  groupHeader: {
    backgroundColor: 'var(--surface-color-surface-medium)',
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    borderTop: '1px solid var(--component-color-divider)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1,
  },
  tableWrapper: {
    border: '1px solid var(--component-card-outlined-color-card-outlined-enabled-border)',
    borderRadius: 'var(--radius-radius-md)',
    overflow: 'hidden',
    backgroundColor: 'var(--surface-color-surface-lowest)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    backgroundColor: 'var(--surface-color-surface-low)',
    padding: 'var(--spacing-space-4) var(--spacing-space-16)',
    textAlign: 'left' as const,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
    letterSpacing: '0.25px',
  },
  td: {
    padding: 'var(--spacing-space-16)',
    borderBottom: '1px solid var(--component-color-divider)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
    letterSpacing: '0.25px',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  patientNameCell: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },
  patientName: {
    color: 'var(--text-color-text-link)',
    fontSize: '15px',
    fontWeight: 400,
  },
  patientDob: {
    color: 'var(--text-color-text-primary)',
    fontSize: '15px',
    fontWeight: 400,
  },
  accountCell: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },
  accountName: {
    color: 'var(--text-color-text-primary)',
    fontSize: '15px',
  },
  limsId: {
    color: 'var(--text-color-text-link)',
    textDecoration: 'underline',
    fontSize: '15px',
  },
  tableFooter: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderTop: '1px solid var(--component-color-divider)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 'var(--spacing-space-16)',
    gap: 'var(--spacing-space-32)',
  },
  footerText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  rowsPerPage: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-space-8)',
  },
  dropdown: {
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    padding: '0 var(--spacing-space-8) 0 var(--spacing-space-12)',
    display: 'flex',
    alignItems: 'center',
    height: '32px',
  },
  paginationActions: {
    display: 'flex',
    gap: 'var(--spacing-space-16)',
    alignItems: 'center',
  },
};

const EmptyState: React.FC = () => {
  return (
    <div style={styles.emptyState}>
      <svg
        style={styles.emptyStateIcon}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
        <path d="M7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/>
      </svg>
      <h2 style={styles.emptyStateTitle}>No Tasks to Display</h2>
      <p style={styles.emptyStateMessage}>
        For the purpose of this prototype, detailed task information is not available for this queue. 
        To explore the full task view with complete data, please navigate to <strong>Blood Collection Required</strong> or <strong>All Onc MI Cases (MIS Integration)</strong>.
      </p>
    </div>
  );
};

interface TaskRowProps {
  task: any;
  showAssignedTo: boolean;
  queueId: string;
  queueName: string;
  isHighlighted?: boolean;
}

const TaskRow: React.FC<TaskRowProps> = ({ task, showAssignedTo, queueId, queueName, isHighlighted }) => {
  const [isHovered, setIsHovered] = useState(false);

  const rowStyle: React.CSSProperties = {
    backgroundColor: isHighlighted 
      ? 'var(--component-button-color-button-tonal-fill)' 
      : isHovered 
        ? 'var(--action-color-hovered)' 
        : 'transparent',
    cursor: 'pointer',
    transition: 'background-color 1s ease',
  };

  const handleRowClick = () => {
    navigation.navigateToOrderDetails(task.orderId, task.patientName, queueId, queueName);
  };

  return (
    <tr
      style={rowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleRowClick}
    >
      <td style={styles.td}>{task.sfId}</td>
      <td style={styles.td}>{task.orderId}</td>
      <td style={{...styles.td, padding: '10px 16px'}}>
        <div style={styles.patientNameCell}>
          <span style={styles.patientName}>{task.patientName}</span>
          <span style={styles.patientDob}>{task.patientDob}</span>
        </div>
      </td>
      <td style={styles.td}>{task.testNames}</td>
      <td style={styles.td}>{task.edoc}</td>
      <td style={styles.td}>{task.taskType}</td>
      <td style={{...styles.td, padding: '10px 16px'}}>
        <div style={styles.accountCell}>
          <span style={styles.accountName}>{task.accountName}</span>
          <span style={styles.limsId}>LIMS ID {task.limsId}</span>
        </div>
      </td>
      {showAssignedTo && (
        <td style={styles.td}>{task.assignedTo}</td>
      )}
    </tr>
  );
};

export const TaskListScreen: React.FC<TaskListScreenProps> = ({ queueId, queueName }) => {
  const [activeTab, setActiveTab] = useState<'my' | 'all'>('my');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [groupBy, setGroupBy] = useState<string | null>(null);
  const [showGroupByDropdown, setShowGroupByDropdown] = useState(false);
  const [createTaskDrawerOpen, setCreateTaskDrawerOpen] = useState(false);
  const [selectedTaskForCreate, setSelectedTaskForCreate] = useState<{ patientName: string; orderId: string } | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [taskRefreshKey, setTaskRefreshKey] = useState(0); // Used to trigger re-fetch
  const [highlightedTaskId, setHighlightedTaskId] = useState<string | null>(null);

  // Clear highlight after 1 second
  useEffect(() => {
    if (highlightedTaskId) {
      const timer = setTimeout(() => {
        setHighlightedTaskId(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [highlightedTaskId]);

  // Check if this is a sample collection queue
  const isSampleCollection = isSampleCollectionQueue(queueId);

  // Re-fetch tasks when queueId or refreshKey changes
  const allTasks = getTasksByQueueId(queueId);
  const myTasks = getMyTasksByQueueId(queueId);
  
  // Force re-render when taskRefreshKey changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _refresh = taskRefreshKey;
  
  // Use the appropriate task list based on active tab
  let displayTasks = activeTab === 'my' ? myTasks : allTasks;
  
  // Apply search filter if there's a search query
  if (searchQuery) {
    displayTasks = displayTasks.filter(task => 
      task.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.sfId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.taskType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  const totalTasks = allTasks.length;
  const myTasksCount = myTasks.length;
  
  // Group tasks if groupBy is selected
  const groupedTasks: { [key: string]: any[] } = {};
  if (groupBy) {
    displayTasks.forEach(task => {
      const groupKey = task[groupBy] || 'Ungrouped';
      if (!groupedTasks[groupKey]) {
        groupedTasks[groupKey] = [];
      }
      groupedTasks[groupKey].push(task);
    });
  }
  
  // Show all tasks without pagination
  const currentTasks = displayTasks;

  // Reset dropdown when queue changes
  useEffect(() => {
    setShowDropdown(false);
    setShowGroupByDropdown(false);
    setGroupBy(null);
    setSearchQuery('');
  }, [queueId]);

  // Close group by dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showGroupByDropdown && !target.closest('[data-group-by-dropdown]')) {
        setShowGroupByDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showGroupByDropdown]);

  const handleQueueNameClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleQueueSelect = (newQueueId: string, newQueueName: string) => {
    navigation.navigateToTaskList(newQueueId, newQueueName);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  const handleNateraHubClick = () => {
    navigation.navigateToDashboard();
  };

  const handleCreateTaskClick = () => {
    // Open drawer without pre-selecting - user will choose patient/order
    setSelectedTaskForCreate({ patientName: '', orderId: '' });
    setCreateTaskDrawerOpen(true);
  };

  const handleCreateTaskSubmit = (taskData: CreateTaskData) => {
    // Create the task in the data layer
    const { task } = createTask({
      patientName: taskData.patientName,
      orderId: taskData.orderId,
      taskType: taskData.taskType,
      assignedTo: taskData.assignedTo,
      dueDate: taskData.dueDate,
      queueId: queueId,
    });
    
    // Close the drawer
    setCreateTaskDrawerOpen(false);
    setSelectedTaskForCreate(null);
    
    // Refresh the task list
    setTaskRefreshKey(prev => prev + 1);
    
    // Highlight the newly created task
    setHighlightedTaskId(task.id);
    
    // Show success snackbar
    setSnackbarMessage('Task created successfully!');
    setSnackbarOpen(true);
  };

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
          <div style={styles.breadcrumbItem}>
            <CheckCircleIcon style={styles.breadcrumbIcon} />
            <span style={{...styles.breadcrumbText, ...styles.breadcrumbTextActive}}>Tasks</span>
          </div>
        </div>
      </div>

      <div style={styles.toolbar}>
        <div style={styles.queueNameContainer} onClick={handleQueueNameClick}>
          <h1 style={styles.queueTitle}>{queueName}</h1>
          <ArrowDropDownIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
          {showDropdown && (
            <QueueDropdown
              currentQueueId={queueId}
              currentQueueName={queueName}
              onQueueSelect={handleQueueSelect}
              onClose={handleDropdownClose}
            />
          )}
        </div>

        <div style={styles.tabsContainer}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'my' ? styles.tabActive : styles.tabInactive),
            }}
            onClick={() => setActiveTab('my')}
          >
            MY TASKS ({myTasksCount})
            {activeTab === 'my' && <div style={styles.tabIndicator} />}
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === 'all' ? styles.tabActive : styles.tabInactive),
            }}
            onClick={() => setActiveTab('all')}
          >
            ALL TASKS ({totalTasks})
            {activeTab === 'all' && <div style={styles.tabIndicator} />}
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {!isSampleCollection ? (
          <EmptyState />
        ) : (
          <>
            <div style={styles.tableHeader}>
              <p style={styles.tableTitle}>Showing all tasks</p>
              
              <div style={styles.filtersContainer}>
            <IconButton
              size="medium"
              ariaLabel="Search tasks"
              onClick={() => {
                const query = prompt('Enter search query:');
                if (query !== null) setSearchQuery(query);
              }}
            >
              <SearchIcon style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
            </IconButton>

            <button 
              style={styles.chip}
              onClick={() => setShowFilters(!showFilters)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--action-color-hovered)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--component-chip-color-chip-enabled-fill)';
              }}
            >
              <FilterSortIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
              <div style={styles.chipContent}>
                <p style={styles.chipLabel}>Filters</p>
              </div>
            </button>

            <div style={styles.groupByDropdownContainer} data-group-by-dropdown>
              <button 
                style={styles.chip}
                onClick={() => setShowGroupByDropdown(!showGroupByDropdown)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--action-color-hovered)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--component-chip-color-chip-enabled-fill)';
                }}
              >
                <ViewCardIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
                <div style={styles.chipContent}>
                  <p style={styles.chipLabel}>
                    Group by{groupBy && `: ${
                      groupBy === 'orderId' ? 'Order ID' :
                      groupBy === 'patientName' ? 'Patient Name' :
                      groupBy === 'testNames' ? 'Test Names' :
                      groupBy === 'edoc' ? 'EDOC' :
                      groupBy === 'taskType' ? 'Task Type' :
                      groupBy === 'accountName' ? 'Account Name' :
                      groupBy
                    }`}
                  </p>
                </div>
              </button>

              {showGroupByDropdown && (
                <div style={styles.groupByDropdown}>
                  <div style={styles.groupByHeader}>Group by</div>
                  {['orderId', 'patientName', 'testNames', 'edoc', 'taskType', 'accountName'].map((option) => {
                    const labels: { [key: string]: string } = {
                      orderId: 'Order ID',
                      patientName: 'Patient Name',
                      testNames: 'Test Names',
                      edoc: 'EDOC',
                      taskType: 'Task Type',
                      accountName: 'Account Name',
                    };
                    return (
                      <div
                        key={option}
                        style={{
                          ...styles.groupByOption,
                          ...(groupBy === option ? styles.groupByOptionActive : {}),
                        }}
                        onClick={() => {
                          setGroupBy(groupBy === option ? null : option);
                          setShowGroupByDropdown(false);
                        }}
                        onMouseEnter={(e) => {
                          if (groupBy !== option) {
                            e.currentTarget.style.backgroundColor = 'var(--action-color-hovered)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (groupBy !== option) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        {labels[option]}
                      </div>
                    );
                  })}
                  <div
                    style={{
                      ...styles.groupByOption,
                      color: 'var(--primary-color-primary-main)',
                      borderTop: '1px solid var(--component-color-divider)',
                      marginTop: 'var(--spacing-space-8)',
                      paddingTop: 'var(--spacing-space-12)',
                    }}
                    onClick={() => {
                      setGroupBy(null);
                      setShowGroupByDropdown(false);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--action-color-hovered)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Clear grouping
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="outlined"
              size="medium"
              startIcon={<AddIcon style={{ width: '18px', height: '18px' }} />}
              onClick={() => handleCreateTaskClick()}
            >
              Create a task
            </Button>
          </div>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}># SF-ID</th>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Patient Name</th>
                <th style={styles.th}>Test Names</th>
                <th style={styles.th}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    EDOC
                    <ArrowDownwardIcon style={{ width: '18px', height: '18px' }} />
                  </div>
                </th>
                <th style={styles.th}>Task Type</th>
                <th style={styles.th}>Account name</th>
                {activeTab === 'all' && (
                  <th style={styles.th}>Assigned to</th>
                )}
              </tr>
            </thead>
            <tbody>
              {groupBy ? (
                // Render grouped tasks
                Object.keys(groupedTasks).sort().map((groupKey) => (
                  <React.Fragment key={groupKey}>
                    <tr>
                      <td colSpan={activeTab === 'all' ? 8 : 7} style={styles.groupHeader}>
                        {groupKey} ({groupedTasks[groupKey].length} tasks)
                      </td>
                    </tr>
                    {groupedTasks[groupKey].map((task) => (
                      <TaskRow key={task.id} task={task} showAssignedTo={activeTab === 'all'} queueId={queueId} queueName={queueName} isHighlighted={task.id === highlightedTaskId} />
                    ))}
                  </React.Fragment>
                ))
              ) : (
                // Render ungrouped tasks
                currentTasks.map((task) => (
                  <TaskRow key={task.id} task={task} showAssignedTo={activeTab === 'all'} queueId={queueId} queueName={queueName} isHighlighted={task.id === highlightedTaskId} />
                ))
              )}
            </tbody>
          </table>

          <div style={styles.tableFooter}>
            <p style={styles.footerText}>
              Showing {currentTasks.length} of {activeTab === 'my' ? myTasksCount : totalTasks} tasks
              {searchQuery && ` (filtered)`}
              {groupBy && ` · Grouped by ${
                groupBy === 'orderId' ? 'Order ID' :
                groupBy === 'patientName' ? 'Patient Name' :
                groupBy === 'testNames' ? 'Test Names' :
                groupBy === 'edoc' ? 'EDOC' :
                groupBy === 'taskType' ? 'Task Type' :
                groupBy === 'accountName' ? 'Account Name' :
                groupBy
              }`}
            </p>
          </div>
        </div>
          </>
        )}
      </div>

      <Footer />

      {/* Create Task Side Drawer */}
      <SideDrawer
        isOpen={createTaskDrawerOpen}
        onClose={() => {
          setCreateTaskDrawerOpen(false);
          setSelectedTaskForCreate(null);
        }}
        title="Create a Task"
        width="480px"
      >
        {selectedTaskForCreate && (
          <CreateTaskForm
            patientName={selectedTaskForCreate.patientName}
            orderId={selectedTaskForCreate.orderId}
            onSubmit={handleCreateTaskSubmit}
            onCancel={() => {
              setCreateTaskDrawerOpen(false);
              setSelectedTaskForCreate(null);
            }}
          />
        )}
      </SideDrawer>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity="success"
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};
