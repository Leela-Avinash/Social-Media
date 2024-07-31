import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./style.css";

import LandingPage from "./pages/landing.jsx";
import Auth from "./pages/auth.jsx";
import { setAuth } from "./redux/slices/authSlice";
import Profile from "./pages/profile.jsx";

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/users/check-auth",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const json = await response.json();
                console.log(json);
                if (json.success) {
                    dispatch(setAuth(true));
                }
            } catch (error) {
                console.error("Error checking auth", error);
            }
        };

        checkAuth();
    }, [dispatch]);
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
// isAuthenticated ? <Profile /> : 
// isAuthenticated ? <Navigate to="/" />:
export default App;
