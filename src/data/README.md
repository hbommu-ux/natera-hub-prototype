# Data Layer

This directory contains mock database files for the prototype.

## Structure

### `queues.ts`
Contains the queue database with 103 queue entries.

**Interface:**
```typescript
interface Queue {
  id: string;          // Unique identifier (e.g., "q001")
  name: string;        // Queue name
  taskCount: number;   // Number of tasks in queue
  lastUpdated: string; // Last updated timestamp
  ownedBy: string;     // Team/owner of the queue
  priority?: 'high' | 'medium' | 'low';  // Optional priority
  status?: 'active' | 'inactive';        // Optional status
}
```

**Available Functions:**
- `getAllQueues()` - Returns all queues
- `getQueueById(id: string)` - Get queue by ID
- `searchQueuesByName(searchTerm: string)` - Search queues by name
- `getQueuesByOwner(owner: string)` - Filter queues by owner
- `getTotalTaskCount()` - Get total tasks across all queues

## Usage

```typescript
import { getAllQueues, getQueueById } from '@/data/queues';

// Get all queues
const queues = getAllQueues();

// Get specific queue
const queue = getQueueById('q001');

// Search queues
const results = searchQueuesByName('Billing');
```

## Data Sources

Queue names sourced from the provided list containing:
- MI Cases queues
- Blood Collection queues
- Billing queues
- EMR Support queues
- IVT queues
- CX Messaging queues
- And more...

## Future Enhancements

Potential additions:
- Task details database
- User/team database
- Queue analytics
- Historical data
- Real-time updates simulation
