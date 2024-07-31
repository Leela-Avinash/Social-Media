import React from "react";

const SocialLogin = ({onSubmit}) => {
    return (
        <form
            className="bg-white w-full rounded-br-lg rounded-tr-lg"
            onSubmit={onSubmit}
        >
            <div className="flex md:flex-row flex-col md:space-x-3 space-y-3 md:space-y-0 mb-2">
                <button className="bg-white text-black text-sm flex items-center justify-center w-full py-2 rounded-lg border-solid border-2 hover:border-t-red-500 hover:border-b-green-500 hover:border-r-blue-500 hover:border-l-yellow-500">
                    <i className="fab fa-google text-red-600 hover:text-red-800 space-x-4 mx-2"></i>
                    Sign up with Google
                </button>
                <button className="bg-white hover:border-blue-500 text-black text-sm flex items-center justify-center w-full py-2 rounded-lg border-solid border-2">
                    <i className="fab fa-facebook text-blue-600 hover:text-blue-800 mx-2"></i>
                    Sign up with Facebook
                </button>
            </div>
        </form>
    );
};

export default SocialLogin;
