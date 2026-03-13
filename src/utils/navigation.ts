/**
 * Simple Navigation System
 * Manages view state and navigation between screens
 */

export type ViewType = 'dashboard' | 'taskList' | 'orderDetails' | 'clinicView';

export interface NavigationState {
  currentView: ViewType;
  queueId?: string;
  queueName?: string;
  orderId?: string;
  patientName?: string;
  showOverview?: boolean;
  limsId?: string;
  accountName?: string;
}

type NavigationListener = (state: NavigationState) => void;

class NavigationManager {
  private state: NavigationState = {
    currentView: 'dashboard',
  };
  private listeners: NavigationListener[] = [];

  getState(): NavigationState {
    return { ...this.state };
  }

  subscribe(listener: NavigationListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  navigate(view: ViewType, data?: { queueId?: string; queueName?: string; orderId?: string; patientName?: string; showOverview?: boolean; limsId?: string; accountName?: string }): void {
    this.state = {
      currentView: view,
      queueId: data?.queueId,
      queueName: data?.queueName,
      orderId: data?.orderId,
      patientName: data?.patientName,
      showOverview: data?.showOverview,
      limsId: data?.limsId,
      accountName: data?.accountName,
    };
    this.notifyListeners();
  }

  navigateToDashboard(): void {
    this.navigate('dashboard');
  }

  navigateToTaskList(queueId: string, queueName: string): void {
    this.navigate('taskList', { queueId, queueName });
  }

  navigateToOrderDetails(orderId: string, patientName: string, queueId?: string, queueName?: string, showOverview?: boolean): void {
    this.navigate('orderDetails', { orderId, patientName, queueId, queueName, showOverview });
  }

  navigateToClinicView(limsId: string, accountName: string, queueId?: string, queueName?: string): void {
    this.navigate('clinicView', { limsId, accountName, queueId, queueName });
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}

export const navigation = new NavigationManager();
