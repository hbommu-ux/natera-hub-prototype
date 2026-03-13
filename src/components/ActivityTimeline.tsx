import React from 'react';
import { useActivityLog, ActivityLogEntry } from '../context/ActivityLogContext';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-16)',
    padding: 'var(--spacing-space-16)',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-space-32)',
    color: 'var(--text-color-text-secondary)',
  },
  emptyStateText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    margin: 0,
  },
  activityItem: {
    display: 'flex',
    gap: 'var(--spacing-space-12)',
    padding: 'var(--spacing-space-12)',
    borderRadius: 'var(--radius-radius-sm)',
    backgroundColor: 'var(--surface-color-surface-low)',
  },
  activityIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color-primary-main)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'white',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
  },
  activityContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-4)',
  },
  activityAction: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '20px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  activityDetails: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    lineHeight: '18px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  activityActor: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '13px',
    lineHeight: '18px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  activityTimestamp: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    lineHeight: '16px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  changeHighlight: {
    padding: '2px 4px',
    borderRadius: 'var(--radius-radius-sm)',
    backgroundColor: 'rgba(0, 129, 189, 0.1)',
    color: 'var(--primary-color-primary-main)',
    fontWeight: 500,
  },
};

const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const getActivityIcon = (category: ActivityLogEntry['category']): string => {
  switch (category) {
    case 'assigned_pc':
      return '👤';
    case 'kit_order':
      return '📦';
    case 'mp_job':
      return '📅';
    case 'status_change':
      return '🔄';
    default:
      return '•';
  }
};

export const ActivityTimeline: React.FC = () => {
  const { activities } = useActivityLog();

  if (activities.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p style={styles.emptyStateText}>No activity yet</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {activities.map((activity) => (
        <div key={activity.id} style={styles.activityItem}>
          <div style={styles.activityIcon}>
            {getActivityIcon(activity.category)}
          </div>
          <div style={styles.activityContent}>
            <p style={styles.activityAction}>{activity.action}</p>
            
            {activity.details.field && activity.details.oldValue && activity.details.newValue && (
              <p style={styles.activityDetails}>
                Changed <strong>{activity.details.field}</strong> from{' '}
                <span style={styles.changeHighlight}>{activity.details.oldValue}</span> to{' '}
                <span style={styles.changeHighlight}>{activity.details.newValue}</span>
              </p>
            )}
            
            {activity.details.description && (
              <p style={styles.activityDetails}>{activity.details.description}</p>
            )}
            
            <p style={styles.activityActor}>
              by {activity.actor.name}, {activity.actor.title}
            </p>
            
            <p style={styles.activityTimestamp}>
              {formatTimestamp(activity.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
