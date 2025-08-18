import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Register from './components/Registrer';
import { auth } from './firebase';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView('home');
  };

  const handleLogout = () => {
  setCurrentUser(null); //
  localStorage.removeItem('currentUser');
  setCurrentView('home'); 
};

  const handlePostCreated = () => {
    setCurrentView('home'); 
  };``

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />;
      case 'register':
        return <Register onLogin={handleLogin} onSwitchToLogin={() => setCurrentView('login')} />;
      case 'create':
        return currentUser ? <CreatePost currentUser={currentUser} onPostCreated={handlePostCreated} /> : <Login onLogin={handleLogin} />;
      default:
        return <PostList currentUser={currentUser} />; 
    }
  };

  return (
    <div className="app">
      <Header 
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;
