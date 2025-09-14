import { useState, useEffect } from 'react';

function ProductionEntityTimeline({ context, isReady, client }) {
  const [statusEvents, setStatusEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [playingAnimation, setPlayingAnimation] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    if (!isReady || !context || context.type !== 'ProductionEntity.show' || !client) {
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch only STATUS_CHANGE events from the API
        const response = await client.services.ProductionEntityEventService.find({
          filter: {
            where: {
              productionEntityId: context.data.id,
              type: 'STATUS_CHANGE' // Only fetch status change events
            },
            order: ['start DESC'],
            limit: 20 // Get recent 20 status changes
          }
        });
        const events = response || [];
        setStatusEvents(events);
        if (events.length > 0) {
          setSelectedEvent(events[0]); // Select the most recent event by default
        }
      } catch (err) {
        console.error('Error fetching production entity events:', err);
        setError('Failed to load status changes');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [context, isReady, client]);

  if (!isReady || !context || context.type !== 'ProductionEntity.show') {
    return null;
  }

  const productionEntityData = context.data;

  // Animation and playback functions
  const playTimeline = () => {
    if (statusEvents.length === 0) return;
    
    setPlayingAnimation(true);
    setCurrentEventIndex(0);
    
    const playNext = (index) => {
      if (index >= statusEvents.length) {
        setPlayingAnimation(false);
        return;
      }
      
      setSelectedEvent(statusEvents[index]);
      setCurrentEventIndex(index);
      
      setTimeout(() => {
        playNext(index + 1);
      }, 1500); // 1.5 seconds per event
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

  const formatDuration = (start, end) => {
    if (!end) return 'Ongoing ⏳';
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = endDate - startDate;
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ${hours % 24}h ⏰`;
    } else if (hours > 0) {
      return `${hours}h ${minutes % 60}m ⏱️`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s ⏲️`;
    } else {
      return `${seconds}s ⚡`;
    }
  };

  const getStatusColor = (statusName) => {
    // Use the color from the status definition if available
    const status = productionEntityData.statuses?.find(s => s.name === statusName);
    if (status?.color) {
      return status.color;
    }
    
    // Fallback colors
    const colors = {
      'Up': '#28a745',
      'Down': '#dc3545',
      'Maintenance': '#ffc107',
      'Idle': '#6c757d'
    };
    return colors[statusName] || '#6c757d';
  };

  const getStatusEmoji = (statusName) => {
    const emojis = {
      'Up': '🟢',
      'Down': '🔴',
      'Maintenance': '🟡',
      'Idle': '⚪',
      'Running': '🟢',
      'Stopped': '🔴',
      'Error': '❌',
      'Warning': '⚠️'
    };
    return emojis[statusName] || '⚫';
  };

  return (
    <div style={{ 
      padding: '1.5rem', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
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
          🏭 {productionEntityData.name} Status Timeline
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
              <strong>Type:</strong> {productionEntityData.entityType?.name}
            </div>
            <div style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
              <strong>Current Status:</strong> 
              <span style={{ 
                marginLeft: '0.5rem',
                fontSize: '1.2rem'
              }}>
                {getStatusEmoji(productionEntityData.status)} {productionEntityData.status}
              </span>
            </div>
          </div>
          
          {/* Play button */}
          <button
            onClick={playTimeline}
            disabled={loading || statusEvents.length === 0 || playingAnimation}
            style={{
              backgroundColor: playingAnimation ? '#6c757d' : '#28a745',
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
            {playingAnimation ? '⏸️ Playing...' : '▶️ Play Timeline'}
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          fontSize: '1.1rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
          Loading status changes...
        </div>
      ) : error ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#ffcccb',
          backgroundColor: 'rgba(220, 53, 69, 0.2)',
          padding: '1rem',
          borderRadius: '8px'
        }}>
          ❌ {error}
        </div>
      ) : statusEvents.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          fontSize: '1.1rem',
          opacity: 0.8
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          No status changes recorded yet
        </div>
      ) : (
        <>
          {/* Status Events Timeline */}
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
                📈 {statusEvents.length} Status Changes Recorded
              </div>
              {selectedEvent && (
                <div style={{ 
                  fontSize: '0.9rem', 
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  Currently viewing: {getStatusEmoji(selectedEvent.parameterValueString)} {selectedEvent.parameterValueString}
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
              {statusEvents.map((event, index) => {
                const isSelected = selectedEvent?.id === event.id;
                const isActive = playingAnimation && currentEventIndex === index;
                
                return (
                  <div
                    key={event.id}
                    onClick={() => selectEvent(event, index)}
                    style={{
                      minWidth: '120px',
                      textAlign: 'center',
                      cursor: playingAnimation ? 'default' : 'pointer',
                      transform: isSelected || isActive ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                  >
                    {/* Status bubble */}
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: getStatusColor(event.parameterValueString),
                        margin: '0 auto 0.5rem auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                        boxShadow: isSelected || isActive ? '0 0 20px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
                        border: isSelected || isActive ? '3px solid #fff' : 'none',
                        animation: isActive ? 'bounce 0.6s infinite alternate' : 'none'
                      }}
                    >
                      {getStatusEmoji(event.parameterValueString)}
                    </div>
                    
                    {/* Status name */}
                    <div style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold',
                      color: getStatusColor(event.parameterValueString),
                      marginBottom: '0.25rem'
                    }}>
                      {event.parameterValueString}
                    </div>
                    
                    {/* Event number */}
                    <div style={{ 
                      fontSize: '0.7rem', 
                      color: '#999',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '10px',
                      padding: '0.2rem 0.4rem'
                    }}>
                      #{index + 1}
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
                border: `3px solid ${getStatusColor(selectedEvent.parameterValueString)}`,
                animation: playingAnimation && selectedEvent ? 'slideIn 0.5s ease' : 'none'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    marginRight: '1rem' 
                  }}>
                    {getStatusEmoji(selectedEvent.parameterValueString)}
                  </div>
                  <div>
                    <h4 style={{ 
                      margin: 0, 
                      color: getStatusColor(selectedEvent.parameterValueString),
                      fontSize: '1.3rem'
                    }}>
                      Status: {selectedEvent.parameterValueString}
                    </h4>
                    <div style={{ 
                      color: '#666', 
                      fontSize: '0.9rem' 
                    }}>
                      Event #{currentEventIndex + 1} of {statusEvents.length}
                    </div>
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  <div>
                    <strong>📅 Started:</strong><br />
                    {formatDate(selectedEvent.start).date}<br />
                    <strong>🕐 Time:</strong> {formatDate(selectedEvent.start).time}
                  </div>
                  <div>
                    <strong>⏱️ Duration:</strong><br />
                    {formatDuration(selectedEvent.start, selectedEvent.end)}
                  </div>
                  {selectedEvent.end && (
                    <div>
                      <strong>🏁 Ended:</strong><br />
                      {formatDate(selectedEvent.end).date}<br />
                      <strong>🕐 Time:</strong> {formatDate(selectedEvent.end).time}
                    </div>
                  )}
                </div>
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

export default ProductionEntityTimeline;
