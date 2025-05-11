import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import DepartmentView from './pages/DepartmentView';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('adminToken'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/admin"
          element={isLoggedIn ? <AdminPanel /> : <Navigate to="/admin-login" />}
        />
        <Route path="/department/:id" element={<DepartmentView />} />

      </Routes>
    </Router>
  );
}

export default App;
