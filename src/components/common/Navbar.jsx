import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Map, LogIn, LogOut, User, Menu, X, Home } from 'lucide-react';
import useStore from '../../store/useStore';

export default function Navbar() {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🗺️</span>
          <span className="brand-text">TripPlan</span>
        </Link>

        <div className="navbar-links desktop-only">
          <Link to="/" className={isActive('/')}>
            <Home size={16} /> 我的行程
          </Link>
        </div>

        <div className="navbar-actions desktop-only">
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="user-name"><User size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />{currentUser.name}</span>
              <button className="btn-ghost" onClick={handleLogout}>
                <LogOut size={16} /> 登出
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary">
              <LogIn size={16} /> 登入
            </Link>
          )}
        </div>

        <button className="hamburger mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>🏠 我的行程</Link>
          <div className="mobile-actions">
            {currentUser ? (
              <button className="btn-ghost" onClick={handleLogout}><LogOut size={16} /> 登出</button>
            ) : (
              <Link to="/login" className="btn-primary" onClick={() => setMenuOpen(false)}><LogIn size={16} /> 登入</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
