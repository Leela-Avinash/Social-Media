import React from "react";
import Conversations from "../Components/Conversations";
import MessageContainer from "../Components/MessageContainer";

const ChatPage = () => {
    return (
        <div className="flex justify-center w-screen">
            <div className="flex flex-col md:flex-row w-full md:w-[750px]">
                <div className="flex flex-col gap-4 w-full md:w-[30%]">
                    <div className="flex flex-col gap-2 w-full">
                        <p className="font-bold">Your Conversations</p>
                        <form className="flex gap-3 items-center">
                            <input
                                className="flex-1 p-2 border border-gray-300 rounded"
                                type="text"
                                placeholder="Search for a user"
                            />
                            <button>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                        {false &&
                            [0, 1, 2, 3, 4].map((_, i) => (
                                <div
                                    className="flex items-center p-2 rounded-md"
                                    key={i}
                                >
                                    <div className="flex gap-2 items-center">
                                        <div className="rounded-full bg-gray-300 w-12 h-9 animate-pulse"></div>

                                        {/* Rectangle Skeletons */}
                                        <div className="w-full flex flex-col gap-1">
                                            <div
                                                className="bg-gray-300 animate-pulse"
                                                style={{
                                                    width: "120px",
                                                    height: "12px",
                                                }}
                                            ></div>
                                            <div
                                                className="bg-gray-300 animate-pulse"
                                                style={{
                                                    width: "80%",
                                                    height: "8px",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        <Conversations />
                        <Conversations />
                        <Conversations />
                    </div>
                </div>
                {/* <div className="flex items-center justify-center w-full md:w-[70%] text-lg font-semibold rounded-md p-2 flex-col h-[400px]">
                    <p className="text-xl text-gray-600">
                        Select a conversation to start messaging
                    </p>
                </div> */}
                <MessageContainer />
            </div>
        </div>
    );
};

export default ChatPage;
