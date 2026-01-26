import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { DashboardScreen } from './components/DashboardScreen'
import { TaskListScreen } from './components/TaskListScreen'
import { OrderDetailsScreen } from './components/OrderDetailsScreen'
import { TwilioCallWindow } from './components/TwilioCallWindow'
import { navigation, NavigationState } from './utils/navigation'
import './styles/globals.css'

// Check URL params and initialize navigation state BEFORE component renders
const getInitialNavState = (): NavigationState => {
  const urlParams = new URLSearchParams(window.location.search);
  const view = urlParams.get('view');
  const orderId = urlParams.get('orderId');
  const patientName = urlParams.get('patientName');
  const showOverview = urlParams.get('showOverview') === 'true';
  
  if (view === 'orderDetails' && orderId && patientName) {
    // Navigate immediately so the state is correct from the start
    navigation.navigateToOrderDetails(orderId, decodeURIComponent(patientName), undefined, undefined, showOverview);
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

  useEffect(() => {
    const unsubscribe = navigation.subscribe((state) => {
      setNavState(state);
    });
    return unsubscribe;
  }, []);

  const handleAcceptCall = () => {
    // Open Diana Prince's Order Overview page in a new browser tab with call active
    const baseUrl = window.location.origin + window.location.pathname;
    const dianaPrinceUrl = `${baseUrl}?view=orderDetails&orderId=WkT9xPm3QvZn&patientName=Diana%20Prince&showOverview=true&callActive=true`;
    window.open(dianaPrinceUrl, '_blank');
    
    // Close the Twilio call window in this tab
    setShowTwilioCall(false);
  };

  const handleDeclineCall = () => {
    setShowTwilioCall(false);
  };

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

  const renderCurrentScreen = () => {
    if (navState.currentView === 'taskList' && navState.queueId && navState.queueName) {
      return <TaskListScreen queueId={navState.queueId} queueName={navState.queueName} />;
    }

    if (navState.currentView === 'orderDetails' && navState.orderId && navState.patientName) {
      return <OrderDetailsScreen orderId={navState.orderId} patientName={navState.patientName} queueId={navState.queueId} queueName={navState.queueName} showOverview={navState.showOverview} />;
    }

    return <DashboardScreen />;
  };

  return (
    <>
      {renderCurrentScreen()}
      
      {/* Twilio Call Window - Always from Diana Prince */}
      <TwilioCallWindow
        isOpen={showTwilioCall}
        onClose={() => setShowTwilioCall(false)}
        onAccept={handleAcceptCall}
        onDecline={handleDeclineCall}
        callerNumber="+1 512-902-1215"
        queueName="Diana Prince"
        isConnected={isCallConnected}
      />

      {/* Trigger Button */}
      {!showTwilioCall && (
        <button
          style={triggerButtonStyle}
          onClick={() => setShowTwilioCall(true)}
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
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
