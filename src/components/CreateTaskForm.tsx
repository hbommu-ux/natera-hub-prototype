import React, { useState, useMemo } from 'react';
import { Button } from './Button';
import { TASK_TYPES, AGENT_NAMES, CURRENT_USER, getTomorrowDate } from '../data/constants';
import { getTasksByQueueId } from '../data/tasks';
import { getAllQueues } from '../data/queues';

interface CreateTaskFormProps {
  patientName?: string;
  orderId?: string;
  onSubmit: (taskData: CreateTaskData) => void;
  onCancel: () => void;
}

export interface CreateTaskData {
  patientName: string;
  orderId: string;
  taskType: string;
  description: string;
  assignedTo: string;
  dueDate: string;
}

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-24)',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-space-8)',
  },
  label: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
  },
  requiredAsterisk: {
    color: '#f44336',
    marginLeft: '2px',
  },
  input: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    color: 'var(--text-color-text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  inputReadOnly: {
    backgroundColor: 'var(--surface-color-surface-low)',
    color: 'var(--text-color-text-secondary)',
    cursor: 'not-allowed',
  },
  inputFocus: {
    borderColor: 'var(--primary-color-primary-main)',
  },
  select: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    color: 'var(--text-color-text-primary)',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23666'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '40px',
  },
  textarea: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    color: 'var(--text-color-text-primary)',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'border-color 0.2s ease',
  },
  dateInput: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    border: '1px solid var(--component-color-divider)',
    borderRadius: 'var(--radius-radius-sm)',
    backgroundColor: 'var(--surface-color-surface-lowest)',
    color: 'var(--text-color-text-primary)',
    outline: 'none',
    cursor: 'pointer',
  },
  buttonRow: {
    display: 'flex',
    gap: 'var(--spacing-space-12)',
    justifyContent: 'flex-end',
    marginTop: 'var(--spacing-space-16)',
    paddingTop: 'var(--spacing-space-16)',
    borderTop: '1px solid var(--component-color-divider)',
  },
  helperText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    color: 'var(--text-color-text-secondary)',
    margin: 0,
  },
  errorText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '12px',
    color: '#f44336',
    margin: 0,
  },
};

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  patientName: initialPatientName,
  orderId: initialOrderId,
  onSubmit,
  onCancel,
}) => {
  // Determine if fields should be editable (when not pre-filled)
  const isEditable = !initialPatientName || !initialOrderId;

  // Get all patients and orders from the data
  const patientsAndOrders = useMemo(() => {
    const queues = getAllQueues();
    const allTasks: { patientName: string; orderId: string }[] = [];
    const seenPatients = new Set<string>();
    const seenOrders = new Set<string>();
    
    queues.forEach(queue => {
      const tasks = getTasksByQueueId(queue.id);
      tasks.forEach(task => {
        if (!seenOrders.has(task.orderId)) {
          allTasks.push({ patientName: task.patientName, orderId: task.orderId });
          seenOrders.add(task.orderId);
        }
        seenPatients.add(task.patientName);
      });
    });
    
    return {
      patients: Array.from(seenPatients).sort(),
      orders: allTasks,
    };
  }, []);

  const [selectedPatient, setSelectedPatient] = useState<string>(initialPatientName || '');
  const [selectedOrder, setSelectedOrder] = useState<string>(initialOrderId || '');
  const [taskType, setTaskType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [assignedTo, setAssignedTo] = useState<string>(CURRENT_USER);
  const [dueDate, setDueDate] = useState<string>(getTomorrowDate());
  const [errors, setErrors] = useState<{ taskType?: string; patient?: string; order?: string }>({});

  // Filter orders by selected patient
  const filteredOrders = useMemo(() => {
    if (!selectedPatient) return patientsAndOrders.orders;
    return patientsAndOrders.orders.filter(o => o.patientName === selectedPatient);
  }, [selectedPatient, patientsAndOrders.orders]);

  // When patient changes, reset order if it doesn't match
  const handlePatientChange = (patient: string) => {
    setSelectedPatient(patient);
    if (errors.patient) {
      setErrors({ ...errors, patient: undefined });
    }
    // Reset order if current order doesn't belong to this patient
    const orderBelongsToPatient = patientsAndOrders.orders.some(
      o => o.patientName === patient && o.orderId === selectedOrder
    );
    if (!orderBelongsToPatient) {
      setSelectedOrder('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: { taskType?: string; patient?: string; order?: string } = {};
    if (!taskType) {
      newErrors.taskType = 'Please select a task type';
    }
    if (isEditable && !selectedPatient) {
      newErrors.patient = 'Please select a patient';
    }
    if (isEditable && !selectedOrder) {
      newErrors.order = 'Please select an order';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      patientName: isEditable ? selectedPatient : (initialPatientName || ''),
      orderId: isEditable ? selectedOrder : (initialOrderId || ''),
      taskType,
      description,
      assignedTo,
      dueDate,
    });
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      {/* Patient Name */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>
          Patient Name
          {isEditable && <span style={styles.requiredAsterisk}>*</span>}
        </label>
        {isEditable ? (
          <>
            <select
              value={selectedPatient}
              onChange={(e) => handlePatientChange(e.target.value)}
              style={{
                ...styles.select,
                borderColor: errors.patient ? '#f44336' : undefined,
              }}
            >
              <option value="">Select a patient</option>
              {patientsAndOrders.patients.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            {errors.patient && <p style={styles.errorText}>{errors.patient}</p>}
          </>
        ) : (
          <input
            type="text"
            value={initialPatientName}
            readOnly
            style={{ ...styles.input, ...styles.inputReadOnly }}
          />
        )}
      </div>

      {/* Order ID */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>
          Order ID
          {isEditable && <span style={styles.requiredAsterisk}>*</span>}
        </label>
        {isEditable ? (
          <>
            <select
              value={selectedOrder}
              onChange={(e) => {
                setSelectedOrder(e.target.value);
                if (errors.order) {
                  setErrors({ ...errors, order: undefined });
                }
                // Auto-select patient if order is selected and patient is empty
                if (!selectedPatient && e.target.value) {
                  const order = patientsAndOrders.orders.find(o => o.orderId === e.target.value);
                  if (order) {
                    setSelectedPatient(order.patientName);
                  }
                }
              }}
              style={{
                ...styles.select,
                borderColor: errors.order ? '#f44336' : undefined,
              }}
            >
              <option value="">Select an order</option>
              {filteredOrders.map((order) => (
                <option key={order.orderId} value={order.orderId}>
                  {order.orderId} ({order.patientName})
                </option>
              ))}
            </select>
            {errors.order && <p style={styles.errorText}>{errors.order}</p>}
          </>
        ) : (
          <input
            type="text"
            value={initialOrderId}
            readOnly
            style={{ ...styles.input, ...styles.inputReadOnly }}
          />
        )}
      </div>

      {/* Task Type - Required */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>
          Task Type
          <span style={styles.requiredAsterisk}>*</span>
        </label>
        <select
          value={taskType}
          onChange={(e) => {
            setTaskType(e.target.value);
            if (errors.taskType) {
              setErrors({ ...errors, taskType: undefined });
            }
          }}
          style={{
            ...styles.select,
            borderColor: errors.taskType ? '#f44336' : undefined,
          }}
        >
          <option value="">Select a task type</option>
          {TASK_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.taskType && <p style={styles.errorText}>{errors.taskType}</p>}
      </div>

      {/* Description - Optional */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add any additional details about the task..."
          style={styles.textarea}
        />
        <p style={styles.helperText}>Optional - Add more context about the task</p>
      </div>

      {/* Assign To */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Assign to</label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          style={styles.select}
        >
          {AGENT_NAMES.map((name) => (
            <option key={name} value={name}>
              {name === CURRENT_USER ? `${name} (Me)` : name}
            </option>
          ))}
        </select>
      </div>

      {/* Due Date */}
      <div style={styles.fieldGroup}>
        <label style={styles.label}>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.dateInput}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Action Buttons */}
      <div style={styles.buttonRow}>
        <Button variant="outlined" size="small" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="filled" size="small" type="submit">
          Create Task
        </Button>
      </div>
    </form>
  );
};
