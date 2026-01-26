import React, { useState } from 'react';
import { 
  ArrowDownwardIcon, 
  ArrowDropDownIcon, 
  FirstPageIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  LastPageIcon 
} from './Icons';
import { getAllQueues } from '../data/queues';
import { navigation } from '../utils/navigation';
import { IconButton as StyledIconButton } from './IconButton';
import { Select, SelectOption } from './Select';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    width: '100%',
    padding: '0 var(--spacing-space-24)',
  },
  tableOutline: {
    border: '1px solid var(--component-card-outlined-color-card-outlined-enabled-border)',
    borderRadius: 'var(--radius-radius-sm)',
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    backgroundColor: 'var(--surface-color-surface-lowest)',
  },
  th: {
    backgroundColor: 'var(--surface-color-surface-low)',
    padding: 'var(--spacing-space-8) var(--spacing-space-16)',
    textAlign: 'left' as const,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
    lineHeight: '24px',
    letterSpacing: '0.25px',
    borderBottom: 'none', 
  },
  td: {
    padding: '16px', // 10px vertical padding + cell height adjustment
    borderBottom: '1px solid var(--component-color-divider)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-primary)',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    height: '72px',
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
    height: '32px', // Inferred
  },
  paginationActions: {
    display: 'flex',
    gap: 'var(--spacing-space-16)',
    alignItems: 'center',
  }
};

interface TableRowProps {
  row: { id: string; name: string; taskCount: number; lastUpdated: string; ownedBy: string };
}

const TableRow: React.FC<TableRowProps> = ({ row }) => {
  const [isHovered, setIsHovered] = useState(false);

  const rowStyle = {
    backgroundColor: isHovered ? 'var(--action-color-hovered)' : 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  const handleClick = () => {
    navigation.navigateToTaskList(row.id, row.name);
  };

  return (
    <tr 
      style={rowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <td style={styles.td}>{row.name}</td>
      <td style={styles.td}>{row.taskCount}</td>
      <td style={styles.td}>{row.lastUpdated}</td>
      <td style={styles.td}>{row.ownedBy}</td>
    </tr>
  );
};


export const QueueTable: React.FC = () => {
  const queues = getAllQueues();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate pagination
  const totalQueues = queues.length;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalQueues);
  const currentQueues = queues.slice(startIndex, endIndex);

  return (
    <div style={styles.container}>
      <div style={styles.tableOutline}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Queue name</th>
              <th style={styles.th}>No. of tasks</th>
              <th style={styles.th}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                   Updated
                   <ArrowDownwardIcon style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
                </div>
              </th>
              <th style={styles.th}>Owned by</th>
            </tr>
          </thead>
          <tbody>
            {currentQueues.map((queue) => (
              <TableRow key={queue.id} row={queue} />
            ))}
          </tbody>
        </table>
        
        <div style={styles.tableFooter}>
           <div style={styles.rowsPerPage}>
              <p style={styles.footerText}>Rows per page</p>
              <div style={styles.dropdown}>
                 <p style={styles.footerText}>{rowsPerPage}</p>
                 <ArrowDropDownIcon style={{ width: '24px', height: '24px', marginLeft: '8px', color: 'var(--color-content-high-emphasis)' }} />
              </div>
           </div>
           
           <p style={styles.footerText}>{startIndex + 1}–{endIndex} of {totalQueues}</p>
           
           <div style={styles.paginationActions}>
              <StyledIconButton size="medium" ariaLabel="First page" onClick={() => setCurrentPage(1)}>
                <FirstPageIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
              </StyledIconButton>
              <StyledIconButton size="medium" ariaLabel="Previous page" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                <ChevronLeftIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
              </StyledIconButton>
              <StyledIconButton size="medium" ariaLabel="Next page" onClick={() => setCurrentPage(Math.min(Math.ceil(totalQueues / rowsPerPage), currentPage + 1))}>
                <ChevronRightIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
              </StyledIconButton>
              <StyledIconButton size="medium" ariaLabel="Last page" onClick={() => setCurrentPage(Math.ceil(totalQueues / rowsPerPage))}>
                <LastPageIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
              </StyledIconButton>
           </div>
        </div>
      </div>
    </div>
  );
};
