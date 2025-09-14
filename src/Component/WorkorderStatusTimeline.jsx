import { useState } from 'react';

function WorkorderStatusTimeline({ context, isReady }) {
  const [showDetails, setShowDetails] = useState({});

  if (!isReady || !context || context.type !== 'Workorder.show') {
    return null;
  }

  const workorderData = context.data;
  const changeLog = workorderData.changeLog || [];

  // Filter only status change events and sort by date
  const statusChanges = changeLog
    .filter(entry => entry.type === 'WORKORDER_STATUS_CHANGE')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const toggleDetails = (id) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  const getStatusColor = (statusName) => {
    const colors = {
      'New': '#6c757d',
      'In Progress': '#007bff',
      'End': '#28a745',
      'Completed': '#28a745',
      'Cancelled': '#dc3545',
      'On Hold': '#ffc107'
    };
    return colors[statusName] || '#6c757d';
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
          📋 Workorder Status Timeline
        </h3>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          <strong>WO:</strong> {workorderData.workorderNumber} | 
          <strong> Current Status:</strong> {workorderData.statusName} | 
          <strong> Part:</strong> {workorderData.sku}
        </div>
      </div>

      {statusChanges.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          No status changes recorded
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: '0',
              bottom: '0',
              width: '2px',
              backgroundColor: '#dee2e6'
            }}
          />

          {statusChanges.map((change, index) => {
            const { date, time } = formatDate(change.date);
            const isLast = index === statusChanges.length - 1;
            
            return (
              <div
                key={change.id}
                style={{
                  position: 'relative',
                  paddingLeft: '50px',
                  paddingBottom: isLast ? '0' : '1.5rem'
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '11px',
                    top: '8px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: getStatusColor(change.newStatusName),
                    border: '3px solid white',
                    boxShadow: '0 0 0 2px #dee2e6'
                  }}
                />

                {/* Status change card */}
                <div
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #dee2e6',
                    borderRadius: '6px',
                    padding: '0.75rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                        {change.oldStatusName ? (
                          <>
                            <span style={{ color: '#6c757d' }}>{change.oldStatusName}</span>
                            <span style={{ margin: '0 0.5rem', color: '#6c757d' }}>→</span>
                            <span style={{ color: getStatusColor(change.newStatusName) }}>
                              {change.newStatusName}
                            </span>
                          </>
                        ) : (
                          <span style={{ color: getStatusColor(change.newStatusName) }}>
                            Initial Status: {change.newStatusName}
                          </span>
                        )}
                      </div>
                      {change.auto && (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: '#6c757d',
                            backgroundColor: '#e9ecef',
                            padding: '0.1rem 0.3rem',
                            borderRadius: '3px',
                            marginTop: '0.25rem',
                            display: 'inline-block'
                          }}
                        >
                          Automatic
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleDetails(change.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#007bff',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        padding: '0.2rem'
                      }}
                    >
                      {showDetails[change.id] ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    <div><strong>Date:</strong> {date}</div>
                    <div><strong>Time:</strong> {time}</div>
                  </div>

                  {showDetails[change.id] && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.5rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: '#666'
                      }}
                    >
                      <div><strong>Change ID:</strong> {change.id}</div>
                      <div><strong>User ID:</strong> {change.userId || 'System'}</div>
                      <div><strong>Type:</strong> {change.type}</div>
                      {change.fields && (
                        <div><strong>Additional Fields:</strong> {JSON.stringify(change.fields)}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      <div
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          backgroundColor: '#e7f3ff',
          borderRadius: '6px',
          border: '1px solid #b3d7ff'
        }}
      >
        <div style={{ fontSize: '0.9rem', color: '#0056b3' }}>
          <strong>Summary:</strong> {statusChanges.length} status change{statusChanges.length !== 1 ? 's' : ''} recorded
        </div>
        {statusChanges.length > 0 && (
          <div style={{ fontSize: '0.85rem', color: '#0056b3', marginTop: '0.25rem' }}>
            <strong>Duration:</strong> {formatDate(statusChanges[0].date).date} - {
              statusChanges.length > 1 ? formatDate(statusChanges[statusChanges.length - 1].date).date : 'Current'
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkorderStatusTimeline;

