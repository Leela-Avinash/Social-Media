import React from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
    return (
        <div className="flex w-[70%] bg-100 rounded-md flex-col md:ml-4">
            <div className="flex w-full h-22 items-center gap-2 mt-2 mb-2">
                <img
                    className="w-8 h-8 md:w-12 md:h-12 rounded-full"
                    src="../../IMG/profile.JPG"
                    alt="Avatar"
                />
                <p className="flex items-center">
                    John Doe
                    <img
                        src="../../IMG/istockphoto-1396933001-612x612.png"
                        className="w-5 h-5 ml-1"
                        alt="Verified Badge"
                    />
                </p>
            </div>
            <hr />
            <div className="flex flex-col gap-4 my-4 h-[400px] overflow-y-auto p-2">
                {false &&
                    [0, 1, 2, 3, 4].map((_, i) => (
                        <div
                            className="flex gap-2 items-center p-1 rounded-md"
                            key={i}
                            style={{
                                alignSelf:
                                    i % 2 === 0 ? "flex-start" : "flex-end",
                            }}
                        >
                            {i % 2 === 0 && (
                                <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse"></div>
                            )}
                            <div className="flex flex-col space-y-2">
                                <div className="w-[250px] h-2 bg-gray-300 rounded animate-pulse"></div>
                                <div className="w-[250px] h-2 bg-gray-300 rounded animate-pulse"></div>
                                <div className="w-[250px] h-2 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                            {i % 2 !== 0 && (
                                <div className="w-7 h-7 rounded-full bg-gray-300 animate-pulse"></div>
                            )}
                        </div>
                    ))
                }
                <Message ownMessage={true}/>
                <Message ownMessage={false}/>
                <Message ownMessage={true}/>
                <Message ownMessage={false}/>
                <Message ownMessage={true}/>
                <Message ownMessage={false}/>
                <Message ownMessage={true}/>
                <Message ownMessage={true}/>
            </div>
            <MessageInput />
        </div>
    );
};

export default MessageContainer;
