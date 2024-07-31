import React from "react";
import Input from "./authInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setValidationErrors } from "../redux/slices/authSlice.js";

const Signup = ({ credentials, handleChange, onSubmit }) => {
    const dispatch = useDispatch();
    const { errors, backendError } = useSelector((state) => state.auth);

    const isEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const isValidPassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const validate = () => {
        const newErrors = {};
        if (!credentials.name) newErrors.name = "Please enter your name";
        if (!credentials.username) newErrors.username = "Please enter your preferred username";
        if (!isEmail(credentials.email))
            newErrors.email = "Please enter a valid email address";
        if (credentials.password.length < 8)
            newErrors.password = "Passwords must be eight or more characters";
        else if(!isValidPassword(credentials.password))
            newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        if (credentials.password !== credentials.cpassword)
            newErrors.cpassword = "Passwords do not match";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            dispatch(setValidationErrors(validationErrors));
        } else {
            dispatch(setValidationErrors({}));
            onSubmit(e);
        }
    };

    return (
        <form
            className="bg-white w-full rounded-br-lg rounded-tr-lg"
            onSubmit={handleSubmit}
            noValidate
        >
            <Input
                type="text"
                name="name"
                value={credentials.name}
                handleChange={handleChange}
                label="Name"
                minLength={3}
            />
            {errors.name && <p className="text-red-400">{errors.name}</p>}
            <Input
                type="text"
                name="username"
                value={credentials.username}
                handleChange={handleChange}
                label="Username"
                minLength={3}
            />
            {errors.username && <p className="text-red-400 text-xs">{errors.username}</p>}
            <Input
                type="email"
                name="email"
                value={credentials.email}
                handleChange={handleChange}
                label="Email"
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            <Input
                type="password"
                name="password"
                value={credentials.password}
                handleChange={handleChange}
                label="Password"
                minLength={8}
            />
            {errors.password && (
                <p className="text-red-400 text-xs">{errors.password}</p>
            )}
            <Input
                type="password"
                name="cpassword"
                value={credentials.cpassword}
                handleChange={handleChange}
                label="Confirm Password"
                minLength={8}
            />
            {errors.cpassword && (
                <p className="text-red-400 text-xs">{errors.cpassword}</p>
            )}
            <div className="w-full flex justify-center mt-2">{backendError && <p className="text-red-400 text-sm">{backendError}</p>}</div>
            <div className="flex items-start my-2">
                <input type="checkbox" id="terms" className="mr-2 mt-2" />
                <label htmlFor="terms" className="text-gray-400 text-sm">
                    By signing up, you are creating a Flowbite account, and you
                    agree to Flowbite's
                    <a href="#" className="text-blue-500">
                        {" "}
                        Terms of Use{" "}
                    </a>
                    and
                    <a href="#" className="text-blue-500">
                        {" "}
                        Privacy Policy{" "}
                    </a>
                    
                </label>
            </div>
            <button
                type="submit"
                className={`w-full py-2 rounded-md mt-1 transition duration-300 ${
                    credentials.name.length < 3
                        ? "bg-blue-300 text-white cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={credentials.name.length < 3}
            >
                Create An Account
            </button>
            <div className="flex items-center my-3">
                <hr className="w-full border-gray-600" />
                <span className="mx-4 text-gray-400">or</span>
                <hr className="w-full border-gray-600" />
            </div>
        </form>
    );
};
export default Signup;
