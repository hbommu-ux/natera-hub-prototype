/**
 * Constants for Task Creation
 */

// All available task types
export const TASK_TYPES = [
  'Initial Draw Welcome Call',
  'Call retries - Outreach 2',
  'Call retries - Outreach 3',
  'Call retries - Outreach 4',
  'Sample Status Review',
  'Mobile Phlebotomy Scheduling',
  'Follow-Up with COS/CE',
  'Pre-Draw Reminder Call or Email',
  'Draw Confirmation and Survey Distribution',
  'JIRA Ticket Follow-Up',
  'EPS Ticket Follow-Up',
  'Clinic Draw Confirmation',
  'Mobile Phlebotomy Status Check',
  'General Follow-Up Call',
  'Follow-Up with Patient (PT)',
  'Results Delivery',
  'Billing Follow-Up',
  'Registered Nurse (RN) Review',
  'Kit and Mobile Phlebotomy Status Confirmation',
  'Reassigned Patient Chat Review',
  'Clinic Draw Confirmation with Hydration Guidance',
  'Pathology Report Review',
  'Command Center / Case Management Review (CMDPOO)',
  'Patient Outreach Call',
  'Text Message to Confirm Kit Shipment Details',
  'Fourth Outreach Attempt and FRP Escalation',
  'Draw Manager Update',
  'FRP Weekly Call',
  'Order Renewal Coordination',
] as const;

export type TaskType = typeof TASK_TYPES[number];

// Agent names for task assignment
export const AGENT_NAMES = [
  'Carl Sainz',
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
  'Amanda White',
  'Daniel Brown',
  'Jessica Davis',
  'Andrew Miller',
] as const;

export type AgentName = typeof AGENT_NAMES[number];

// Current user (for defaulting assignment)
export const CURRENT_USER: AgentName = 'Carl Sainz';

/**
 * Get tomorrow's date formatted as YYYY-MM-DD (for date input)
 */
export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

/**
 * Format date for display
 */
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};
