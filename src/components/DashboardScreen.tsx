import React from 'react';
import { Header } from './Header';
import { QueueCard } from './QueueCard';
import { QueueTable } from './QueueTable';
import { Footer } from './Footer';
import { getQueueById } from '../data/queues';

const styles = {
  container: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    minHeight: '100vh',
    position: 'relative' as const,
    paddingBottom: '60px', // Space for footer
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    padding: 'var(--spacing-space-16) 0',
    gap: '10px',
  },
  sectionHeader: {
    padding: 'var(--spacing-space-16) var(--spacing-space-24) 0 var(--spacing-space-24)',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '17px',
    lineHeight: '20px',
    letterSpacing: '0.15px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  cardGrid: {
    display: 'flex',
    gap: 'var(--spacing-space-12)',
    padding: 'var(--spacing-space-24)',
    width: '100%',
    flexWrap: 'wrap' as const,
  },
};

export const DashboardScreen: React.FC = () => {
  // Get assigned queues from database
  const assignedQueueIds = ['q003', 'q005', 'q008']; // Blood Collection, Clinic Managed, Organ Health
  const assignedQueues = assignedQueueIds
    .map(id => getQueueById(id))
    .filter(queue => queue !== undefined);

  return (
    <div style={styles.container}>
      <Header />
      
      <div style={styles.content}>
        <div style={styles.sectionHeader}>
          <p style={styles.sectionTitle}>Assigned queues</p>
        </div>
        
        <div style={styles.cardGrid}>
          {assignedQueues.map((queue) => (
            <QueueCard
              key={queue.id}
              queueId={queue.id}
              title={queue.name}
              count={`${queue.taskCount} tasks`}
            />
          ))}
        </div>

        <div style={styles.sectionHeader}>
          <p style={styles.sectionTitle}>All queues</p>
        </div>
        
        <QueueTable />
      </div>
      
      <Footer />
    </div>
  );
};
