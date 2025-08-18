import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Register({ onLogin, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      setIsSuccess(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.displayName });

      setMessage('Account created successfully! You are now logged in.');
      setIsSuccess(true);
      setFormData({ email: '', password: '', displayName: '' });

      if (onLogin) onLogin(userCredential.user);

    } catch (error) {

      let errorMsg = '';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMsg = 'This email is already in use.';
          break;
        case 'auth/invalid-email':
          errorMsg = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMsg = 'Password should be at least 6 characters.';
          break;
        default:
          errorMsg = error.message;
      }
      setMessage(errorMsg);
      setIsSuccess(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Account</h2>
      {message && (
        <div style={{ 
          color: isSuccess ? '#51cf66' : '#ff6b6b', 
          textAlign: 'center', 
          marginBottom: '20px',
          padding: '10px',
          border: `1px solid ${isSuccess ? '#51cf66' : '#ff6b6b'}`,
          borderRadius: '4px',
          backgroundColor: isSuccess ? 'rgba(81, 207, 102, 0.1)' : 'rgba(255, 107, 107, 0.1)'
        }}>
          {message}
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
          <label>Display Name</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
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
            minLength="6"
            required
          />
        </div>
        <button type="submit" className="form-submit">Create Account</button>
      </form>
      <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>
        Already have an account? Login here
      </a>
    </div>
  );
}

export default Register;
