import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    resetCredentials,
    updateCredentials,
    setError,
    clearFieldError,
    setSignUp,
} from "../redux/slices/authSlice";
import { setUser } from "../redux/slices/userSlice.js";
import Signup from "../Components/signupForm.jsx";
import Login from "../Components/loginForm.jsx";
import SocialLogin from "../Components/socialLogin.jsx";

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSignUp, credentials } = useSelector(
        (state) => state.auth
    );
    const host = "http://localhost:5000";

    useEffect(() => {
        dispatch(resetCredentials());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        if (name === "username") {
            sanitizedValue = value.toLowerCase().replace(/[^a-zA-Z0-9._-]/g, "");
        }
        if (name === "identifier") {
            sanitizedValue = value.toLowerCase();
        }
        dispatch(updateCredentials({ name, value: sanitizedValue }));
        dispatch(setError(""));
        dispatch(clearFieldError(name));
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (credentials.password === credentials.cpassword) {
            console.log(credentials);
            const response = await fetch(`${host}/api/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: credentials.name,
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password,
                }),
                credentials: "include",
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('user', JSON.stringify(json.user));
                dispatch(setUser(json.user));
                dispatch(resetCredentials());
                navigate("/");
            } else {
                dispatch(setError(json.message));
            }
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        const response = await fetch(`${host}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier: credentials.identifier,
                password: credentials.password,
            }),
            credentials: "include",
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch(setUser(json.user));
            dispatch(resetCredentials());
            navigate("/");
        } else {
            dispatch(setError(json.message));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center h-full md:overflow-hidden">
            <div className="rounded-lg bg-white flex w-full md:mx-24 m-6 shadow-md md:max-h-4/5 items-center justify-between">
                <div className="md:flex justify-center items-center w-1/2 hidden">
                    <img
                        src="../IMG/signup.jpeg"
                        alt="Img"
                        className="rounded-tl-lg rounded-bl-lg md:flex justify-center items-center p-4"
                    />
                </div>
                <div className="md:w-2/5 md:py-4 py-6 px-8 flex flex-col space-y-2 w-full">
                    <div>
                        <img src="" alt="" />
                        <h2 className="text-xl font-semibold">PL media</h2>
                    </div>
                    {isSignUp ? (
                        <>
                            <h1 className="text-2xl font-bold">
                                Create Your Account
                            </h1>
                            <p className="text-sm">
                                Start your website in seconds. Already have an
                                account?{" "}
                                <button
                                    onClick={() => dispatch(setSignUp(false))}
                                >
                                    Login here.
                                </button>
                            </p>
                            <Signup
                                credentials={credentials}
                                handleChange={handleChange}
                                onSubmit={handleSignupSubmit}
                            />
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold">
                                Signin to your Account
                            </h1>
                            <p className="text-sm">
                                Start your website in seconds. Don't have an
                                account?{" "}
                                <button
                                    onClick={() => dispatch(setSignUp(true))}
                                >
                                    Signup here.
                                </button>
                            </p>
                            <Login
                                credentials={credentials}
                                handleChange={handleChange}
                                onSubmit={handleLoginSubmit}
                            />
                        </>
                    )}
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Auth;
