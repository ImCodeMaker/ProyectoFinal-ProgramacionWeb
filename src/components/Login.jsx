import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login({ onLogin, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);

      const user = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || 'User'
      };

      onLogin(user);
    } catch (err) {
      // FIX: mostrar mensaje más amigable
      setError(err.code === 'auth/user-not-found' 
                ? 'Usuario no encontrado' 
                : err.code === 'auth/wrong-password' 
                  ? 'Contraseña incorrecta' 
                  : err.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      {error && (
        <div style={{ 
          color: '#ff6b6b', 
          textAlign: 'center', 
          marginBottom: '20px',
          padding: '10px',
          border: '1px solid #ff6b6b',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 107, 107, 0.1)'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-submit">Login</button>
      </form>
      <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>
        Don't have an account? Register here
      </a>
    </div>
  );
}

export default Login;
