import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Plus, Trash2, User, Phone, MapPin, Crown } from 'lucide-react';
import CreateUserModal from './CreateUserModal';

const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/api/user/manager/all/${user.teamId}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`/api/user/manager/deleteuser/${userId}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div>
      <div className="flex flex-between mb-20">
        <div>
          <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>User Management</h1>
          <p style={{ color: '#666' }}>Manage your team members</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="card text-center">
          <h3 style={{ color: '#666', marginBottom: '1rem' }}>No users found</h3>
          <p style={{ color: '#999' }}>Add your first team member to get started.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {users.map(userItem => (
            <div key={userItem._id} className="card">
              <div className="flex flex-between" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={20} color="#007bff" />
                  <h3 style={{ color: '#333' }}>
                    {userItem.firstName} {userItem.lastName}
                    {userItem.isManager && (
                      <Crown size={16} color="#ffc107" style={{ marginLeft: '0.5rem' }} />
                    )}
                  </h3>
                </div>
                {userItem._id !== user._id && (
                  <button
                    onClick={() => handleDeleteUser(userItem._id)}
                    className="btn btn-danger"
                    style={{ padding: '0.5rem', fontSize: '12px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px', color: '#666' }}>
                  <span style={{ fontWeight: '500' }}>Username:</span> {userItem.username}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px', color: '#666' }}>
                  <Phone size={14} />
                  {userItem.phoneNumber}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px', color: '#666' }}>
                  <MapPin size={14} />
                  {userItem.location}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <span style={{ fontWeight: '500' }}>Role:</span> {userItem.isManager ? 'Manager' : 'Employee'}
                </div>
              </div>

              <div style={{ fontSize: '14px', color: '#666' }}>
                <span style={{ fontWeight: '500' }}>User ID:</span> {userItem._id}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchUsers();
          }}
          teamId={user.teamId}
        />
      )}
    </div>
  );
};

export default UserManagement;
