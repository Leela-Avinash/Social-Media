import React from "react";
import Input from "./authInput.jsx";

const Login = ({ credentials, handleChange, onSubmit }) => {
  return (
    <form
      className="bg-white w-full rounded-br-lg rounded-tr-lg"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        name="identifier"
        value={credentials.identifier}
        handleChange={handleChange}
        label="Username or Email"
      />
      <Input
        type="password"
        name="password"
        value={credentials.password}
        handleChange={handleChange}
        label="Password"
        minLength={8}
      />
      <div className="flex items-center my-3">
        <hr className="w-full border-gray-600" />
        <span className="mx-4 text-gray-400">or</span>
        <hr className="w-full border-gray-600" />
      </div>
      <div className="flex md:flex-row flex-col md:space-x-3 space-y-3 md:space-y-0 mb-2">
        <button className="bg-white text-black text-sm flex items-center justify-center w-full py-2 rounded-lg border-solid border-2">
          <i className="fab fa-google text-red-600 hover:text-red-800 space-x-4 mx-2"></i>
          Sign in with Google
        </button>
        <button className="bg-white text-black text-sm flex items-center justify-center w-full py-2 rounded-lg border-solid border-2">
          <i className="fab fa-facebook text-blue-600 hover:text-blue-800 mx-2"></i>
          Sign in with Facebook
        </button>
      </div>
      <button
        type="submit"
        className={`w-full py-2 rounded-md transition duration-300 ${
          credentials.password.length < 8 || !credentials.identifier
            ? "bg-blue-300 text-white cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={
          credentials.password.length < 8 || !credentials.identifier
        }
      >
        Sign In
      </button>
    </form>
  );
};

export default Login;
