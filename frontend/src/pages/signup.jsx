import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../Components/authInput.jsx";

const Signup = (props) => {
    let navigate = useNavigate();
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        cpassword: "",
    });

    async function onSubmit(e) {
        e.preventDefault();
        console.log(credentials);
        if (credentials.password === credentials.cpassword) {
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
            });
            const json = await response.json();
            console.log(json);
            setCredentials({
                name: "",
                username: "",
                email: "",
                password: "",
                cpassword: "",
            });
            if (json.success) {
                localStorage.setItem("token", json.authToken);
                navigate("/");
                // props.showAlert("Account Created Successfully", "success");
            } else {
                // props.showAlert(
                //     "User with this email or name already exists",
                //     "danger"
                // );
            }
        } else {
            // props.showAlert("Please confirm the password correctly", "danger");
        }
    }

    function isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    }

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
                    <h1 className="text-2xl font-bold">Create Your Account</h1>
                    <p className="text-sm">
                        Start your website in seconds. Already have an account?{" "}
                        <Link to="/login" className="text-blue-300">
                            Login here.
                        </Link>
                    </p>
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
                            <input
                                type="checkbox"
                                id="terms"
                                className="mr-2 mt-2"
                            />
                            <label
                                htmlFor="terms"
                                className="text-gray-400 text-sm"
                            >
                                By signing up, you are creating a Flowbite
                                account, and you agree to Flowbite's
                                <Link to="#" className="text-blue-500">
                                    {" "}
                                    Terms of Use{" "}
                                </Link>{" "}
                                and
                                <Link to="#" className="text-blue-500">
                                    {" "}
                                    Privacy Policy
                                </Link>
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
                </div>
            </div>
        </div>
    );
};

export default Signup;
