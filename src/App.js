import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<Navigate to="/signup" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
