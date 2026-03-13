/**
 * Queue Database
 * Mock database for queue information
 */

export interface Queue {
  id: string;
  name: string;
  taskCount: number;
  lastUpdated: string;
  ownedBy: string;
  priority?: 'high' | 'medium' | 'low';
  status?: 'active' | 'inactive';
}

/**
 * Generate a random task count for realistic prototype data
 */
const getRandomTaskCount = (min: number = 5, max: number = 150): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate random time ago string
 */
const getRandomTimeAgo = (): string => {
  const options = [
    '5 min ago',
    '12 min ago',
    '17 min ago',
    '23 min ago',
    '35 min ago',
    '1 hour ago',
    '2 hours ago',
    '3 hours ago',
    '5 hours ago',
    'Today',
    'Yesterday',
    '2 days ago',
  ];
  return options[Math.floor(Math.random() * options.length)];
};

/**
 * Owner/Team assignments
 */
const owners = [
  'PC - NW',
  'PC - NE',
  'PC - Pacific',
  'TM',
  'CX - All',
  'CX - Team A',
  'CX - Team B',
  'Billing Team',
  'EMR Team',
  'IVT Team',
  'GC Team',
  'Financial Team',
  'Support Team',
  'Escalation Team',
  'Training Team',
];

const getRandomOwner = (): string => {
  return owners[Math.floor(Math.random() * owners.length)];
};

/**
 * All Queue Names Database
 */
export const queuesDatabase: Queue[] = [
  { id: 'q009', name: 'All Oncology Support Tickets - Focus', taskCount: 87, lastUpdated: '12 min ago', ownedBy: 'Support Team' },
  { id: 'q001', name: 'All MI Cases - Clinic Unknowns', taskCount: 38, lastUpdated: '17 min ago', ownedBy: 'PC - NW' },
  { id: 'q002', name: 'All Onc MI Cases (MIS Integration)', taskCount: 45, lastUpdated: '17 min ago', ownedBy: 'TM' },
  { id: 'q003', name: 'Blood Collection Required', taskCount: 144, lastUpdated: '17 min ago', ownedBy: 'PC - NE' },
  { id: 'q004', name: 'Blood Collection Required - My tickets', taskCount: 22, lastUpdated: '25 min ago', ownedBy: 'PC - Pacific' },
  { id: 'q005', name: 'Clinic Managed Only', taskCount: 65, lastUpdated: '17 min ago', ownedBy: 'CX - All' },
  { id: 'q006', name: 'CX General Inquiry ONC Messaging Queue', taskCount: 66, lastUpdated: '17 min ago', ownedBy: 'CX - All' },
  { id: 'q007', name: 'NN Oncology Support Tickets - Urgent', taskCount: 12, lastUpdated: '5 min ago', ownedBy: 'Support Team' },
  { id: 'q008', name: 'Organ Health Customer Success', taskCount: 89, lastUpdated: '1 hour ago', ownedBy: 'CX - Team A' },
  { id: 'q010', name: 'Tissue Request - All Open Tickets', taskCount: 54, lastUpdated: '35 min ago', ownedBy: 'TM' },
  { id: 'q011', name: '3Fs Offshore', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q012', name: '3Fs Onshore', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q013', name: 'Advance Pay Closed Tickets', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q014', name: 'Aetna Empower PA Decisions', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q015', name: 'AETNA Empower PA Submissions', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q016', name: 'Aetna Empower Re-escalation', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Escalation Team' },
  { id: 'q017', name: 'Aetna Escalated to Supervisor', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Escalation Team' },
  { id: 'q018', name: 'All Open Tickets', taskCount: getRandomTaskCount(100, 300), lastUpdated: getRandomTimeAgo(), ownedBy: 'All' },
  { id: 'q019', name: 'All Tickets', taskCount: getRandomTaskCount(200, 500), lastUpdated: getRandomTimeAgo(), ownedBy: 'All' },
  { id: 'q020', name: 'ALL Voicemail', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'CX - All' },
  { id: 'q021', name: 'Alohacare GC Attestation', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'GC Team' },
  { id: 'q022', name: 'AMCA', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q023', name: 'AMD Bill Request', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q024', name: 'AOR/DOR', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q025', name: 'AOR/DOR CIP', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q026', name: 'AOR/DOR CIP Tickets to SGH', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q027', name: 'AOR/DOR Portal', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q028', name: 'AOR/DOR Portal Tickets', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q029', name: 'Auto-Redraw', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'PC - NW' },
  { id: 'q030', name: 'Avalon Empower GIS', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'GC Team' },
  { id: 'q031', name: 'BCN PA submissions', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q032', name: 'Bill Review - RCM Action Complete', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q033', name: 'Bill Review Voicemails', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q034', name: 'Billing Ins Verification - ACU', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q035', name: 'Billing Ins Verification - Pat Email', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q036', name: 'Billing Ins Verification - VENI', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q037', name: 'Billing ins verification- Pauth short', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q038', name: 'Billing IVT CIP', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q039', name: 'Billing MI ICD-10', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q040', name: 'Billing MRR', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q041', name: 'BillingEscalation', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Escalation Team' },
  { id: 'q042', name: 'BillingOHONC', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q043', name: 'BITS/BREW', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q044', name: 'BPO Billing - Spanish', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q045', name: 'BPO Outbound - MI', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'CX - Team B' },
  { id: 'q046', name: 'BPO Outbound - PTP', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'CX - Team B' },
  { id: 'q047', name: 'Caresource GC Attestation', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'GC Team' },
  { id: 'q048', name: 'CB Organ Health', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'CX - Team A' },
  { id: 'q049', name: 'CB- Holding Pen', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q050', name: 'CDS - Domestic Only', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q051', name: 'CDS Verification - Epic Review', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'EMR Team' },
  { id: 'q052', name: 'CFS Voicemails', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'CX - All' },
  { id: 'q053', name: 'Cigna Biomarker PA Submissions', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q054', name: 'CIP Team', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q055', name: 'Client Billing', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q056', name: 'Clinic Chat Escalations', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Escalation Team' },
  { id: 'q057', name: 'Compassionate Care', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Financial Team' },
  { id: 'q058', name: 'Compassionate Care-NPOI', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Financial Team' },
  { id: 'q059', name: 'Compassionate Care-Physical Form', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Financial Team' },
  { id: 'q060', name: 'Copy of Assigned Cases', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'All' },
  { id: 'q061', name: 'Created by Me', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'All' },
  { id: 'q062', name: 'CSS-QA', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q063', name: 'CX General Inquiry OH Messaging Queue', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'CX - Team A' },
  { id: 'q064', name: 'CX General Inquiry WH Messaging Queue', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'CX - All' },
  { id: 'q065', name: 'CX TM IVF Messaging', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'TM' },
  { id: 'q066', name: 'CX TM OH Messaging Queue', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'TM' },
  { id: 'q067', name: 'CX TM ONC Messaging Queue', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'TM' },
  { id: 'q068', name: 'CX TM WH Messaging Queue', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'TM' },
  { id: 'q069', name: 'Denials Tricare', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q070', name: 'Duplicate Tickets - Undeliverable Emails', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q071', name: 'EMR Florida Pilot Project', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'EMR Team' },
  { id: 'q072', name: 'EMR Implementation Support (EPIC)', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'EMR Team' },
  { id: 'q073', name: 'EMR Natera Draws (MP Escalations)', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'EMR Team' },
  { id: 'q074', name: 'EMR Natera Managed Draws', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'EMR Team' },
  { id: 'q075', name: 'EMR Product Requests', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'EMR Team' },
  { id: 'q076', name: 'EMR Support', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'EMR Team' },
  { id: 'q077', name: 'EMR Training Team', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Training Team' },
  { id: 'q078', name: 'EMR Training Team-All Tickets', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Training Team' },
  { id: 'q079', name: 'EMR Updates and Optimizations Team', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'EMR Team' },
  { id: 'q080', name: 'Encore', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q081', name: 'Escalation Transfer review', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Escalation Team' },
  { id: 'q082', name: 'Fax Payors Submission', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q083', name: 'Financial Counseling team', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Financial Team' },
  { id: 'q084', name: 'GC/GIS/PCP Billing MRR Faxes', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q085', name: 'Glidian Escalate to Supervisor', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Escalation Team' },
  { id: 'q086', name: 'Glidian Submission', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q087', name: 'Global Billing', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q088', name: 'GPS PAMI', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q089', name: 'Horizon Billing MRR Faxes', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q090', name: 'Humana PCP Contact', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q091', name: 'ICD - PA PRIORITY 1', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q092', name: 'ICD - PA PRIORITY 1.1', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q093', name: 'ICD - PA PRIORITY 2', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q094', name: 'ICD - PA PRIORITY 3', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q095', name: 'ICD - PA PRIORITY 3.1', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q096', name: 'ICD - SHORT PA', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q097', name: 'Innobot', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q098', name: 'Insufficient Tissue', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'TM' },
  { id: 'q099', name: 'Insurance Refund Requests', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'Billing Team' },
  { id: 'q100', name: 'IVT ESCALATION QUEUE', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q101', name: 'IVT Inquiries', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: 'IVT Team' },
  { id: 'q102', name: 'Kaiser backlog', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
  { id: 'q103', name: 'Kaiser PCP', taskCount: getRandomTaskCount(), lastUpdated: getRandomTimeAgo(), ownedBy: getRandomOwner() },
];

/**
 * Get all queues
 */
export const getAllQueues = (): Queue[] => {
  return queuesDatabase;
};

/**
 * Get queue by ID
 */
export const getQueueById = (id: string): Queue | undefined => {
  return queuesDatabase.find(queue => queue.id === id);
};

/**
 * Search queues by name
 */
export const searchQueuesByName = (searchTerm: string): Queue[] => {
  const lowerSearch = searchTerm.toLowerCase();
  return queuesDatabase.filter(queue => 
    queue.name.toLowerCase().includes(lowerSearch)
  );
};

/**
 * Get queues by owner
 */
export const getQueuesByOwner = (owner: string): Queue[] => {
  return queuesDatabase.filter(queue => queue.ownedBy === owner);
};

/**
 * Get total task count across all queues
 */
export const getTotalTaskCount = (): number => {
  return queuesDatabase.reduce((total, queue) => total + queue.taskCount, 0);
};

/**
 * Check if a queue is sample collection related
 * These queues will show the full task table with detailed columns
 */
export const isSampleCollectionQueue = (queueId: string): boolean => {
  const sampleCollectionQueueIds = [
    'q002', // All Onc MI Cases (MIS Integration)
    'q003', // Blood Collection Required
    'q004', // Blood Collection Required - My tickets
    'q009', // All Oncology Support Tickets - Focus
    'q010', // Tissue Request - All Open Tickets
    'q029', // Auto-Redraw
    'q073', // EMR Natera Draws (MP Escalations)
    'q074', // EMR Natera Managed Draws
    'q098', // Insufficient Tissue
  ];
  
  return sampleCollectionQueueIds.includes(queueId);
};
