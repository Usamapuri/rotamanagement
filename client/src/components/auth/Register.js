import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { UserPlus, User, Lock, Mail, Phone, MapPin, Users } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
    isManager: false,
    teamId: ''
  });
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('/api/team/all');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoadingTeams(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await register(formData);
    if (result.success) {
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 0'
    }}>
      <div className="card" style={{ 
        maxWidth: '500px', 
        width: '100%',
        margin: '0 20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <div className="text-center mb-20">
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white'
          }}>
            <UserPlus size={24} />
          </div>
          <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>Create Account</h2>
          <p style={{ color: '#666' }}>Join our rota management system</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#666'
                }} />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '40px' }}
                  placeholder="First name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#666'
              }} />
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
                style={{ paddingLeft: '40px' }}
                placeholder="Choose a username"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#666'
              }} />
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ paddingLeft: '40px' }}
                placeholder="Choose a password"
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#666'
                }} />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '40px' }}
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#666'
                }} />
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  style={{ paddingLeft: '40px' }}
                  placeholder="Location"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="teamId">Team</label>
            <div style={{ position: 'relative' }}>
              <Users size={16} style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#666'
              }} />
              <select
                id="teamId"
                name="teamId"
                className="form-control"
                value={formData.teamId}
                onChange={handleChange}
                required
                style={{ paddingLeft: '40px' }}
                disabled={loadingTeams}
              >
                <option value="">Select a team</option>
                {teams.map(team => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                name="isManager"
                checked={formData.isManager}
                onChange={handleChange}
                style={{ margin: 0 }}
              />
              Register as Manager
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || loadingTeams}
            style={{ 
              width: '100%', 
              marginTop: '1rem',
              opacity: (loading || loadingTeams) ? 0.7 : 1
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-20">
          <p style={{ color: '#666' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ 
              color: '#007bff', 
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
