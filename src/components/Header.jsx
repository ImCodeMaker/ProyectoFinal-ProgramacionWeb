import React from 'react';
import '../styles/Header.css';

function Header({ currentUser, currentView, onNavigate, onLogout }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo" onClick={() => onNavigate('home')}>
            SocialApp
          </h1>
        </div>

        <nav className="header-nav">
          <button 
            className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>

          {currentUser && (
            <button 
              className={`nav-btn create-btn ${currentView === 'create' ? 'active' : ''}`}
              onClick={() => onNavigate('create')}
            >
              + Create Post
            </button>
          )}
        </nav>

        <div className="header-right">
          {currentUser ? (
            <div className="user-menu">
              <span className="user-greeting">
                Hello, {currentUser.displayName || 'User'}
              </span>
              <button 
                className="btn btn-logout" 
                onClick={onLogout} 
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button 
                className="btn btn-login"
                onClick={() => onNavigate('login')}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
