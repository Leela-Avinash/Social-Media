import React, { useState } from "react";
import "./style.css";
import LandingPage from "./pages/landing.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Auth from "./pages/auth.jsx";
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleAuthForm } from './redux/slices/authSlice';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
