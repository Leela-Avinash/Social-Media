import React from "react";

const Header = () => {
    return (
        <div className="flex justify-between w-full items-center pt-3 px-4">
            <i className="fa-solid fa-bars text-white"></i>
            <h1 className="text-white text-2xl font-bold animate-slide-in">
                PROFILE
            </h1>
            <i className="fa fa-gear text-white"></i>
        </div>
    );
};

export default Header;
