import { useState, useEffect } from 'react';

function WorkorderNameChanger({ client, isReady }) {
  const [workorders, setWorkorders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    if (!isReady || !client) return;
    
    const fetchWorkorders = async () => {
      setLoading(true);
      try {
        const result = await client.services.WorkorderService.find({
          filter: {
            where: {
              or: [
                { workorderNumber: { like: "SC23000613" } },
                { workorderNumber: { like: "ADR.*" } },
                { workorderNumber: { like: "API.*" } }
              ]
            },
            fields: {
              id: 1,
              workorderNumber: 1,
              name: 1
            },
            limit: 10,
            sort: { created: 1 }
          }
        });
        setWorkorders(result);
      } catch (error) {
        console.error('Failed to fetch workorders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkorders();
  }, [client, isReady]);

  const updateWorkorderName = async (id, newName) => {
    setUpdating(prev => ({ ...prev, [id]: true }));
    try {
      await client.services.WorkorderService.customUpdate({id: id}, {        name: newName
      });
      setWorkorders(prev => 
        prev.map(wo => 
          wo.id === id ? { ...wo, name: newName } : wo
        )
      );
    } catch (error) {
      console.error('Failed to update workorder:', error);
      alert('Failed to update workorder name');
    } finally {
      setUpdating(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleNameChange = (id, newName) => {
    setWorkorders(prev => 
      prev.map(wo => 
        wo.id === id ? { ...wo, name: newName } : wo
      )
    );
  };

  if (!isReady) {
    return <div>Waiting for app context...</div>;
  }

  if (loading) {
    return <div>Loading workorders...</div>;
  }

  return (
    <div>
      <p>Edit workorder names and save changes:</p>
      
      {workorders.length === 0 ? (
        <p>No workorders found</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {workorders.map((workorder) => (
            <div key={workorder.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}>
              <span style={{ minWidth: '100px', fontWeight: 'bold' }}>
                {workorder.workorderNumber}:
              </span>
              <input
                type="text"
                value={workorder.name || ''}
                onChange={(e) => handleNameChange(workorder.id, e.target.value)}
                style={{ 
                  flex: 1, 
                  padding: '0.25rem',
                  border: '1px solid #ddd',
                  borderRadius: '2px'
                }}
                placeholder="Enter name..."
              />
              <button
                onClick={() => updateWorkorderName(workorder.id, workorder.name)}
                disabled={updating[workorder.id]}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: updating[workorder.id] ? 'not-allowed' : 'pointer',
                  opacity: updating[workorder.id] ? 0.6 : 1
                }}
              >
                {updating[workorder.id] ? 'Saving...' : 'Save'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkorderNameChanger;
