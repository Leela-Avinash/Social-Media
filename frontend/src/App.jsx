import React, { useState } from "react";
import "./style.css";
import LandingPage from "./pages/landing.jsx";
import Signup from "./pages/signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./Components/Alert.jsx";

function App() {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type,
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<Signup showAlert={showAlert} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
