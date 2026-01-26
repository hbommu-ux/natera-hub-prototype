import React from 'react';
import { ListItemDense } from './ListItemDense';

/**
 * Example usage of ListItemDense component
 * This component can be used anywhere in the application to display
 * a label-value pair in a compact format
 */
export const ListItemDenseExample: React.FC = () => {
  return (
    <div style={{ padding: '24px', backgroundColor: 'var(--surface-color-surface-lowest)' }}>
      <h2 style={{ marginBottom: '16px', color: 'var(--text-color-text-primary)' }}>
        ListItemDense Examples
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        {/* Example 1: Ordering Clinic */}
        <ListItemDense 
          label="Ordering Clinic" 
          title="UIC Cancer Center" 
        />
        
        {/* Example 2: Patient Information */}
        <ListItemDense 
          label="Patient Name" 
          title="Ethan Hunt" 
        />
        
        {/* Example 3: Order ID */}
        <ListItemDense 
          label="Order ID" 
          title="WXvtpTy9stbS" 
        />
        
        {/* Example 4: Status */}
        <ListItemDense 
          label="Status" 
          title="In Progress" 
        />
        
        {/* Example 5: Date */}
        <ListItemDense 
          label="Date Ordered" 
          title="January 20, 2026" 
        />
      </div>
    </div>
  );
};
