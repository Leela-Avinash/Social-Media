import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignUp } from "../redux/slices/authSlice";

const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (SignUp) => {
        dispatch(setSignUp(SignUp));
        navigate("/auth");
    };
    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 flex flex-col items-center h-full">
            <header className="w-full py-4">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <div className="text-2xl font-bold text-blue-600">
                        Project-PL
                    </div>
                    <div className="flex space-x-14 items-center">
                        <nav className=" hidden md:block">
                            <ul className="flex space-x-8 text-lg">
                                <li>
                                    <a href="#" className="text-gray-700">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700">
                                        Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700">
                                        About
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-full"
                            onClick={() => handleClick(false)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 min-w-full">
                <div className="flex flex-col-reverse items-center md:flex-row md:space-x-6 h-full w-full">
                    <div className="justify-center items-center w-1/2 md:flex hidden">
                        <img
                            src="../IMG/landing.png"
                            alt="Phone"
                            className="rounded-xl animate-fade-in"
                        />
                    </div>
                    <div className="w-1/2 mt-6 md:mt-0 flex flex-col justify-center items-center md:items-start">
                        <TypeAnimation
                            sequence={[
                                "Celebrate Social Media Day with your Favourite Influencer",
                                1000,
                            ]}
                            wrapper="div"
                            speed={50}
                            cursor={false}
                            style={{ display: "inline-block" }}
                            className="md:text-3xl font-bold leading-tight animate-fade-in text-gray-700 text-2xl"
                        />
                        <p className="mt-4 text-lg text-gray-600 animate-fade-in">
                            Join now and connect with influencers around the
                            world.
                        </p>
                        <button
                            className="gbtn mt-6 font-semibold animate-fade-in w-52 hover:text-white"
                            onClick={() => handleClick(true)}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
