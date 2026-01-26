/**
 * Tasks Database
 * Mock database for task information
 */

import { getQueueById, isSampleCollectionQueue } from './queues';
import { TASK_TYPES } from './constants';

export interface Task {
  id: string;
  sfId: string;
  orderId: string;
  patientName: string;
  patientDob: string;
  testNames: string;
  edoc: string;
  taskType: string;
  accountName: string;
  clinician: string;
  source: string;
  createdBy: string;
  createdAt: string;
  actualCollectionDate: string;
  resultsExpected: string;
  limsId: string;
  queueId: string;
  assignedToMe: boolean;
  assignedTo: string;
  status: 'active' | 'completed';
}

/**
 * Generate mock tasks for a queue
 */
const generateTasksForQueue = (queueId: string, count: number): Task[] => {
  const patientNames = [
    'Anne Adams',
    'Brendan Button',
    'Alice Wonderland',
    'Charlie Brown',
    'Diana Prince',
    'Ethan Hunt',
    'Fiona Gallagher',
    'George Jetson',
    'Hannah Montana',
    'Isaac Newton',
  ];

  const tests = ['Signatera', 'Altera', 'Empower', 'Signatera, Altera', 'Signatera, Empower'];
  
  // Use the centralized task types from constants
  const taskTypes = TASK_TYPES;

  const accounts = [
    { name: 'Duke hospital - Kidney', limsId: '34112', clinician: 'Dr. Sarah Mitchell' },
    { name: 'Mount Sinai Hospital - Heart', limsId: '51234', clinician: 'Dr. James Patterson' },
    { name: 'Cleveland Clinic - Lung', limsId: '67345', clinician: 'Dr. Maria Rodriguez' },
    { name: 'Mayo Clinic - Liver', limsId: '78901', clinician: 'Dr. Robert Chen' },
    { name: 'UIC Cancer Center', limsId: '29495', clinician: 'Dr. Norma Kamal' },
  ];

  // Internal agent names for task assignment
  const agentNames = [
    'Sarah Johnson',
    'Michael Chen',
    'Emily Rodriguez',
    'David Kim',
    'Lisa Anderson',
    'James Wilson',
    'Maria Garcia',
    'Robert Taylor',
    'Jennifer Lee',
    'Christopher Martinez',
  ];

  // Determine assignment percentage based on queue
  // Sample collection queues (Blood Collection, Tissue Request, etc.) get highest percentage (35-40%)
  // All other queues get random 10-40%
  let assignmentPercentage: number;
  if (isSampleCollectionQueue(queueId)) {
    // Sample collection queues - highest assignment (35-40%)
    assignmentPercentage = 0.35 + Math.random() * 0.05;
  } else {
    // Other queues - random 10-40%
    assignmentPercentage = 0.10 + Math.random() * 0.30;
  }

  const tasks: Task[] = [];
  
  // Track used combinations of patient + task type to ensure uniqueness
  const usedCombinations = new Set<string>();
  
  // Generate unique DOB for each patient name
  const patientDobs = new Map<string, string>();
  patientNames.forEach(name => {
    patientDobs.set(name, generateRandomDob());
  });
  
  for (let i = 0; i < count; i++) {
    const account = accounts[i % accounts.length];
    const assignedToMe = Math.random() < assignmentPercentage;
    
    // If assigned to me, use "You", otherwise pick a random agent
    const assignedTo = assignedToMe 
      ? 'You' 
      : agentNames[Math.floor(Math.random() * agentNames.length)];
    
    // Find a unique patient + task type combination
    let patientName: string;
    let taskType: string;
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
      patientName = patientNames[Math.floor(Math.random() * patientNames.length)];
      taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
      attempts++;
      
      // If we've tried too many times, just use sequential assignment
      if (attempts >= maxAttempts) {
        patientName = patientNames[i % patientNames.length];
        taskType = taskTypes[Math.floor(i / patientNames.length) % taskTypes.length];
        break;
      }
    } while (usedCombinations.has(`${patientName}-${taskType}`));
    
    // Mark this combination as used
    usedCombinations.add(`${patientName}-${taskType}`);
    
    // 20% chance of being completed
    const isCompleted = Math.random() < 0.2;
    
    tasks.push({
      id: `task-${queueId}-${i}`,
      sfId: `#${1234456 + i}`,
      orderId: generateRandomId(),
      patientName,
      patientDob: patientDobs.get(patientName) || generateRandomDob(),
      testNames: tests[i % tests.length],
      edoc: '11/06/2025',
      taskType,
      accountName: account.name,
      clinician: account.clinician,
      source: generateSource(),
      createdBy: generateCreatedBy(),
      createdAt: generateCreatedAt(),
      actualCollectionDate: '-',
      resultsExpected: '-',
      limsId: account.limsId,
      queueId,
      assignedToMe,
      assignedTo,
      status: isCompleted ? 'completed' : 'active',
    });
  }
  
  return tasks;
};

const generateRandomId = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateRandomDob = (): string => {
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  const year = 1950 + Math.floor(Math.random() * 50);
  return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
};

const generateCreatedAt = (): string => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;
  return `${day} ${month} ${year}, ${displayHours}:${minutes}${ampm} EDT`;
};

const generateSource = (): string => {
  const sources = ['Paper', 'Electronic', 'Fax', 'Portal', 'EMR'];
  return sources[Math.floor(Math.random() * sources.length)];
};

const generateCreatedBy = (): string => {
  const creators = [
    'Kaley Morgan, Territory Manager',
    'Sarah Johnson, Account Manager',
    'Michael Chen, Clinical Coordinator',
    'Emily Rodriguez, Territory Manager',
    'David Kim, Account Specialist',
  ];
  return creators[Math.floor(Math.random() * creators.length)];
};

/**
 * Tasks cache by queue ID
 * Note: Cache is cleared on each page load to regenerate with updated logic
 */
const tasksCache: Map<string, Task[]> = new Map();

/**
 * Get tasks for a specific queue
 */
export const getTasksByQueueId = (queueId: string): Task[] => {
  if (tasksCache.has(queueId)) {
    return tasksCache.get(queueId)!;
  }
  
  // Get the actual task count from the queue database
  const queue = getQueueById(queueId);
  const taskCount = queue ? queue.taskCount : 0;
  
  const tasks = generateTasksForQueue(queueId, taskCount);
  tasksCache.set(queueId, tasks);
  return tasks;
};

/**
 * Get tasks assigned to me for a specific queue
 */
export const getMyTasksByQueueId = (queueId: string): Task[] => {
  const allTasks = getTasksByQueueId(queueId);
  return allTasks.filter(task => task.assignedToMe);
};

/**
 * Get task by ID
 */
export const getTaskById = (taskId: string): Task | undefined => {
  for (const tasks of tasksCache.values()) {
    const task = tasks.find(t => t.id === taskId);
    if (task) return task;
  }
  return undefined;
};

/**
 * Get task by Order ID
 */
export const getTaskByOrderId = (orderId: string): Task | undefined => {
  for (const tasks of tasksCache.values()) {
    const task = tasks.find(t => t.orderId === orderId);
    if (task) return task;
  }
  return undefined;
};

/**
 * Clear tasks cache (useful for regenerating tasks with updated logic)
 */
export const clearTasksCache = (): void => {
  tasksCache.clear();
};

/**
 * OrderTask interface - Tasks associated with a specific order
 * This is a subset view of Task for the Order Details screen
 */
export interface OrderTask {
  id: string;
  sfId: string;
  taskType: string;
  assignedTo: string;
  dateCreated: string;
  status: 'active' | 'completed';
}

/**
 * Convert a Task to OrderTask format
 */
const taskToOrderTask = (task: Task): OrderTask => ({
  id: task.id,
  sfId: task.sfId,
  taskType: task.taskType,
  assignedTo: task.assignedTo,
  dateCreated: task.createdAt.split(',')[0], // Extract just the date part
  status: task.status,
});

/**
 * Get order tasks by order ID
 * Derives from queue tasks - filters all tasks by orderId
 */
export const getOrderTasksByOrderId = (orderId: string): OrderTask[] => {
  // Search through all cached queue tasks to find tasks matching this orderId
  const matchingTasks: Task[] = [];
  
  for (const tasks of tasksCache.values()) {
    const filtered = tasks.filter(t => t.orderId === orderId);
    matchingTasks.push(...filtered);
  }
  
  // Convert to OrderTask format
  return matchingTasks.map(taskToOrderTask);
};

/**
 * Clear order tasks cache (no longer needed but kept for API compatibility)
 */
export const clearOrderTasksCache = (): void => {
  // No-op - order tasks are now derived from queue tasks
};

/**
 * Create a new task and add it to the queue task list
 * Order tasks are automatically derived from queue tasks
 */
export interface CreateTaskInput {
  patientName: string;
  orderId: string;
  taskType: string;
  assignedTo: string;
  dueDate: string;
  queueId?: string;
}

export const createTask = (input: CreateTaskInput): { task: Task; orderTask: OrderTask } => {
  const now = new Date();
  const taskId = `task-new-${Date.now()}`;
  const sfId = `#${Math.floor(1000000 + Math.random() * 9000000)}`;
  
  // Format created date
  const month = now.toLocaleString('en-US', { month: 'short' });
  const day = now.getDate().toString().padStart(2, '0');
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const displayHours = hours % 12 || 12;
  const createdAt = `${day} ${month} ${year}, ${displayHours}:${minutes}${ampm} EDT`;

  // Create the main Task
  const newTask: Task = {
    id: taskId,
    sfId,
    orderId: input.orderId,
    patientName: input.patientName,
    patientDob: '01/01/1980', // Default DOB
    testNames: 'Signatera',
    edoc: input.dueDate,
    taskType: input.taskType,
    accountName: 'New Account',
    clinician: 'Dr. New Clinician',
    source: 'Portal',
    createdBy: `${input.assignedTo}, Specialist`,
    createdAt,
    actualCollectionDate: '-',
    resultsExpected: '-',
    limsId: '00000',
    queueId: input.queueId || 'q003', // Default to Blood Collection Required
    assignedToMe: input.assignedTo === 'Carl Sainz',
    assignedTo: input.assignedTo === 'Carl Sainz' ? 'You' : input.assignedTo,
    status: 'active',
  };

  // Add to the queue's task cache
  const queueId = input.queueId || 'q003';
  if (tasksCache.has(queueId)) {
    const queueTasks = tasksCache.get(queueId)!;
    queueTasks.unshift(newTask); // Add to beginning
  }

  // OrderTask is automatically derived via taskToOrderTask
  const orderTask = taskToOrderTask(newTask);

  return { task: newTask, orderTask };
};

/**
 * Update a task's status in the queue cache
 * This ensures status changes are reflected across all views
 */
export const updateTaskStatus = (taskId: string, status: 'active' | 'completed'): boolean => {
  for (const tasks of tasksCache.values()) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.status = status;
      return true;
    }
  }
  return false;
};
