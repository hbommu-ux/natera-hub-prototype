import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { DashboardScreen } from './components/DashboardScreen'
import { TaskListScreen } from './components/TaskListScreen'
import { OrderDetailsScreen } from './components/OrderDetailsScreen'
import { ClinicViewScreen } from './components/ClinicViewScreen'
import { TwilioCallWindow, CallType } from './components/TwilioCallWindow'
import { ActivityLogProvider } from './context/ActivityLogContext'
import { navigation, NavigationState } from './utils/navigation'
import './styles/globals.css'

// Check URL params and initialize navigation state BEFORE component renders
const getInitialNavState = (): NavigationState => {
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view');
  const orderId = urlParams.get('orderId');
  const patientName = urlParams.get('patientName');
  const showOverview = urlParams.get('showOverview') === 'true';
  const limsId = urlParams.get('limsId');
  const accountName = urlParams.get('accountName');
  const queueId = urlParams.get('queueId');
  const queueName = urlParams.get('queueName');
  
  if (view === 'orderDetails' && orderId && patientName) {
    // Navigate immediately so the state is correct from the start
    navigation.navigateToOrderDetails(orderId, decodeURIComponent(patientName), undefined, undefined, showOverview);
    return navigation.getState();
  }
  
  if (view === 'clinicView' && limsId && accountName) {
    // Navigate to clinic view with queue info if provided
    navigation.navigateToClinicView(
      decodeURIComponent(limsId), 
      decodeURIComponent(accountName),
      queueId || undefined,
      queueName ? decodeURIComponent(queueName) : undefined
    );
    return navigation.getState();
  }
  
  return navigation.getState();
};

// Check if call is active from URL params
const getInitialCallState = (): { isActive: boolean; isConnected: boolean } => {
  const urlParams = new URLSearchParams(window.location.search);
  const callActive = urlParams.get('callActive') === 'true';
  return { isActive: callActive, isConnected: callActive };
};

const App = () => {
  const [navState, setNavState] = useState<NavigationState>(getInitialNavState);
  const initialCallState = getInitialCallState();
  const [showTwilioCall, setShowTwilioCall] = useState(initialCallState.isActive);
  const [isCallConnected, setIsCallConnected] = useState(initialCallState.isConnected);
  const [showCallTypeMenu, setShowCallTypeMenu] = useState(false);
  const [currentCallType, setCurrentCallType] = useState<CallType>('patient');

  useEffect(() => {
    const unsubscribe = navigation.subscribe((state) => {
      setNavState(state);
    });
    return unsubscribe;
  }, []);

  const handleAcceptCall = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    
    if (currentCallType === 'patient') {
      // Open Diana Prince's Order Overview page in a new browser tab with call active
      const dianaPrinceUrl = `${baseUrl}?view=orderDetails&orderId=WkT9xPm3QvZn&patientName=Diana%20Prince&showOverview=true&callActive=true`;
      window.open(dianaPrinceUrl, '_blank');
    } else if (currentCallType === 'clinic') {
      // Open Cleveland Clinic - Lung's Clinic View page in a new browser tab with call active
      const clinicUrl = `${baseUrl}?view=clinicView&limsId=LIMS%20ID%2067345&accountName=Cleveland%20Clinic%20-%20Lung&queueId=q009&queueName=All%20Oncology%20Support%20Tickets%20-%20Focus&callActive=true`;
      window.open(clinicUrl, '_blank');
    }
    
    // Close the Twilio call window in this tab
    setShowTwilioCall(false);
  };

  const handleDeclineCall = () => {
    setShowTwilioCall(false);
  };

  const handleCallTypeSelect = (callType: CallType) => {
    setCurrentCallType(callType);
    setShowCallTypeMenu(false);
    setShowTwilioCall(true);
  };

  const getCallDetails = () => {
    if (currentCallType === 'patient') {
      return {
        callerNumber: '+1 512-902-1215',
        queueName: 'Diana Prince',
      };
    } else {
      return {
        callerNumber: '+1 216-444-2200',
        queueName: 'Cleveland Clinic - Lung',
      };
    }
  };

  const callDetails = getCallDetails();

  const triggerButtonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#0081bd',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'Roboto, sans-serif',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 1000,
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const menuStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '70px',
    right: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1001,
    overflow: 'hidden',
    minWidth: '200px',
  };

  const menuItemStyle: React.CSSProperties = {
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Roboto, sans-serif',
    cursor: 'pointer',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: '#ffffff',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const renderCurrentScreen = () => {
    if (navState.currentView === 'taskList' && navState.queueId && navState.queueName) {
      return <TaskListScreen queueId={navState.queueId} queueName={navState.queueName} />;
    }

    if (navState.currentView === 'orderDetails' && navState.orderId && navState.patientName) {
      return <OrderDetailsScreen orderId={navState.orderId} patientName={navState.patientName} queueId={navState.queueId} queueName={navState.queueName} showOverview={navState.showOverview} />;
    }

    if (navState.currentView === 'clinicView' && navState.limsId && navState.accountName) {
      return <ClinicViewScreen limsId={navState.limsId} accountName={navState.accountName} queueId={navState.queueId} queueName={navState.queueName} />;
    }

    return <DashboardScreen />;
  };

  return (
    <ActivityLogProvider>
      {renderCurrentScreen()}
      
      {/* Twilio Call Window */}
      <TwilioCallWindow
        isOpen={showTwilioCall}
        onClose={() => setShowTwilioCall(false)}
        onAccept={handleAcceptCall}
        onDecline={handleDeclineCall}
        callerNumber={callDetails.callerNumber}
        queueName={callDetails.queueName}
        isConnected={isCallConnected}
        callType={currentCallType}
      />

      {/* Call Type Selection Menu */}
      {showCallTypeMenu && (
        <div style={menuStyle}>
          <div
            style={menuItemStyle}
            onClick={() => handleCallTypeSelect('patient')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0081bd">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>Patient Call</span>
          </div>
          <div
            style={{...menuItemStyle, borderBottom: 'none'}}
            onClick={() => handleCallTypeSelect('clinic')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#0081bd">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            <span>Clinic Call</span>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      {!showTwilioCall && (
        <button
          style={triggerButtonStyle}
          onClick={() => setShowCallTypeMenu(!showCallTypeMenu)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
          </svg>
          Simulate Incoming Call
        </button>
      )}
    </ActivityLogProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
