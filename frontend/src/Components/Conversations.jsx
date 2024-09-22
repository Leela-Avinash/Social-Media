import React from "react";

const Conversations = () => {
    return (
        <div className="flex gap-4 items-center p-1 hover:cursor-pointer hover:bg-gray-600 hover:text-white rounded-md">
            <div className="flex items-center space-x-2">
                {/* Avatar with Tailwind sizes */}
                <img
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                    src='../../IMG/profile.JPG'
                    alt="Avatar"
                />
                {/* Badge */}
                <div className="relative">
                    <span className="absolute right-1.5 -bottom-6 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
            </div>

            <div className="flex flex-col text-sm space-y-1">
                <div className="flex items-center font-bold">
                    johndoe
                    <img
                        src="../../IMG/istockphoto-1396933001-612x612.png"
                        className="w-5 h-5 ml-1"
                        alt="Verified Badge"
                    />
                </div>
                <div className="flex items-center text-xs gap-1">
                    Hello some message ...
                </div>
            </div>
        </div>
    );
};

export default Conversations;
