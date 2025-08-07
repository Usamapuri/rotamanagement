import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Plus, Trash2, Users } from 'lucide-react';
import CreateTeamModal from './CreateTeamModal';

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('/api/team/all');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
      toast.error('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    if (!window.confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`/api/team/removeteam/${teamId}`);
      toast.success('Team deleted successfully');
      fetchTeams();
    } catch (error) {
      console.error('Error deleting team:', error);
      toast.error('Failed to delete team');
    }
  };

  if (loading) {
    return <div className="loading">Loading teams...</div>;
  }

  return (
    <div>
      <div className="flex flex-between mb-20">
        <div>
          <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>Team Management</h1>
          <p style={{ color: '#666' }}>Manage your organization's teams</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={16} />
          Create Team
        </button>
      </div>

      {teams.length === 0 ? (
        <div className="card text-center">
          <h3 style={{ color: '#666', marginBottom: '1rem' }}>No teams found</h3>
          <p style={{ color: '#999' }}>Create your first team to get started.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {teams.map(team => (
            <div key={team._id} className="card">
              <div className="flex flex-between" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={20} color="#007bff" />
                  <h3 style={{ color: '#333' }}>{team.name}</h3>
                </div>
                <button
                  onClick={() => handleDeleteTeam(team._id)}
                  className="btn btn-danger"
                  style={{ padding: '0.5rem', fontSize: '12px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <p style={{ color: '#666', fontSize: '14px' }}>{team.description}</p>

              <div style={{ marginTop: '1rem', fontSize: '14px', color: '#666' }}>
                Team ID: {team._id}
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateTeamModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchTeams();
          }}
        />
      )}
    </div>
  );
};

export default TeamManagement;
