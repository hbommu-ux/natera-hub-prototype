import React from 'react';
import { navigation } from '../utils/navigation';

interface SupportTicket {
  id: string;
  subject: string;
  source: string;
  accountName: string;
  limsId: string;
  status: string;
  dateReceived: string;
  ticketOwner: string;
}

interface OncologySupportTableProps {
  tickets: SupportTicket[];
  groupBy?: string | null;
  queueId?: string;
  queueName?: string;
  hideAccountName?: boolean;
}

const styles: { [key: string]: React.CSSProperties } = {
  tableContainer: {
    backgroundColor: 'var(--surface-color-surface-lowest)',
    borderRadius: 'var(--radius-radius-md)',
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    backgroundColor: 'var(--surface-color-surface-low)',
  },
  headerCell: {
    padding: 'var(--spacing-space-4) var(--spacing-space-16)',
    textAlign: 'left',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    borderBottom: '1px solid var(--component-color-divider)',
  },
  row: {
    borderBottom: '1px solid var(--component-color-divider)',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
  },
  cell: {
    padding: '10px var(--spacing-space-16)',
    height: '72px',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
  },
  idCell: {
    width: '107px',
    whiteSpace: 'nowrap',
  },
  subjectCell: {
    flex: 1,
    minWidth: '300px',
    maxWidth: '400px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  sourceCell: {
    width: '120px',
    whiteSpace: 'nowrap',
  },
  accountCell: {
    width: '200px',
  },
  accountName: {
    display: 'block',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--text-color-text-primary)',
    marginBottom: '2px',
  },
  limsLink: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '15px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'var(--primary-color-primary-main)',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  statusCell: {
    width: '150px',
    whiteSpace: 'nowrap',
  },
  dateCell: {
    width: '180px',
    whiteSpace: 'nowrap',
  },
  ownerCell: {
    width: '150px',
    whiteSpace: 'nowrap',
  },
  groupHeader: {
    backgroundColor: 'var(--surface-color-surface-medium)',
    padding: 'var(--spacing-space-12) var(--spacing-space-16)',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-color-text-primary)',
    borderTop: '1px solid var(--component-color-divider)',
  },
};

export const OncologySupportTable: React.FC<OncologySupportTableProps> = ({ tickets, groupBy, queueId, queueName, hideAccountName }) => {
  const handleRowClick = (ticketId: string) => {
    // Navigate to ticket details or order details
    // For now, we'll just log it
    console.log('Clicked ticket:', ticketId);
  };

  const handleLimsClick = (e: React.MouseEvent, limsId: string, accountName: string) => {
    e.stopPropagation(); // Prevent row click
    // Navigate to clinic view
    navigation.navigateToClinicView(limsId, accountName, queueId, queueName);
  };

  // Group tickets if groupBy is selected
  const groupedTickets: { [key: string]: SupportTicket[] } = {};
  if (groupBy) {
    tickets.forEach(ticket => {
      let groupKey: string;
      if (groupBy === 'source') {
        groupKey = ticket.source;
      } else if (groupBy === 'accountName') {
        groupKey = ticket.accountName;
      } else if (groupBy === 'status') {
        groupKey = ticket.status;
      } else if (groupBy === 'ticketOwner') {
        groupKey = ticket.ticketOwner;
      } else {
        groupKey = 'Ungrouped';
      }
      
      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = [];
      }
      groupedTickets[groupKey].push(ticket);
    });
  }

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={{ ...styles.headerCell, ...styles.idCell }}>ID #</th>
            <th style={{ ...styles.headerCell, ...styles.subjectCell }}>Subject</th>
            <th style={{ ...styles.headerCell, ...styles.sourceCell }}>Source</th>
            {!hideAccountName && <th style={{ ...styles.headerCell, ...styles.accountCell }}>Account name</th>}
            <th style={{ ...styles.headerCell, ...styles.statusCell }}>Status</th>
            <th style={{ ...styles.headerCell, ...styles.dateCell }}>Date received</th>
            <th style={{ ...styles.headerCell, ...styles.ownerCell }}>Ticket Owner</th>
          </tr>
        </thead>
        <tbody>
          {groupBy ? (
            // Render grouped tickets
            Object.keys(groupedTickets).sort().map((groupKey) => (
              <React.Fragment key={groupKey}>
                <tr>
                  <td colSpan={hideAccountName ? 6 : 7} style={styles.groupHeader}>
                    {groupKey} ({groupedTickets[groupKey].length} tickets)
                  </td>
                </tr>
                {groupedTickets[groupKey].map((ticket) => (
                  <tr
                    key={ticket.id}
                    style={styles.row}
                    onClick={() => handleRowClick(ticket.id)}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ ...styles.cell, ...styles.idCell }}>{ticket.id}</td>
                    <td style={{ ...styles.cell, ...styles.subjectCell }} title={ticket.subject}>
                      {ticket.subject}
                    </td>
                    <td style={{ ...styles.cell, ...styles.sourceCell }}>{ticket.source}</td>
                    {!hideAccountName && (
                      <td style={{ ...styles.cell, ...styles.accountCell }}>
                        <span style={styles.accountName}>{ticket.accountName}</span>
                        <a
                          style={styles.limsLink}
                          onClick={(e) => handleLimsClick(e, ticket.limsId, ticket.accountName)}
                          onMouseEnter={(e) => {
                            (e.target as HTMLElement).style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            (e.target as HTMLElement).style.textDecoration = 'none';
                          }}
                        >
                          {ticket.limsId}
                        </a>
                      </td>
                    )}
                    <td style={{ ...styles.cell, ...styles.statusCell }}>{ticket.status}</td>
                    <td style={{ ...styles.cell, ...styles.dateCell }}>{ticket.dateReceived}</td>
                    <td style={{ ...styles.cell, ...styles.ownerCell }}>{ticket.ticketOwner}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            // Render ungrouped tickets
            tickets.map((ticket) => (
              <tr
                key={ticket.id}
                style={styles.row}
                onClick={() => handleRowClick(ticket.id)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--action-color-hovered)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <td style={{ ...styles.cell, ...styles.idCell }}>{ticket.id}</td>
                <td style={{ ...styles.cell, ...styles.subjectCell }} title={ticket.subject}>
                  {ticket.subject}
                </td>
                <td style={{ ...styles.cell, ...styles.sourceCell }}>{ticket.source}</td>
                {!hideAccountName && (
                  <td style={{ ...styles.cell, ...styles.accountCell }}>
                    <span style={styles.accountName}>{ticket.accountName}</span>
                    <a
                      style={styles.limsLink}
                      onClick={(e) => handleLimsClick(e, ticket.limsId, ticket.accountName)}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.textDecoration = 'underline';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.textDecoration = 'none';
                      }}
                    >
                      {ticket.limsId}
                    </a>
                  </td>
                )}
                <td style={{ ...styles.cell, ...styles.statusCell }}>{ticket.status}</td>
                <td style={{ ...styles.cell, ...styles.dateCell }}>{ticket.dateReceived}</td>
                <td style={{ ...styles.cell, ...styles.ownerCell }}>{ticket.ticketOwner}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// Sample data for the queue
export const sampleOncologySupportTickets: SupportTicket[] = [
  {
    id: '#1234',
    subject: 'Corporate eFax message from "unknown" - 1 page(s), Caller-ID: 19164574542',
    source: 'eFax Corporate',
    accountName: 'Duke hospital - Kidney',
    limsId: 'LIMS ID 34112',
    status: 'Customer response receiv...',
    dateReceived: '10/06/2025, 1:00 PM',
    ticketOwner: 'OH-FX Queue',
  },
  {
    id: '#2345',
    subject: 'Build-out Orders',
    source: 'Madeline Stevenson',
    accountName: 'Mount Sinai Hospital - Heart',
    limsId: 'LIMS ID 51234',
    status: 'Customer response receiv...',
    dateReceived: '10/07/2025, 2:00 PM',
    ticketOwner: 'OH-FX Queue',
  },
  {
    id: '#3456',
    subject: 'Test Kits',
    source: 'Julie Herr',
    accountName: 'Cleveland Clinic - Lung',
    limsId: 'LIMS ID 67345',
    status: 'Customer response receiv...',
    dateReceived: '10/08/2025, 3:30 PM',
    ticketOwner: 'Carla Sainz',
  },
  {
    id: '#7890',
    subject: 'PID 489164',
    source: 'Jakob Siegal',
    accountName: 'Mayo Clinic - Liver',
    limsId: 'LIMS ID 78901',
    status: 'Customer response receiv...',
    dateReceived: '10/09/2025, 4:45 PM',
    ticketOwner: 'Ahmed El-Fassi',
  },
  {
    id: '#5612',
    subject: 'Fwd: #naterasecure# R.S. (Patient ID #534490) - No orders in Portal',
    source: 'April Griffin',
    accountName: 'Mayo Clinic - Liver',
    limsId: 'LIMS ID 78901',
    status: 'Awaiting Customer respon...',
    dateReceived: '10/10/2025, 5:15 PM',
    ticketOwner: 'Sofia Martinez',
  },
  {
    id: '#5678',
    subject: 'Natera Collected Order',
    source: 'Nicole Eisbrouch',
    accountName: 'Mayo Clinic - Liver',
    limsId: 'LIMS ID 78901',
    status: 'Awaiting Customer respon...',
    dateReceived: '10/11/2025, 6:00 PM',
    ticketOwner: 'Raj Patel',
  },
  {
    id: '#9012',
    subject: '32886 - IRCCS Istituto Tumori Milan - Oncology Portal Access Request',
    source: 'Kaja Johnpierre',
    accountName: 'Mayo Clinic - Liver',
    limsId: 'LIMS ID 78901',
    status: 'Awaiting Customer respon...',
    dateReceived: '10/12/2025, 7:30 PM',
    ticketOwner: 'Carla Sainz',
  },
  {
    id: '#3450',
    subject: 'Corporate eFax message from "Fax Server" - 3 page(s), Caller-ID: 17137459200',
    source: 'eFax Corporate',
    accountName: 'Mayo Clinic - Liver',
    limsId: 'LIMS ID 78901',
    status: 'Awaiting Customer respon...',
    dateReceived: '10/13/2025, 8:00 PM',
    ticketOwner: 'Raj Patel',
  },
  {
    id: '#4103',
    subject: 'Corporate eFax message from "4103673126" - 3 page(s), Caller-ID: 14103673126',
    source: 'eFax Corporate',
    accountName: 'Stanford Medical Center',
    limsId: 'LIMS ID 92456',
    status: 'On Hold',
    dateReceived: '10/14/2025, 9:15 PM',
    ticketOwner: 'MJ Cheema',
  },
  {
    id: '#1629',
    subject: '#naterasecure# Cancel Order 1629213',
    source: 'Cindy Chen',
    accountName: 'UCLA Medical Center',
    limsId: 'LIMS ID 16292',
    status: 'Awaiting Customer respon...',
    dateReceived: '10/15/2025, 10:00 PM',
    ticketOwner: 'Brooklyn Sofley',
  },
  {
    id: '#7174',
    subject: 'Corporate eFax message from "Fax Server" - 7 page(s), Caller-ID: 17137459200',
    source: 'eFax Corporate',
    accountName: 'Johns Hopkins Hospital',
    limsId: 'LIMS ID 71745',
    status: 'Awaiting Customer respon...',
    dateReceived: '10/16/2025, 11:30 PM',
    ticketOwner: 'Janice Molano',
  },
  {
    id: '#2069',
    subject: 'Fwd: [**External**] Signatera Renewals Needed',
    source: 'MJ Cheema',
    accountName: 'Massachusetts General',
    limsId: 'LIMS ID 20694',
    status: 'On Hold',
    dateReceived: '10/17/2025, 1:45 AM',
    ticketOwner: 'Sofia Martinez',
  },
  {
    id: '#2019',
    subject: 'Bulk Renewals - Lims ID: 20194',
    source: 'Brooklyn Sofley',
    accountName: 'Cedars-Sinai Medical',
    limsId: 'LIMS ID 20194',
    status: 'Customer response receiv...',
    dateReceived: '10/18/2025, 3:00 AM',
    ticketOwner: 'Katlin Radakovich',
  },
  {
    id: '#5053',
    subject: 'SHIPMENT NOTIFICATION',
    source: 'Iacava roberta',
    accountName: 'Memorial Sloan Kettering',
    limsId: 'LIMS ID 50538',
    status: 'Customer response receiv...',
    dateReceived: '10/19/2025, 4:15 AM',
    ticketOwner: 'Danielle Lamothe',
  },
  {
    id: '#5388',
    subject: 'Maria Zalesky Patient ID #505388',
    source: 'Katlin Radakovich',
    accountName: 'NYU Langone Health',
    limsId: 'LIMS ID 50538',
    status: 'Customer response receiv...',
    dateReceived: '10/20/2025, 5:30 AM',
    ticketOwner: 'Janice Molano',
  },
  {
    id: '#1378',
    subject: 'Order #1378452',
    source: 'Danielle Lamothe',
    accountName: 'Cleveland Clinic',
    limsId: 'LIMS ID 13784',
    status: 'Customer response receiv...',
    dateReceived: '10/21/2025, 6:45 AM',
    ticketOwner: 'Brooklyn Sofley',
  },
  {
    id: '#9200',
    subject: 'Fwd: Mr. Zetlawi MP Follow UP',
    source: 'Janice Molano',
    accountName: 'UCSF Medical Center',
    limsId: 'LIMS ID 92001',
    status: 'Customer response receiv...',
    dateReceived: '10/22/2025, 7:00 AM',
    ticketOwner: 'Carla Sainz',
  },
  {
    id: '#9201',
    subject: 'Corporate eFax message from "Fax Server" - 9 page(s), Caller-ID: 17137459200',
    source: 'eFax Corporate',
    accountName: 'MD Anderson Cancer Center',
    limsId: 'LIMS ID 92002',
    status: 'On Hold',
    dateReceived: '10/23/2025, 8:15 AM',
    ticketOwner: 'Ahmed El-Fassi',
  },
  {
    id: '#6701',
    subject: 'Patient Inquiry - Treatment Schedule',
    source: 'Sarah Williams',
    accountName: 'Cleveland Clinic - Lung',
    limsId: 'LIMS ID 67345',
    status: 'In Progress',
    dateReceived: '10/24/2025, 9:00 AM',
    ticketOwner: 'Carla Sainz',
  },
  {
    id: '#6702',
    subject: 'Lab Results Review Request',
    source: 'eFax Corporate',
    accountName: 'Cleveland Clinic - Lung',
    limsId: 'LIMS ID 67345',
    status: 'Awaiting Customer respon...',
    dateReceived: '10/24/2025, 10:30 AM',
    ticketOwner: 'Sofia Martinez',
  },
  {
    id: '#6703',
    subject: 'Insurance Pre-Authorization',
    source: 'Michael Chen',
    accountName: 'Cleveland Clinic - Lung',
    limsId: 'LIMS ID 67345',
    status: 'In Progress',
    dateReceived: '10/24/2025, 11:45 AM',
    ticketOwner: 'Carla Sainz',
  },
  {
    id: '#6704',
    subject: 'Corporate eFax message from "Cleveland Lab" - 4 page(s), Caller-ID: 12165551234',
    source: 'eFax Corporate',
    accountName: 'Cleveland Clinic - Lung',
    limsId: 'LIMS ID 67345',
    status: 'Closed',
    dateReceived: '10/23/2025, 2:15 PM',
    ticketOwner: 'Raj Patel',
  },
  {
    id: '#6705',
    subject: 'Sample Collection Coordination',
    source: 'Dr. Patricia Moore',
    accountName: 'Cleveland Clinic - Lung',
    limsId: 'LIMS ID 67345',
    status: 'Closed',
    dateReceived: '10/23/2025, 8:00 AM',
    ticketOwner: 'Carla Sainz',
  },
  {
    id: '#6706',
    subject: 'Fwd: Test Authorization Required',
    source: 'Jennifer Park',
    accountName: 'Cleveland Clinic - Lung',
    limsId: 'LIMS ID 67345',
    status: 'On Hold',
    dateReceived: '10/24/2025, 1:00 PM',
    ticketOwner: 'Ahmed El-Fassi',
  },
  {
    id: '#6707',
    subject: 'Patient Contact Information Update',
    source: 'Emily Rodriguez',
    accountName: 'Cleveland Clinic - Lung',
    limsId: 'LIMS ID 67345',
    status: 'Closed',
    dateReceived: '10/22/2025, 4:30 PM',
    ticketOwner: 'Sofia Martinez',
  },
  {
    id: '#6708',
    subject: 'Specimen Tracking Issue',
    source: 'Lab Coordinator',
    accountName: 'Cleveland Clinic - Lung',
    limsId: 'LIMS ID 67345',
    status: 'Awaiting Customer respon...',
    dateReceived: '10/24/2025, 3:15 PM',
    ticketOwner: 'Carla Sainz',
  },
];
