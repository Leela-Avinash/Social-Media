import React from "react";
import Input from "./authInput.jsx";

const Signup = ({ credentials, handleChange, onSubmit }) => {
  const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <form
      className="bg-white w-full rounded-br-lg rounded-tr-lg"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        name="name"
        value={credentials.name}
        handleChange={handleChange}
        label="Name"
        minLength={3}
      />
      <Input
        type="text"
        name="username"
        value={credentials.username}
        handleChange={handleChange}
        label="Username"
        minLength={3}
      />
      <Input
        type="email"
        name="email"
        value={credentials.email}
        handleChange={handleChange}
        label="Email"
      />
      <Input
        type="password"
        name="password"
        value={credentials.password}
        handleChange={handleChange}
        label="Password"
        minLength={8}
      />
      <Input
        type="password"
        name="cpassword"
        value={credentials.cpassword}
        handleChange={handleChange}
        label="Confirm Password"
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
          Sign up with Google
        </button>
        <button className="bg-white text-black text-sm flex items-center justify-center w-full py-2 rounded-lg border-solid border-2">
          <i className="fab fa-facebook text-blue-600 hover:text-blue-800 mx-2"></i>
          Sign up with Facebook
        </button>
      </div>
      <div className="flex items-start mb-3">
        <input type="checkbox" id="terms" className="mr-2 mt-2" />
        <label htmlFor="terms" className="text-gray-400 text-sm">
          By signing up, you are creating a Flowbite account, and you agree to Flowbite's
          <a href="#" className="text-blue-500"> Terms of Use </a>
          and
          <a href="#" className="text-blue-500"> Privacy Policy</a>
          .
        </label>
      </div>
      <button
        type="submit"
        className={`w-full py-2 rounded-md transition duration-300 ${
          credentials.password.length < 8 ||
          credentials.cpassword.length < 8 ||
          credentials.name.length < 3 ||
          !isEmail(credentials.email)
            ? "bg-blue-300 text-white cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={
          credentials.password.length < 8 ||
          credentials.cpassword.length < 8 ||
          credentials.name.length < 3 ||
          !isEmail(credentials.email)
        }
      >
        Create An Account
      </button>
    </form>
  );
};

export default Signup;
