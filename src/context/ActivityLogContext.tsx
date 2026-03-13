import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ActivityLogEntry {
  id: string;
  timestamp: Date;
  action: string;
  actor: {
    name: string;
    title: string;
  };
  details: {
    field?: string;
    oldValue?: string;
    newValue?: string;
    description?: string;
  };
  category: 'assigned_pc' | 'kit_order' | 'mp_job' | 'status_change' | 'general';
}

interface ActivityLogContextType {
  activities: ActivityLogEntry[];
  addActivity: (activity: Omit<ActivityLogEntry, 'id' | 'timestamp'>) => void;
  clearActivities: () => void;
}

const ActivityLogContext = createContext<ActivityLogContextType | undefined>(undefined);

export const ActivityLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<ActivityLogEntry[]>([]);

  const addActivity = (activity: Omit<ActivityLogEntry, 'id' | 'timestamp'>) => {
    const newActivity: ActivityLogEntry = {
      ...activity,
      id: `activity-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const clearActivities = () => {
    setActivities([]);
  };

  return (
    <ActivityLogContext.Provider value={{ activities, addActivity, clearActivities }}>
      {children}
    </ActivityLogContext.Provider>
  );
};

export const useActivityLog = () => {
  const context = useContext(ActivityLogContext);
  if (!context) {
    throw new Error('useActivityLog must be used within an ActivityLogProvider');
  }
  return context;
};
