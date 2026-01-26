import React, { useEffect, useState } from 'react';

interface TwilioCallWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
  callerNumber?: string;
  queueName?: string;
  isConnected?: boolean;
  isOutgoing?: boolean;
}

// Inject keyframe animation for ringing effect
const injectRingingAnimation = () => {
  const styleId = 'twilio-ringing-animation';
  if (document.getElementById(styleId)) return;
  
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes ring {
      0% { transform: rotate(0deg); }
      10% { transform: rotate(15deg); }
      20% { transform: rotate(-15deg); }
      30% { transform: rotate(15deg); }
      40% { transform: rotate(-15deg); }
      50% { transform: rotate(10deg); }
      60% { transform: rotate(-10deg); }
      70% { transform: rotate(5deg); }
      80% { transform: rotate(-5deg); }
      90% { transform: rotate(0deg); }
      100% { transform: rotate(0deg); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.7; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes ripple {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    
    .twilio-phone-ringing {
      animation: ring 1s ease-in-out infinite;
      transform-origin: center center;
    }
    
    .twilio-pulse {
      animation: pulse 1.5s ease-in-out infinite;
    }
    
    .twilio-ripple {
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: rgba(74, 222, 128, 0.3);
      animation: ripple 1.5s ease-out infinite;
    }
    
    .twilio-ripple-2 {
      animation-delay: 0.5s;
    }
    
    .twilio-ripple-3 {
      animation-delay: 1s;
    }
  `;
  document.head.appendChild(style);
};

export const TwilioCallWindow: React.FC<TwilioCallWindowProps> = ({
  isOpen,
  onClose,
  onAccept,
  onDecline,
  callerNumber = '+1 208-381-2222',
  queueName = 'WH-GC Triage',
  isConnected = false,
  isOutgoing = false,
}) => {
  const status = 'available';
  const [callDuration, setCallDuration] = useState(0);
  const [dialingState, setDialingState] = useState<'dialing' | 'connected'>('dialing');

  useEffect(() => {
    if (isOpen) {
      injectRingingAnimation();
      // Reset states when opening
      if (isOutgoing) {
        setDialingState('dialing');
        setCallDuration(0);
      }
    }
  }, [isOpen, isOutgoing]);

  // Simulate dialing -> connected transition for outgoing calls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOutgoing && isOpen && dialingState === 'dialing') {
      timeout = setTimeout(() => {
        setDialingState('connected');
      }, 2000); // 2 seconds of "dialing" before connecting
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOutgoing, isOpen, dialingState]);

  // Call timer when connected
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const shouldCount = isOutgoing ? (dialingState === 'connected' && isOpen) : (isConnected && isOpen);
    if (shouldCount) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected, isOpen, isOutgoing, dialingState]);

  // Format call duration as MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      width: '340px',
      backgroundColor: '#1a2744',
      borderRadius: '8px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      zIndex: 9999,
      overflow: 'hidden',
      fontFamily: 'Roboto, sans-serif',
    },
    windowTitleBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 12px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e5e5',
    },
    windowTitleLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    windowIcon: {
      width: '16px',
      height: '16px',
    },
    windowTitle: {
      fontSize: '13px',
      fontWeight: 500,
      color: '#333333',
      margin: 0,
    },
    windowActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    windowButton: {
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#666666',
      borderRadius: '4px',
      transition: 'background-color 0.2s',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      backgroundColor: '#232f47',
      borderBottom: '1px solid #3a4a6b',
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    hamburger: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '3px',
      cursor: 'pointer',
    },
    hamburgerLine: {
      width: '18px',
      height: '2px',
      backgroundColor: '#ffffff',
      borderRadius: '1px',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    twilioIcon: {
      width: '20px',
      height: '20px',
    },
    logoText: {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '1px',
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    statusBadge: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#2d3a52',
      padding: '6px 12px',
      borderRadius: '20px',
      border: '1px solid #3a4a6b',
    },
    statusDot: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: status === 'available' ? '#4ade80' : status === 'busy' ? '#f87171' : '#9ca3af',
    },
    timerText: {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: 500,
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#3a4a6b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarIcon: {
      width: '20px',
      height: '20px',
      color: '#9ca3af',
    },
    incomingCall: {
      padding: '20px 16px',
      borderBottom: '1px solid #3a4a6b',
    },
    callRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    callInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    phoneIconContainer: {
      position: 'relative' as const,
    },
    phoneIcon: {
      width: '28px',
      height: '28px',
      color: '#9ca3af',
    },
    callDetails: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '4px',
    },
    phoneNumber: {
      color: '#ffffff',
      fontSize: '18px',
      fontWeight: 600,
      margin: 0,
    },
    queueText: {
      color: '#9ca3af',
      fontSize: '13px',
      margin: 0,
    },
    callActions: {
      display: 'flex',
      gap: '12px',
    },
    acceptButton: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      backgroundColor: '#22c55e',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s, background-color 0.2s',
    },
    declineButton: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      backgroundColor: '#ef4444',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s, background-color 0.2s',
    },
    buttonIcon: {
      width: '20px',
      height: '20px',
      color: '#ffffff',
    },
    tasksSection: {
      padding: '12px 16px',
      borderBottom: '1px solid #3a4a6b',
    },
    tasksHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
    },
    tasksText: {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: 500,
      margin: 0,
    },
    dropdownIcon: {
      width: '12px',
      height: '12px',
      color: '#ffffff',
    },
    taskList: {
      padding: '16px',
      minHeight: '200px',
    },
    divider: {
      height: '4px',
      backgroundColor: '#3a4a6b',
      margin: '0 16px',
    },
    // Connected call styles
    connectedCallSection: {
      padding: '20px 16px',
      backgroundColor: '#1e3a5f',
      borderBottom: '1px solid #3a4a6b',
    },
    connectedBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: '#166534',
      padding: '4px 10px',
      borderRadius: '12px',
      marginBottom: '12px',
    },
    connectedDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#4ade80',
    },
    connectedText: {
      color: '#4ade80',
      fontSize: '12px',
      fontWeight: 500,
    },
    callTimer: {
      color: '#ffffff',
      fontSize: '32px',
      fontWeight: 300,
      margin: '8px 0',
      fontFamily: 'monospace',
    },
    callerName: {
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: 500,
      margin: '0 0 4px 0',
    },
    hangUpButton: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: '#ef4444',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px auto 0',
      transition: 'transform 0.2s, background-color 0.2s',
    },
    hangUpIcon: {
      width: '28px',
      height: '28px',
      color: '#ffffff',
      transform: 'rotate(135deg)',
    },
    callControlsRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      marginTop: '16px',
    },
    callControlButton: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#2d3a52',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s',
    },
    callControlIcon: {
      width: '20px',
      height: '20px',
      color: '#ffffff',
    },
  };

  // Render ringing state
  const renderRingingState = () => (
    <>
      {/* Incoming Call Section */}
      <div style={styles.incomingCall}>
        <div style={styles.callRow}>
          <div style={styles.callInfo}>
            {/* Ringing phone icon with animation */}
            <div style={styles.phoneIconContainer}>
              {/* Ripple effects */}
              <div className="twilio-ripple" style={{ top: 0, left: 0 }} />
              <div className="twilio-ripple twilio-ripple-2" style={{ top: 0, left: 0 }} />
              <div className="twilio-ripple twilio-ripple-3" style={{ top: 0, left: 0 }} />
              {/* Animated phone icon */}
              <svg className="twilio-phone-ringing" style={styles.phoneIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </div>
            <div style={styles.callDetails}>
              <p style={styles.phoneNumber}>{callerNumber}</p>
              <p style={styles.queueText}>Incoming call from {queueName}</p>
            </div>
          </div>
          <div style={styles.callActions}>
            <button 
              className="twilio-pulse"
              style={styles.acceptButton}
              onClick={onAccept}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </button>
            <button 
              style={styles.declineButton}
              onClick={onDecline}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div style={styles.tasksSection}>
        <div style={styles.tasksHeader}>
          <p style={styles.tasksText}>All Tasks</p>
          <svg style={styles.dropdownIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Empty task list area */}
      <div style={styles.taskList} />
    </>
  );

  // Render connected call state
  // Render outgoing call state (dialing or connected)
  const renderOutgoingCallState = () => (
    <>
      <div style={styles.connectedCallSection}>
        {dialingState === 'dialing' ? (
          <>
            {/* Dialing state */}
            <div style={{...styles.connectedBadge, backgroundColor: '#1e40af'}}>
              <div style={{...styles.connectedDot, backgroundColor: '#60a5fa'}} />
              <span style={{...styles.connectedText, color: '#60a5fa'}}>Dialing...</span>
            </div>
            <p style={styles.callerName}>Calling {queueName}</p>
            <p style={styles.phoneNumber}>{callerNumber}</p>
            <p style={{...styles.callTimer, color: '#9ca3af'}}>Connecting...</p>
          </>
        ) : (
          <>
            {/* Connected state */}
            <div style={styles.connectedBadge}>
              <div style={styles.connectedDot} />
              <span style={styles.connectedText}>Connected</span>
            </div>
            <p style={styles.callerName}>{queueName}</p>
            <p style={styles.phoneNumber}>{callerNumber}</p>
            <p style={styles.callTimer}>{formatDuration(callDuration)}</p>
          </>
        )}
        
        {/* Call controls */}
        <div style={styles.callControlsRow}>
          {/* Mute button */}
          <button 
            style={styles.callControlButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a4a6b'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d3a52'}
          >
            <svg style={styles.callControlIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
            </svg>
          </button>
          {/* Hold button */}
          <button 
            style={styles.callControlButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a4a6b'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d3a52'}
          >
            <svg style={styles.callControlIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          {/* Keypad button */}
          <button 
            style={styles.callControlButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a4a6b'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d3a52'}
          >
            <svg style={styles.callControlIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>

        {/* Hang up button */}
        <button 
          style={styles.hangUpButton}
          onClick={onDecline}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg style={styles.hangUpIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
          </svg>
        </button>
      </div>
    </>
  );

  const renderConnectedState = () => (
    <>
      {/* Connected Call Section */}
      <div style={styles.connectedCallSection}>
        <div style={styles.connectedBadge}>
          <div style={styles.connectedDot} />
          <span style={styles.connectedText}>Connected</span>
        </div>
        <p style={styles.callerName}>{queueName}</p>
        <p style={styles.phoneNumber}>{callerNumber}</p>
        <p style={styles.callTimer}>{formatDuration(callDuration)}</p>
        
        {/* Call controls */}
        <div style={styles.callControlsRow}>
          {/* Mute button */}
          <button 
            style={styles.callControlButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a4a6b'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d3a52'}
          >
            <svg style={styles.callControlIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
            </svg>
          </button>
          {/* Hold button */}
          <button 
            style={styles.callControlButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a4a6b'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d3a52'}
          >
            <svg style={styles.callControlIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          {/* Keypad button */}
          <button 
            style={styles.callControlButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3a4a6b'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d3a52'}
          >
            <svg style={styles.callControlIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 1c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12-8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>

        {/* Hang up button */}
        <button 
          style={styles.hangUpButton}
          onClick={onDecline}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg style={styles.hangUpIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
          </svg>
        </button>
      </div>
    </>
  );

  return (
    <div style={styles.container}>
      {/* Window Title Bar (like desktop app) */}
      <div style={styles.windowTitleBar}>
        <div style={styles.windowTitleLeft}>
          <svg style={styles.windowIcon} viewBox="0 0 24 24" fill="#333">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
          </svg>
          <p style={styles.windowTitle}>Twilio</p>
        </div>
        <div style={styles.windowActions}>
          {/* Minimize button */}
          <div 
            style={styles.windowButton}
            onClick={onClose}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="12" height="2" viewBox="0 0 12 2" fill="currentColor">
              <rect width="12" height="2" rx="1"/>
            </svg>
          </div>
          {/* External link button */}
          <div 
            style={styles.windowButton}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.hamburger}>
            <div style={styles.hamburgerLine} />
            <div style={styles.hamburgerLine} />
            <div style={styles.hamburgerLine} />
          </div>
          <div style={styles.logoContainer}>
            {/* Twilio Logo */}
            <svg style={styles.twilioIcon} viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#F22F46"/>
              <circle cx="9" cy="9" r="2" fill="#F22F46"/>
              <circle cx="15" cy="9" r="2" fill="#F22F46"/>
              <circle cx="9" cy="15" r="2" fill="#F22F46"/>
              <circle cx="15" cy="15" r="2" fill="#F22F46"/>
            </svg>
            <span style={styles.logoText}>TWILIO F</span>
            {/* Paper plane icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#f97316">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
            {/* Grid icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#9ca3af">
              <circle cx="6" cy="6" r="2"/>
              <circle cx="12" cy="6" r="2"/>
              <circle cx="18" cy="6" r="2"/>
              <circle cx="6" cy="12" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="18" cy="12" r="2"/>
              <circle cx="6" cy="18" r="2"/>
              <circle cx="12" cy="18" r="2"/>
              <circle cx="18" cy="18" r="2"/>
            </svg>
          </div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.statusBadge}>
            <div style={{...styles.statusDot, backgroundColor: isConnected ? '#f87171' : '#4ade80'}} />
            <span style={styles.timerText}>{isConnected ? 'On Call' : 'Available'}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#9ca3af">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
          <div style={styles.avatar}>
            <svg style={styles.avatarIcon} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Render based on connection state */}
      {isOutgoing 
        ? renderOutgoingCallState() 
        : (isConnected ? renderConnectedState() : renderRingingState())
      }
    </div>
  );
};
