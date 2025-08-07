import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Users, User, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [shifts, setShifts] = useState([]);
  const [pendingShifts, setPendingShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      if (user.isManager) {
        // Fetch all shifts for manager's team
        const shiftsResponse = await axios.get(`/api/shifts/${user.teamId}`);
        setShifts(shiftsResponse.data);
        
        // Fetch pending shifts
        const pendingResponse = await axios.get(`/api/user/manager/allPending/${user.teamId}`);
        setPendingShifts(pendingResponse.data);
      } else {
        // Fetch user's shifts
        const shiftsResponse = await axios.get(`/api/user/employee/shifts/${user._id}`);
        setShifts(shiftsResponse.data);
        
        // Fetch user's pending shifts
        const pendingResponse = await axios.get(`/api/user/employee/pendingShifts/${user._id}`);
        setPendingShifts(pendingResponse.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingShifts = shifts
    .filter(shift => new Date(shift.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const todayShifts = shifts.filter(shift => {
    const shiftDate = new Date(shift.date);
    const today = new Date();
    return shiftDate.toDateString() === today.toDateString();
  });

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="mb-20">
        <h1 style={{ color: '#333', marginBottom: '0.5rem' }}>
          Welcome back, {user.firstName}!
        </h1>
        <p style={{ color: '#666' }}>
          {user.isManager ? 'Manager Dashboard' : 'Employee Dashboard'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-3 mb-20">
        <div className="card">
          <div className="flex flex-between">
            <div>
              <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{shifts.length}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Total Shifts</p>
            </div>
            <Calendar size={24} color="#007bff" />
          </div>
        </div>

        <div className="card">
          <div className="flex flex-between">
            <div>
              <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{todayShifts.length}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Today's Shifts</p>
            </div>
            <Clock size={24} color="#28a745" />
          </div>
        </div>

        <div className="card">
          <div className="flex flex-between">
            <div>
              <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{pendingShifts.length}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Pending Shifts</p>
            </div>
            <TrendingUp size={24} color="#ffc107" />
          </div>
        </div>
      </div>

      {/* Today's Shifts */}
      {todayShifts.length > 0 && (
        <div className="card mb-20">
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>Today's Shifts</h2>
          <div className="grid grid-2">
            {todayShifts.map(shift => (
              <div key={shift._id} style={{
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '1rem',
                background: '#f8f9fa'
              }}>
                <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>{shift.name}</h4>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '0.5rem' }}>
                  {shift.description}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '14px', color: '#666' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} />
                    {shift.start} - {shift.end}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={14} />
                    {shift.location}
                  </span>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '14px', color: '#666' }}>
                  Capacity: {shift.claimed}/{shift.capacity}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Shifts */}
      {upcomingShifts.length > 0 && (
        <div className="card mb-20">
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>Upcoming Shifts</h2>
          <div className="grid grid-2">
            {upcomingShifts.map(shift => (
              <div key={shift._id} style={{
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                padding: '1rem',
                background: '#f8f9fa'
              }}>
                <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>{shift.name}</h4>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '0.5rem' }}>
                  {shift.description}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '14px', color: '#666', marginBottom: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} />
                    {format(new Date(shift.date), 'MMM dd, yyyy')}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} />
                    {shift.start} - {shift.end}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '14px', color: '#666' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={14} />
                    {shift.location}
                  </span>
                  <span>
                    Capacity: {shift.claimed}/{shift.capacity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Shifts */}
      {pendingShifts.length > 0 && (
        <div className="card">
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>Pending Shifts</h2>
          <div className="grid grid-2">
            {pendingShifts.map(shift => (
              <div key={shift._id} style={{
                border: '1px solid #ffc107',
                borderRadius: '8px',
                padding: '1rem',
                background: '#fff3cd'
              }}>
                <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>{shift.name}</h4>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '0.5rem' }}>
                  {shift.description}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '14px', color: '#666' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} />
                    {format(new Date(shift.date), 'MMM dd, yyyy')}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} />
                    {shift.start} - {shift.end}
                  </span>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '14px', color: '#856404' }}>
                  ⚠️ Awaiting approval
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {shifts.length === 0 && pendingShifts.length === 0 && (
        <div className="card text-center">
          <h3 style={{ color: '#666', marginBottom: '1rem' }}>No shifts found</h3>
          <p style={{ color: '#999' }}>
            {user.isManager 
              ? 'No shifts have been created for your team yet.' 
              : 'You don\'t have any assigned shifts yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
