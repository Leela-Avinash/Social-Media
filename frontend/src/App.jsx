import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import "./style.css";

import LandingPage from "./pages/landing.jsx";
import Auth from "./pages/auth.jsx";
import { setAuth } from "./redux/slices/authSlice";
import UserPage from "./pages/userPage.jsx";
import { setUser } from "./redux/slices/userSlice.js";
import EmailVerify from "./pages/emailVerify.jsx";

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.user);

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
                    localStorage.setItem("user", JSON.stringify(json.user));
                    dispatch(setUser(json.user));
                    dispatch(setAuth(true));
                }
            } catch (error) {
                console.log("Error checking auth", error);
            }
        };

        checkAuth();
    }, [dispatch]);
    console.log(user);
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to={`/${user.username}`} />:<LandingPage />} />
                    <Route path="/auth" element={isAuthenticated ? <Navigate to={`/${user.username}`} /> : <Auth />} />
                    <Route path="/:username" element={<UserPage />} />
                    <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;