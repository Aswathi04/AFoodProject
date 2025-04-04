import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./Login";
import FoodEntry from "./FoodEntry";
import FoodShortages from "./FoodShortages";
import FoodEntryList from "./FoodEntryList";
import MapComponent from "./MapComponent";
import Navbar from "./Navbar";

function App() {
  const { user } = useAuth(); // Get current user

  return (
    <Router>
      {!user ? (
        <Login /> // If not logged in, show login page first
      ) : (
        <>
          <Navbar /> {/* Navigation Bar */}
          <Routes>
            <Route path="/food-entry" element={<FoodEntry />} />
            <Route path="/food-shortages" element={<FoodShortages />} />
            <Route path="/food-list" element={<FoodEntryList />} />
            <Route path="/map" element={<MapComponent />} />
            <Route path="*" element={<Navigate to="/food-list" />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
