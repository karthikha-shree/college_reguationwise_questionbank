
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/astyle.css';
import axios from 'axios';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';


const AdminLogin = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);

      if (setIsLoggedIn) setIsLoggedIn(true); 
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    }
  };


  return (
    
    <div className="login-container">
         <LogoHeader />
         <Navbar />
      <div className="login-box">
        <h2>Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            id="admin-email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="admin-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminLogin;
