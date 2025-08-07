import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Clock, MapPin, Users, Calendar } from 'lucide-react';
import CreateShiftModal from './CreateShiftModal';

const ShiftManagement = () => {
  const { user } = useAuth();
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      const response = await axios.get(`/api/shifts/${user.teamId}`);
      setShifts(response.data);
    } catch (error) {
      console.error('Error fetching shifts:', error);
      toast.error('Failed to fetch shifts');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShift = async (shiftId) => {
    if (!window.confirm('Are you sure you want to delete this shift?')) {
      return;
    }

    try {
      await axios.delete(`/api/shifts/manager/deleteshift/${shiftId}`);
      toast.success('Shift deleted successfully');
      fetchShifts();
    } catch (error) {
      console.error('Error deleting shift:', error);
      toast.error('Failed to delete shift');
    }
  };

  const handleClaimShift = async (shiftId) => {
    try {
      await axios.put(`/api/user/employee/claimShift/${shiftId}`);
      toast.success('Shift claimed successfully');
      fetchShifts();
    } catch (error) {
      console.error('Error claiming shift:', error);
      toast.error('Failed to claim shift');
    }
  };

  const handleApproveShift = async (shiftId) => {
    try {
      await axios.put(`/api/user/employee/approveShift/${shiftId}`);
      toast.success('Shift approved successfully');
      fetchShifts();
    } catch (error) {
      console.error('Error approving shift:', error);
      toast.error('Failed to approve shift');
    }
  };

  const handleDeclineShift = async (shiftId) => {
    try {
      await axios.put(`/api/user/employee/declineShift/${shiftId}`);
      toast.success('Shift declined successfully');
      fetchShifts();
    } catch (error) {
      console.error('Error declining shift:', error);
      toast.error('Failed to decline shift');
    }
  };

  if (loading) {
    return <div className="loading">Loading shifts...</div>;
  }

  return (
    <div>
      <div className="flex flex-between mb-20">
        <div>
          <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>Shift Management</h1>
          <p style={{ color: '#666' }}>
            {user.isManager ? 'Manage your team\'s shifts' : 'View and claim available shifts'}
          </p>
        </div>
        {user.isManager && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={16} />
            Create Shift
          </button>
        )}
      </div>

      {shifts.length === 0 ? (
        <div className="card text-center">
          <h3 style={{ color: '#666', marginBottom: '1rem' }}>No shifts found</h3>
          <p style={{ color: '#999' }}>
            {user.isManager 
              ? 'Create your first shift to get started.' 
              : 'No shifts are available for your team at the moment.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-2">
          {shifts.map(shift => (
            <div key={shift._id} className="card">
              <div className="flex flex-between" style={{ marginBottom: '1rem' }}>
                <h3 style={{ color: '#333' }}>{shift.name}</h3>
                {user.isManager && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleDeleteShift(shift._id)}
                      className="btn btn-danger"
                      style={{ padding: '0.5rem', fontSize: '12px' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>

              <p style={{ color: '#666', marginBottom: '1rem' }}>{shift.description}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px', color: '#666' }}>
                  <Calendar size={14} />
                  {format(new Date(shift.date), 'MMM dd, yyyy')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px', color: '#666' }}>
                  <Clock size={14} />
                  {shift.start} - {shift.end}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px', color: '#666' }}>
                  <MapPin size={14} />
                  {shift.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px', color: '#666' }}>
                  <Users size={14} />
                  Capacity: {shift.claimed}/{shift.capacity}
                </div>
              </div>

              {!user.isManager && shift.claimed < shift.capacity && (
                <button
                  onClick={() => handleClaimShift(shift._id)}
                  className="btn btn-success"
                  style={{ width: '100%' }}
                >
                  Claim Shift
                </button>
              )}

              {user.isManager && shift.claimed > 0 && (
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '14px' }}>Pending Approvals</h4>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleApproveShift(shift._id)}
                      className="btn btn-success"
                      style={{ flex: 1, fontSize: '12px' }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeclineShift(shift._id)}
                      className="btn btn-danger"
                      style={{ flex: 1, fontSize: '12px' }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateShiftModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchShifts();
          }}
          teamId={user.teamId}
        />
      )}
    </div>
  );
};

export default ShiftManagement;
