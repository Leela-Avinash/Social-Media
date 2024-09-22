import React from "react";

const MessageInput = () => {
    return (
        <form className="flex">
            <div className="relative flex w-full">
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Type a message"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <i class="fa fa-paper-plane" aria-hidden="true"></i>
                </div>
            </div>
        </form>
    );
};

export default MessageInput;
