import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Import your components
import FoodEntry from './FoodEntry';
import FoodShortage from './FoodShortages';
import FoodMatching from './FoodMatching';
import ProviderDashboard from './ProviderDashboard';
import Login from './Login'; // Assuming you have this component
import SignUp from './Signup'; // Assuming you have this component
 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="logo">
            <Link to="/">Food Sharing Platform</Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            {user ? (
              <>
                <Link to="/donate-food">Donate Food</Link>
                <Link to="/request-food">Request Food</Link>
                <Link to="/find-food">Find Food</Link>
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={() => auth.signOut()}>Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </nav>

        <div className="content">
          <Routes>
            {/* Public routes */}
             
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected routes */}
            <Route path="/donate-food" element={
              <ProtectedRoute>
                <FoodEntry />
              </ProtectedRoute>
            } />
            <Route path="/request-food" element={
              <ProtectedRoute>
                <FoodShortage />
              </ProtectedRoute>
            } />
            <Route path="/find-food" element={
              <ProtectedRoute>
                <FoodMatching />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <ProviderDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Food Sharing Platform</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;