import React, { useState, useRef, useEffect } from 'react';
import { getAllQueues, Queue } from '../data/queues';
import { SearchIcon } from './Icons';

interface QueueDropdownProps {
  currentQueueId: string;
  currentQueueName: string;
  onQueueSelect: (queueId: string, queueName: string) => void;
  onClose: () => void;
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    marginTop: '8px',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    border: '1px solid var(--component-card-outlined-color-card-outlined-enabled-border)',
    borderRadius: 'var(--radius-radius-md)',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    width: '400px',
    maxHeight: '500px',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    zIndex: 1000,
  },
  searchContainer: {
    padding: 'var(--spacing-space-12)',
    borderBottom: '1px solid var(--component-color-divider)',
  },
  searchInput: {
    width: '100%',
    padding: 'var(--spacing-space-8) var(--spacing-space-12)',
    paddingLeft: '36px',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    fontSize: '15px',
    fontFamily: 'Roboto, sans-serif',
    color: 'var(--text-color-text-primary)',
    outline: 'none',
  },
  searchIcon: {
    position: 'absolute' as const,
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none' as const,
  },
  queueList: {
    overflowY: 'auto' as const,
    maxHeight: '400px',
  },
  queueItem: {
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--component-color-divider)',
    transition: 'background-color 0.2s ease',
  },
  queueItemHovered: {
    backgroundColor: 'var(--action-color-hovered)',
  },
  queueItemActive: {
    backgroundColor: 'var(--action-color-selected)',
  },
  queueName: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  queueCount: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    lineHeight: '20px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
    marginLeft: 'var(--spacing-space-8)',
  },
  noResults: {
    padding: 'var(--spacing-space-24)',
    textAlign: 'center' as const,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    color: 'var(--text-color-text-secondary)',
  },
};

interface QueueItemProps {
  queue: Queue;
  isActive: boolean;
  onClick: () => void;
}

const QueueItem: React.FC<QueueItemProps> = ({ queue, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const itemStyle = {
    ...styles.queueItem,
    ...(isHovered && !isActive ? styles.queueItemHovered : {}),
    ...(isActive ? styles.queueItemActive : {}),
  };

  return (
    <div
      style={itemStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <p style={styles.queueName}>{queue.name}</p>
      <p style={styles.queueCount}>{queue.taskCount} tasks</p>
    </div>
  );
};

export const QueueDropdown: React.FC<QueueDropdownProps> = ({
  currentQueueId,
  currentQueueName,
  onQueueSelect,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allQueues] = useState<Queue[]>(getAllQueues());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter queues based on search term
  const filteredQueues = allQueues.filter((queue) =>
    queue.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleQueueSelect = (queue: Queue) => {
    onQueueSelect(queue.id, queue.name);
    onClose();
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <div ref={dropdownRef} style={styles.dropdown}>
        <div style={styles.searchContainer}>
          <div style={{ position: 'relative' }}>
            <div style={styles.searchIcon}>
              <SearchIcon style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search queues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>
        <div style={styles.queueList}>
          {filteredQueues.length > 0 ? (
            filteredQueues.map((queue) => (
              <QueueItem
                key={queue.id}
                queue={queue}
                isActive={queue.id === currentQueueId}
                onClick={() => handleQueueSelect(queue)}
              />
            ))
          ) : (
            <div style={styles.noResults}>
              No queues found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </>
  );
};
