import { useState, useEffect } from 'react';

function TableCrudDemo({ client, isReady, baseUrl }) {
  const [table, setTable] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newRecord, setNewRecord] = useState({
    textField: '',
    numberField: '',
    booleanField: false,
    dateField: '',
    textAreaField: '',
    resourceField: null
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);

  const tableName = "Demo Table";
  const tableColumns = [
    { name: 'textField', type: 'string'  },
    { name: 'numberField', type: 'number',  },
    { name: 'booleanField', type: 'boolean',  },
    { name: 'dateField', type: 'date',  },
    { name: 'textAreaField', type: 'string', },
    { name: 'resourceField', type: 'resource', }
  ];

  // Single column mapping for the table
  const columnMapping = {
    textField: 'COLUMN_textfield',
    numberField: 'COLUMN_numberfield', 
    booleanField: 'COLUMN_booleanfield',
    dateField: 'COLUMN_datefield',
    textAreaField: 'COLUMN_textareafield',
    resourceField: 'COLUMN_resourcefield'
  };

  // Reverse mapping for display
  const reverseColumnMapping = {}

  Object.keys(columnMapping).forEach(key => {
    reverseColumnMapping[columnMapping[key]] = key;
  });

  // Convert field names to column IDs for API calls
  const toApiFormat = (data) => {
    const converted = {};
    Object.keys(data).forEach(fieldName => {
      const columnId = columnMapping[fieldName];
      if (columnId) {
        converted[columnId] = data[fieldName];
      }
    });
    return converted;
  };

  // Convert API response back to field names for display
  const toDisplayFormat = (data) => {
    const converted = {};
    Object.keys(data).forEach(key => {
      const fieldName = reverseColumnMapping[key];
      if (fieldName) {
        converted[fieldName] = data[key];
      } else {
        // Keep non-mapped fields as-is (like id, createdAt, etc.)
        converted[key] = data[key];
      }
    });
    return converted;
  };

  // Upload file using File.uploadBase64
  const uploadFile = async (file) => {
    if (!file) return null;

    setUploading(true);
    try {
      // Convert file to base64
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const result = await client.services.ResourceService.uploadBase64({
        body: {
          base64Data: base64Data,
          filename: file.name,
          container: 'Users',
          hidden: true,
          options: {
            mediatype: 'file',
            folderId: null,
            validateFileUniqueness: false
          }
        }
      });
      console.log(result);
      return result[0]?.id || result.id;
    } catch (error) {
      console.error('File upload failed:', error);
      alert('File upload failed: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const initializeTable = async () => {
    if (!isReady || !client) return;

    setLoading(true);
    try {
      // First, check if table already exists
      const existingTable = await client.services.TableService.find({
        filter: JSON.stringify({
        where: { name: tableName },
        limit: 1
        })
      });

      if (existingTable[0]) {
        setTable(existingTable[0]);
        await loadRecords(existingTable[0].id);
      } else {
        // Create new table
        const newTable = await client.services.TableService.create({
            name: tableName,
            columns: tableColumns
        });
        setTable(newTable);
        setRecords([]);
      }
    } catch (error) {
      console.error('Error initializing table:', error);
      alert('Failed to initialize table');
    } finally {
      setLoading(false);
    }
  };

  const loadRecords = async (tableId) => {
    if (!tableId) return;

    try {
      const result = await client.services.TableService.findRecordsStrict({
        path: { tableId },
        query: {
          filter: JSON.stringify({
            limit: 20,
            sort: { createdAt: -1 }
          })
        }
      });
      
      // Convert records from column IDs back to field names
      const convertedRecords = (result || []).map(record => 
        toDisplayFormat(record)
      );
      
      setRecords(convertedRecords);
    } catch (error) {
      console.error('Error loading records:', error);
      setRecords([]);
    }
  };

  const createRecord = async () => {
    if (!table?.id) return;

    setCreating(true);
    try {
      // Upload file first if one is selected
      let resourceId = null;
      if (selectedFile) {
        resourceId = await uploadFile(selectedFile);
        if (!resourceId) {
          setCreating(false);
          return; // Don't create record if file upload failed
        }
      }

      const recordData = {
        ...newRecord,
        numberField: newRecord.numberField ? Number(newRecord.numberField) : null,
        dateField: newRecord.dateField || null,
        resourceField: resourceId
      };
      const apiData = toApiFormat(recordData);

      const result = await client.services.TableService.createRecordStrict({
        path: { tableId: table.id },
        body: {
          data: apiData
        }
      });

      // Convert the result back to field names for display
      const displayData = toDisplayFormat(result);
      setRecords(prev => [displayData, ...prev]);
      setNewRecord({
        textField: '',
        numberField: '',
        booleanField: false,
        dateField: '',
        textAreaField: '',
        resourceField: null
      });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error creating record:', error);
      alert('Failed to create record');
    } finally {
      setCreating(false);
    }
  };

  const updateRecord = async (recordId, data) => {
    if (!table?.id) return;

    try {
      const recordData = {
        ...data,
        numberField: data.numberField ? Number(data.numberField) : null,
        resourceField: data.resourceField ? data.resourceField : null
      };
      const apiData = toApiFormat(recordData);
      
      const result = await client.services.TableService.updateRecordStrict({
        path: { tableId: table.id },
        body: {
          where: { id: recordId },
          data: apiData
        }
      });

      // Convert the result back to field names for display
      const displayData = toDisplayFormat(result);
      setRecords(prev => 
        prev.map(record => 
          record.id === recordId ? { ...record, ...displayData } : record
        )
      );
      setEditingRecord(null);
    } catch (error) {
      console.error('Error updating record:', error);
      alert('Failed to update record');
    }
  };

  const deleteRecord = async (recordId) => {
    if (!table?.id) return;
    if (!confirm('Are you sure you want to delete this record?')) return;

    try {
      await client.services.TableService.deleteRecordStrict({
        where: { id: recordId }
      });

      setRecords(prev => prev.filter(record => record.id !== recordId));
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Failed to delete record');
    }
  };

  if (!isReady) {
    return <div>Waiting for app context...</div>;
  }

  if (loading) {
    return <div>Loading table...</div>;
  }

  if (!table) {
    return (
      <div>
        <p>Create and manage a custom table with CRUD operations:</p>
        <button
          onClick={initializeTable}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Initialize Demo Table
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>Custom table: <strong>{table.name}</strong> (ID: {table.id})</p>
      
      {/* Create New Record Form */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
        <h4>Create New Record</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Text Field:</label>
            <input
              type="text"
              value={newRecord.textField}
              onChange={(e) => setNewRecord(prev => ({ ...prev, textField: e.target.value }))}
              style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '2px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Number Field:</label>
            <input
              type="number"
              value={newRecord.numberField}
              onChange={(e) => setNewRecord(prev => ({ ...prev, numberField: e.target.value }))}
              style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '2px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Date Field:</label>
            <input
              type="date"
              value={newRecord.dateField}
              onChange={(e) => setNewRecord(prev => ({ ...prev, dateField: e.target.value }))}
              style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '2px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>File Field:</label>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '2px' }}
            />
            {selectedFile && (
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                Selected: {selectedFile.name}
              </small>
            )}
          </div>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <input
              type="checkbox"
              checked={newRecord.booleanField}
              onChange={(e) => setNewRecord(prev => ({ ...prev, booleanField: e.target.checked }))}
            />
            Boolean Field
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Text Area Field:</label>
          <textarea
            value={newRecord.textAreaField}
            onChange={(e) => setNewRecord(prev => ({ ...prev, textAreaField: e.target.value }))}
            style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '2px', minHeight: '60px' }}
          />
        </div>
        <button
          onClick={createRecord}
          disabled={creating || uploading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: (creating || uploading) ? 'not-allowed' : 'pointer',
            opacity: (creating || uploading) ? 0.6 : 1
          }}
        >
          {uploading ? 'Uploading File...' : creating ? 'Creating...' : 'Create Record'}
        </button>
      </div>

      {/* Records List */}
      <div>
        <h4>Records ({records.length})</h4>
        {records.length === 0 ? (
          <p>No records found. Create your first record above!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {records.map((record) => (
              <div key={record.id} style={{ 
                padding: '1rem', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                backgroundColor: editingRecord?.id === record.id ? '#f8f9fa' : 'white'
              }}>
                {editingRecord?.id === record.id ? (
                    <EditRecordForm
                      record={editingRecord}
                      onSave={(data) => updateRecord(record.id, data)}
                      onCancel={() => setEditingRecord(null)}
                      client={client}
                    />
                ) : (
                  <div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div><strong>Text:</strong> {record.textField || '-'}</div>
                        <div><strong>Number:</strong> {record.numberField ?? '-'}</div>
                        <div><strong>Boolean:</strong> {record.booleanField ? 'Yes' : 'No'}</div>
                        <div><strong>Date:</strong> {record.dateField ? new Date(record.dateField).toLocaleDateString() : '-'}</div>
                        <div><strong>File:</strong> {record.resourceField ? `Resource ID: ${record.resourceField}` : '-'}
                        {record.resourceField && (
                          <div>
                            <img src={`${baseUrl}/api/Resources/${record.resourceField}/medium/0`} alt="File" />
                          </div>
                        )}
                        </div>
                      </div>
                    {record.textAreaField && (
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong>Text Area:</strong> {record.textAreaField}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setEditingRecord(record)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#ffc107',
                          color: 'black',
                          border: 'none',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRecord(record.id)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '2px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EditRecordForm({ record, onSave, onCancel, client }) {
  const [editData, setEditData] = useState({
    textField: record.textField || '',
    numberField: record.numberField || '',
    booleanField: !!record.booleanField,
    dateField: record.dateField ? new Date(record.dateField).toISOString().split('T')[0] : '',
    textAreaField: record.textAreaField || '',
    resourceField: record.resourceField || null
  });
  const [editFile, setEditFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Upload file using File.uploadBase64
  const uploadFile = async (file) => {
    if (!file) return null;

    setUploading(true);
    try {
      // Convert file to base64
      const base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const result = await client.services.ResourceService.uploadBase64({
        body: {
          base64Data: base64Data,
          filename: file.name,
          container: 'Users',
          hidden: true,
          options: {
            mediatype: 'file',
            folderId: null,
            validateFileUniqueness: false
          }
        }
      });

      return result[0]?.id || result.id;
    } catch (error) {
      console.error('File upload failed:', error);
      alert('File upload failed: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    let finalData = { ...editData };
    
    // Upload new file if selected
    if (editFile) {
      const resourceId = await uploadFile(editFile);
      if (resourceId) {
        finalData.resourceField = resourceId;
      } else {
        return; // Don't save if file upload failed
      }
    }
    
    onSave(finalData);
  };

  return (
    <div>
      <h5>Edit Record</h5>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Text Field:</label>
          <input
            type="text"
            value={editData.textField}
            onChange={(e) => setEditData(prev => ({ ...prev, textField: e.target.value }))}
            style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '2px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Number Field:</label>
          <input
            type="number"
            value={editData.numberField}
            onChange={(e) => setEditData(prev => ({ ...prev, numberField: e.target.value }))}
            style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '2px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Date Field:</label>
          <input
            type="date"
            value={editData.dateField}
            onChange={(e) => setEditData(prev => ({ ...prev, dateField: e.target.value }))}
            style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '2px' }}
          />
        </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>File Field:</label>
            <input
              type="file"
              onChange={(e) => setEditFile(e.target.files[0])}
              style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '2px' }}
            />
            {editFile ? (
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                New file: {editFile.name}
              </small>
            ) : editData.resourceField ? (
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                Current: Resource ID {editData.resourceField}
              </small>
            ) : (
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                No file selected
              </small>
            )}
          </div>
        </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <input
            type="checkbox"
            checked={editData.booleanField}
            onChange={(e) => setEditData(prev => ({ ...prev, booleanField: e.target.checked }))}
          />
          Boolean Field
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Text Area Field:</label>
        <textarea
          value={editData.textAreaField}
          onChange={(e) => setEditData(prev => ({ ...prev, textAreaField: e.target.value }))}
          style={{ width: '100%', padding: '0.25rem', border: '1px solid #ccc', borderRadius: '2px', minHeight: '60px' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={handleSave}
          disabled={uploading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.6 : 1
          }}
        >
          {uploading ? 'Uploading...' : 'Save'}
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TableCrudDemo;
