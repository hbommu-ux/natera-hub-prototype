import React, { useState } from 'react';
import { ASSETS } from './assets';
import { navigation } from '../utils/navigation';
import { Button } from './Button';

interface QueueCardProps {
  title: string;
  count: string;
  overline?: string;
  queueId?: string;
}

const styles = {
  card: {
    backgroundColor: 'var(--component-card-outlined-color-card-outlined-enabled-fill)',
    border: '1px solid var(--component-card-outlined-color-card-outlined-enabled-border)',
    borderRadius: 'var(--radius-radius-md)',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '224px',
    width: '286px',
    overflow: 'hidden',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  cardHeader: {
    display: 'flex',
    flex: '1 0 0',
    gap: 'var(--spacing-space-16)',
    alignItems: 'flex-start',
    padding: 'var(--spacing-space-16)',
    width: '100%',
  },
  content: {
    display: 'flex',
    flex: '1 0 0',
    flexDirection: 'column' as const,
    gap: '6px',
    alignItems: 'flex-start',
  },
  overlineContainer: {
    display: 'flex',
    width: '100%',
    padding: '2px 0',
  },
  overlineText: {
    flex: '1 0 0',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '16px',
    letterSpacing: '1.5px',
    color: 'var(--text-color-text-secondary)',
    textTransform: 'uppercase' as const,
    margin: 0,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-space-4)',
    width: '100%',
  },
  titleText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '25px',
    lineHeight: '30px',
    color: 'var(--text-color-text-primary)',
    margin: 0,
  },
  subtitleText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '80px',
    width: '80px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-radius-sm)',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    gap: 'var(--spacing-space-8)',
    padding: 'var(--spacing-space-8)',
  },
};

export const QueueCard: React.FC<QueueCardProps> = ({ title, count, overline = 'Queue', queueId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    ...styles.card,
    backgroundColor: isHovered 
      ? 'var(--component-card-outlined-color-card-outlined-hovered-fill)' 
      : 'var(--component-card-outlined-color-card-outlined-enabled-fill)',
    borderColor: isHovered 
      ? 'var(--component-card-outlined-color-card-outlined-hovered-border)' 
      : 'var(--component-card-outlined-color-card-outlined-enabled-border)',
    transition: 'background-color 0.2s ease, border-color 0.2s ease',
  };

  const handleClick = () => {
    if (queueId) {
      navigation.navigateToTaskList(queueId, title);
    }
  };

  return (
    <a 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div style={styles.cardHeader}>
        <div style={styles.content}>
          <div style={styles.overlineContainer}>
            <p style={styles.overlineText}>{overline}</p>
          </div>
          <div style={styles.textContainer}>
            <p style={styles.titleText}>{title}</p>
            <p style={styles.subtitleText}>{count}</p>
          </div>
        </div>
        <div style={styles.imageContainer}>
           <img src={ASSETS.img8} alt="" style={styles.image} />
        </div>
      </div>
      <div style={styles.cardFooter}>
        <div style={styles.buttonContainer}>
          <Button variant="text" size="small">
            Go to queue
          </Button>
        </div>
      </div>
    </a>
  );
};
