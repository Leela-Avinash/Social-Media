import React from "react";
import { useNavigate } from "react-router-dom";

const ActionButtons = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-around pt-4 text-white">
            <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-slate-900 glass-button flex items-center justify-center">
                <i className="fa-solid fa-message text-gray-50 text-sm pr-3"></i>
                <h1 className="text-gray-400 text-sm tracking-widest" onClick={() => {navigate("/chat")}}>
                    MESSAGE
                </h1>
            </div>
            <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-slate-900 glass-button flex items-center justify-center">
                <i className="fa-solid fa-user-plus text-gray-50 text-sm pr-3"></i>
                <h1 className="text-gray-400 text-sm tracking-widest">
                    FOLLOW
                </h1>
            </div>
        </div>
    );
};

export default ActionButtons;
