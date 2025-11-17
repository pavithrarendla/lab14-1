import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';


const FestivalManager = () => {
  const [festivals, setFestivals] = useState([]);
  const [festival, setFestival] = useState({
    festivalId: '',
    name: '',
    type: '',
    description: '',
    duration: '',
    country: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedFestival, setFetchedFestival] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = `${import.meta.env.VITE_API_URL}/festivalapi`;

  useEffect(() => {
    fetchAllFestivals();
  }, []);

  const fetchAllFestivals = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setFestivals(res.data);
    } catch (error) {
      setMessage('Failed to fetch festivals.');
    }
  };

  const handleChange = (e) => {
    setFestival({ ...festival, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    for (let key in festival) {
      if (!festival[key] || festival[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const addFestival = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, festival);
      setMessage('Festival added successfully.');
      fetchAllFestivals();
      resetForm();
    } catch (error) {
      setMessage('Error adding festival.');
    }
  };

  const updateFestival = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, festival);
      setMessage('Festival updated successfully.');
      fetchAllFestivals();
      resetForm();
    } catch (error) {
      setMessage('Error updating festival.');
    }
  };

  const deleteFestival = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllFestivals();
    } catch (error) {
      setMessage('Error deleting festival.');
    }
  };

  const getFestivalById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedFestival(res.data);
      setMessage('');
    } catch (error) {
      setFetchedFestival(null);
      setMessage('Festival not found.');
    }
  };

  const handleEdit = (fest) => {
    setFestival(fest);
    setEditMode(true);
    setMessage(`Editing festival with ID ${fest.festivalId}`);
  };

  const resetForm = () => {
    setFestival({
      festivalId: '',
      name: '',
      type: '',
      description: '',
      duration: '',
      country: ''
    });
    setEditMode(false);
  };

  return (
    <div className="student-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Festival Management</h2>

      <div>
        <h3>{editMode ? 'Edit Festival' : 'Add Festival'}</h3>
        <div className="form-grid">
          <input type="number" name="festivalId" placeholder="Festival ID" value={festival.festivalId} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={festival.name} onChange={handleChange} />
          <input type="text" name="type" placeholder="Type" value={festival.type} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={festival.description} onChange={handleChange} />
          <input type="text" name="duration" placeholder="Duration" value={festival.duration} onChange={handleChange} />
          <input type="text" name="country" placeholder="Country" value={festival.country} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addFestival}>Add Festival</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateFestival}>Update Festival</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Festival By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter Festival ID"
        />
        <button className="btn-blue" onClick={getFestivalById}>Fetch</button>

        {fetchedFestival && (
          <div>
            <h4>Festival Found:</h4>
            <pre>{JSON.stringify(fetchedFestival, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Festivals</h3>
        {festivals.length === 0 ? (
          <p>No festivals found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(festival).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {festivals.map((fest) => (
                  <tr key={fest.festivalId}>
                    {Object.keys(festival).map((key) => (
                      <td key={key}>{fest[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(fest)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteFestival(fest.festivalId)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default FestivalManager;
