import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Calendar, Users, UserCheck, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem 0',
      marginBottom: '2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <div className="flex flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/dashboard" style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontSize: '1.5rem', 
              fontWeight: 'bold' 
            }}>
              Rota Management
            </Link>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/dashboard" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                transition: 'background-color 0.3s'
              }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                 onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                <Home size={16} />
                Dashboard
              </Link>
              
              <Link to="/shifts" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                transition: 'background-color 0.3s'
              }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                 onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                <Calendar size={16} />
                Shifts
              </Link>
              
              {user?.isManager && (
                <>
                  <Link to="/teams" style={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s'
                  }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                     onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                    <Users size={16} />
                    Teams
                  </Link>
                  
                  <Link to="/users" style={{ 
                    color: 'white', 
                    textDecoration: 'none', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s'
                  }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                     onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
                    <UserCheck size={16} />
                    Users
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'white', fontWeight: '500' }}>
              Welcome, {user?.firstName} {user?.lastName}
            </span>
            <button 
              onClick={handleLogout}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
