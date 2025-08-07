import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';

const CreateShiftModal = ({ onClose, onSuccess, teamId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    location: '',
    date: '',
    start: '',
    end: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const shiftData = {
        ...formData,
        capacity: parseInt(formData.capacity),
        claimed: 0,
        teamId: teamId
      };

      await axios.post('/api/shifts/manager/addshift', shiftData);
      toast.success('Shift created successfully');
      onSuccess();
    } catch (error) {
      console.error('Error creating shift:', error);
      toast.error('Failed to create shift');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="card" style={{
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div className="flex flex-between" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#333' }}>Create New Shift</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <X size={20} color="#666" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Shift Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter shift name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Enter shift description"
            />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                className="form-control"
                value={formData.capacity}
                onChange={handleChange}
                required
                min="1"
                placeholder="Number of people needed"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Shift location"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="start">Start Time</label>
              <input
                type="time"
                id="start"
                name="start"
                className="form-control"
                value={formData.start}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="end">End Time</label>
              <input
                type="time"
                id="end"
                name="end"
                className="form-control"
                value={formData.end}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Creating...' : 'Create Shift'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShiftModal;
