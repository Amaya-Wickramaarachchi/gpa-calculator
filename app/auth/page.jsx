"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles.css';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) {
      setError('Username already exists');
      return;
    }
    users[username] = { username, password };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', username);
    setError(null);
    router.push('/calculator');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[username] || users[username].password !== password) {
      setError('Invalid username or password');
      return;
    }
    localStorage.setItem('currentUser', username);
    setError(null);
    router.push('/calculator');
  };

  return (
    <div className="container">
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={isRegistering ? handleRegister : handleLogin} className="form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="button button-blue">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="button button-link"
      >
        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
      <a href="/" className="button button-outline">Back to Home</a>
    </div>
  );
}