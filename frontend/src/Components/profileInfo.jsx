import React from "react";

const ProfileInfo = ({profilepic, name, username, bio}) => {
    return (
        <div className="flex flex-col lg:flex-row lg:w-full">
            <div className="flex justify-center pt-4 lg:w-2/5">
                <img
                    src={profilepic || ""}
                    alt="Profile"
                    className="h-28 w-28 rounded-full lg:h-40 lg:w-40"
                />
            </div>
            <div className="text-center flex flex-col justify-center items-center lg:w-3/5 lg:text-left lg:items-start">
                <h1 className="text-white text-3xl pt-3 font tracking-wide">
                    {name}
                </h1>
                <h1 className="text-gray-200 text-s pt-1 font-thin tracking-wider">
                    @{username}
                </h1>
                <h1 className="text-white text-s font-thin pt-1 tracking-wider text-left">
                    {bio}
                </h1>
            </div>
        </div>
    );
};

export default ProfileInfo;
