import { useState } from 'react';

function StockTimeline({ context, isReady }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  if (!isReady || !context || context.type !== 'Stock.show') {
    return null;
  }

  const stockData = context.data;
  const changeLog = stockData.changeLog || [];
  
  // Sort change log by date (most recent first)
  const sortedChanges = [...changeLog].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Set the first event as selected by default
  if (!selectedEvent && sortedChanges.length > 0) {
    setSelectedEvent(sortedChanges[0]);
  }

  // Animation and playback functions
  const playTimeline = () => {
    if (sortedChanges.length === 0) return;
    
    setPlayingAnimation(true);
    setCurrentEventIndex(0);
    
    const playNext = (index) => {
      if (index >= sortedChanges.length) {
        setPlayingAnimation(false);
        return;
      }
      
      setSelectedEvent(sortedChanges[index]);
      setCurrentEventIndex(index);
      
      setTimeout(() => {
        playNext(index + 1);
      }, 2000); // 2 seconds per event
    };
    
    playNext(0);
  };

  const selectEvent = (event, index) => {
    if (!playingAnimation) {
      setSelectedEvent(event);
      setCurrentEventIndex(index);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  const getEventTypeEmoji = (type) => {
    const emojis = {
      'ITEM_ATTACH': '📦',
      'ITEM_DETACH': '📤',
      'STATUS_CHANGE': '🔄',
      'QUANTITY_CHANGE': '🔢',
      'LOCATION_CHANGE': '📍',
      'SERIAL_CHANGE': '🏷️'
    };
    return emojis[type] || '📋';
  };

  const getEventTypeColor = (type) => {
    const colors = {
      'ITEM_ATTACH': '#28a745',
      'ITEM_DETACH': '#dc3545',
      'STATUS_CHANGE': '#007bff',
      'QUANTITY_CHANGE': '#ffc107',
      'LOCATION_CHANGE': '#6f42c1',
      'SERIAL_CHANGE': '#fd7e14'
    };
    return colors[type] || '#6c757d';
  };

  const getEventDescription = (event) => {
    switch (event.type) {
      case 'ITEM_ATTACH':
        return `Attached ${event.newValue?.sku || 'item'} (Serial: ${event.newValue?.serial || 'N/A'})`;
      case 'ITEM_DETACH':
        return `Detached ${event.oldValue?.sku || 'item'} (Serial: ${event.oldValue?.serial || 'N/A'})`;
      case 'STATUS_CHANGE':
        return `Status changed from ${event.oldValue || 'N/A'} to ${event.newValue || 'N/A'}`;
      case 'QUANTITY_CHANGE':
        return `Quantity changed from ${event.oldValue || 0} to ${event.newValue || 0}`;
      default:
        return `${event.type.replace('_', ' ')} event`;
    }
  };

  return (
    <div style={{ 
      padding: '1.5rem', 
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      borderRadius: '16px',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        animation: playingAnimation ? 'pulse 2s infinite' : 'none'
      }} />
      
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
        <h3 style={{ 
          margin: '0 0 1rem 0', 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          📦 {stockData.sku} - Stock Timeline
        </h3>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.2)',
          padding: '1rem',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              <strong>SKU:</strong> {stockData.sku} | <strong>Description:</strong> {stockData.skuDesc}
            </div>
            <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
              <strong>Serial:</strong> {stockData.serial} | 
              <strong> Status:</strong> 
              <span style={{ 
                marginLeft: '0.5rem',
                fontSize: '1rem',
                padding: '0.2rem 0.5rem',
                backgroundColor: stockData.stockStatus === 'PENDING' ? '#ffc107' : '#28a745',
                borderRadius: '12px',
                color: 'white'
              }}>
                {stockData.stockStatus}
              </span>
            </div>
            <div style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.9 }}>
              <strong>Workorder:</strong> {stockData.workorderNumber} | 
              <strong> Quantity:</strong> {stockData.quantity} | 
              <strong> Items Attached:</strong> {stockData.stockItems?.length || 0}
            </div>
          </div>
          
          {/* Play button */}
          <button
            onClick={playTimeline}
            disabled={sortedChanges.length === 0 || playingAnimation}
            style={{
              backgroundColor: playingAnimation ? '#6c757d' : '#e91e63',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: playingAnimation ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transform: playingAnimation ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}
          >
            {playingAnimation ? '⏸️ Playing...' : '▶️ Play Changes'}
          </button>
        </div>
      </div>

      {sortedChanges.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          fontSize: '1.1rem',
          opacity: 0.8
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          No changes recorded yet
        </div>
      ) : (
        <>
          {/* Change Timeline */}
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.95)',
            borderRadius: '12px',
            padding: '1.5rem',
            color: '#333',
            position: 'relative',
            zIndex: 1
          }}>
            
            {/* Summary */}
            <div style={{ 
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '1.1rem', 
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                📋 {sortedChanges.length} Changes Recorded
              </div>
              {selectedEvent && (
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  Currently viewing: {getEventTypeEmoji(selectedEvent.type)} {selectedEvent.type.replace('_', ' ')}
                </div>
              )}
            </div>

            {/* Interactive Timeline */}
            <div style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              gap: '1rem',
              padding: '1rem 0',
              marginBottom: '1.5rem'
            }}>
              {sortedChanges.map((event, index) => {
                const isSelected = selectedEvent?.id === event.id;
                const isActive = playingAnimation && currentEventIndex === index;
                
                return (
                  <div
                    key={event.id}
                    onClick={() => selectEvent(event, index)}
                    style={{
                      minWidth: '140px',
                      textAlign: 'center',
                      cursor: playingAnimation ? 'default' : 'pointer',
                      transform: isSelected || isActive ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                  >
                    {/* Event bubble */}
                    <div
                      style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '50%',
                        backgroundColor: getEventTypeColor(event.type),
                        margin: '0 auto 0.5rem auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.8rem',
                        boxShadow: isSelected || isActive ? '0 0 25px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
                        border: isSelected || isActive ? '4px solid #fff' : 'none',
                        animation: isActive ? 'bounce 0.6s infinite alternate' : 'none'
                      }}
                    >
                      {getEventTypeEmoji(event.type)}
                    </div>
                    
                    {/* Event type */}
                    <div style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold',
                      color: getEventTypeColor(event.type),
                      marginBottom: '0.25rem'
                    }}>
                      {event.type.replace('_', ' ')}
                    </div>
                    
                    {/* Event date */}
                    <div style={{ 
                      fontSize: '0.7rem', 
                      color: '#999',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '10px',
                      padding: '0.2rem 0.4rem'
                    }}>
                      {formatDate(event.date).date}
                    </div>
                    
                    {/* Playing indicator */}
                    {isActive && (
                      <div style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#ff6b6b',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '0.2rem 0.5rem',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        animation: 'pulse 1s infinite'
                      }}>
                        NOW
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Selected Event Details */}
            {selectedEvent && (
              <div style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                padding: '1.5rem',
                border: `3px solid ${getEventTypeColor(selectedEvent.type)}`,
                animation: playingAnimation && selectedEvent ? 'slideIn 0.5s ease' : 'none'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    marginRight: '1rem' 
                  }}>
                    {getEventTypeEmoji(selectedEvent.type)}
                  </div>
                  <div>
                    <h4 style={{ 
                      margin: 0, 
                      color: getEventTypeColor(selectedEvent.type),
                      fontSize: '1.3rem'
                    }}>
                      {getEventDescription(selectedEvent)}
                    </h4>
                    <div style={{ 
                      color: '#666', 
                      fontSize: '0.9rem' 
                    }}>
                      Change #{currentEventIndex + 1} of {sortedChanges.length}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  <div>
                    <strong>📅 Date:</strong><br />
                    {formatDate(selectedEvent.date).date}<br />
                    <strong>🕐 Time:</strong> {formatDate(selectedEvent.date).time}
                  </div>
                  <div>
                    <strong>👤 User ID:</strong><br />
                    {selectedEvent.userId || 'System'}
                  </div>
                  {selectedEvent.oldValue && (
                    <div>
                      <strong>📤 Previous Value:</strong><br />
                      <code style={{ fontSize: '0.8rem', backgroundColor: '#e9ecef', padding: '0.2rem', borderRadius: '4px' }}>
                        {typeof selectedEvent.oldValue === 'object' 
                          ? JSON.stringify(selectedEvent.oldValue, null, 2) 
                          : selectedEvent.oldValue}
                      </code>
                    </div>
                  )}
                  {selectedEvent.newValue && (
                    <div>
                      <strong>📥 New Value:</strong><br />
                      <code style={{ fontSize: '0.8rem', backgroundColor: '#e9ecef', padding: '0.2rem', borderRadius: '4px' }}>
                        {typeof selectedEvent.newValue === 'object' 
                          ? JSON.stringify(selectedEvent.newValue, null, 2) 
                          : selectedEvent.newValue}
                      </code>
                    </div>
                  )}
                </div>

                {/* Attached Items Summary */}
                {selectedEvent.type === 'ITEM_ATTACH' && stockData.stockItems && (
                  <div style={{ 
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#e7f3ff',
                    borderRadius: '8px',
                    border: '1px solid #b3d7ff'
                  }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: '#0056b3' }}>
                      📦 Current Stock Items ({stockData.stockItems.length})
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                      {stockData.stockItems.map((item, idx) => (
                        <div key={idx} style={{ 
                          fontSize: '0.8rem', 
                          backgroundColor: 'white', 
                          padding: '0.5rem', 
                          borderRadius: '4px',
                          border: '1px solid #dee2e6'
                        }}>
                          <strong>{item.sku}</strong><br />
                          Serial: {item.serial}<br />
                          Qty: {item.quantity}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }
        
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
        
        @keyframes slideIn {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
}

export default StockTimeline;

