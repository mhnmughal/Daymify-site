import React, { useState, useEffect } from 'react';
import './adminpopup.css';


const baseurl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Adminpopup = () => {
  // State Management
  const [popups, setPopups] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    buttonText: '',
    buttonLink: '',
    isActive: true,
    startDate: '',
    endDate: '',
    displayFrequency: 'always',
    icon: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentPopupId, setCurrentPopupId] = useState(null);

  // Fetch Popups
  const fetchPopups = async () => {
    try {
      const response = await fetch(`${baseurl}/allpopups`);
      const data = await response.json();
      setPopups(data.data || []);
    } catch (error) {
      console.error('Error fetching popups:', error);
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchPopups();
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Create Popup
  const createPopup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseurl}/createpopup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        fetchPopups();
        // Reset form
        setFormData({
          title: '',
          description: '',
          buttonText: '',
          buttonLink: '',
          isActive: true,
          startDate: '',
          endDate: '',
          displayFrequency: 'always',
          icon: ''
        });
      }
    } catch (error) {
      console.error('Error creating popup:', error);
    }
  };

  // Update Popup
  const updatePopup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseurl}/update/${currentPopupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        fetchPopups();
        // Reset form and editing state
        setFormData({
          title: '',
          description: '',
          buttonText: '',
          buttonLink: '',
          isActive: true,
          startDate: '',
          endDate: '',
          displayFrequency: 'always',
          icon: ''
        });
        setIsEditing(false);
        setCurrentPopupId(null);
      }
    } catch (error) {
      console.error('Error updating popup:', error);
    }
  };

  // Edit Popup
  const handleEdit = (popup) => {
    setIsEditing(true);
    setCurrentPopupId(popup._id);
    setFormData({
      title: popup.title,
      description: popup.description,
      buttonText: popup.buttonText,
      buttonLink: popup.buttonLink,
      isActive: popup.isActive,
      startDate: popup.startDate,
      endDate: popup.endDate,
      displayFrequency: popup.displayFrequency,
      icon: popup.icon
    });
  };

  // Delete Popup
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseurl}/del/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (result.success) {
        fetchPopups();
      }
    } catch (error) {
      console.error('Error deleting popup:', error);
    }
  };

  return (
    <div className="popup-management">
      <h1>Popup Management</h1>

      {/* Popup Creation/Edit Form */}
      <form onSubmit={isEditing ? updatePopup : createPopup}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Button Text</label>
          <input
            type="text"
            name="buttonText"
            value={formData.buttonText}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Button Link</label>
          <input
            type="text"
            name="buttonLink"
            value={formData.buttonLink}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Display Frequency</label>
          <select
            name="displayFrequency"
            value={formData.displayFrequency}
            onChange={handleInputChange}
          >
            <option value="always">Always</option>
            <option value="once_per_session">Once per Session</option>
            <option value="once_per_day">Once per Day</option>
          </select>
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label style={{ display: 'flex', width: '100px' }}>
            <span>Active</span>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
            />
          </label>
        </div>

        <button type="submit">
          {isEditing ? 'Update Popup' : 'Create Popup'}
        </button>
        {isEditing && (
          <button 
            type="button" 
            onClick={() => {
              setIsEditing(false);
              setCurrentPopupId(null);
              setFormData({
                title: '',
                description: '',
                buttonText: '',
                buttonLink: '',
                isActive: true,
                startDate: '',
                endDate: '',
                displayFrequency: 'always',
                icon: ''
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Popup List */}
      <div className="popup-list">
        <h2>Existing Popups</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Display Frequency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {popups.map((popup) => (
              <tr key={popup._id}>
                <td>{popup.title}</td>
                <td>{popup.isActive ? 'Active' : 'Inactive'}</td>
                <td>{popup.displayFrequency}</td>
                <td>
                  <button onClick={() => handleEdit(popup)}>Edit</button>
                  <button onClick={() => handleDelete(popup._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminpopup;