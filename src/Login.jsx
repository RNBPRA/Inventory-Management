import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useNavigate } from 'react-router-dom';

const IMAGE_URL = 'https://static.vecteezy.com/system/resources/previews/012/390/637/original/inventory-control-illustration-concept-professional-worker-is-checking-goods-on-shelve-for-inventory-management-vector.jpg';

const LoginForm = ({ onSubmit, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
  );
};

const App = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('https://your-api-url.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
       
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4 order-md-2">
          <h1 className="display-4 mb-3 fw-bold text-primary">Welcome to Inventory Management</h1>
          <p className="lead mb-5">Streamline your inventory with precision and ease.</p>
          <div className="login-form w-75 border rounded shadow p-4">
            <h2 className="mb-4 text-secondary">Login</h2>
            <LoginForm onSubmit={handleLogin} error={error} />
          </div>
        </div>
        <div className="col-md-6 d-none d-md-block p-0 order-md-1">
          <img
            src={IMAGE_URL}
            alt="Inventory Management"
            className="img-fluid h-100 w-100"
            style={{ objectFit: 'cover', maxHeight: '100%', maxWidth: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;