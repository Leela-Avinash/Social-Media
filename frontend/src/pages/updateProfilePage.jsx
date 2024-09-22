import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
    const [profileImage, setProfileImage] = useState(null);
    const host = "http://localhost:5000";
    const user = useSelector((state) => state.user);
    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        bio: "",
    });

    // Update inputs when user data is loaded from Redux
    useEffect(() => {
        if (user) {
            setInputs({
                name: user.name || "",
                username: user.username || "",
                bio: user.bio || "",
            });
            setProfileImage(user.profilepic || null);
        }
    }, [user]);

    useEffect(() => {
        return () => {
            if (profileImage instanceof File) {
                URL.revokeObjectURL(profileImage.preview);
            }
        };
    }, [profileImage]);
    

    const defaultProfilePic = "https://via.placeholder.com/150"; // Default profile picture URL

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', inputs.name);
            formData.append('username', inputs.username);
            formData.append('bio', inputs.bio);
            if (profileImage instanceof File) {
                formData.append('profilepic', profileImage);
            }

            const response = await fetch(`${host}/api/users/update/${user.id}`, {
                method: "PUT",
                body: formData,
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            // Optionally, update the Redux store or provide user feedback here
        } catch (error) {
            console.error("Error updating profile:", error);
            // Optionally, display error message to the user
        }
    };

    const handleCancel = () => {
        // Reset form to original user data
        setInputs({
            name: user.name || "",
            username: user.username || "",
            bio: user.bio || "",
        });
        setProfileImage(user.profilepic || null);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
                onSubmit={handleSubmit}
                encType="multipart/form-data" // Important for file uploads
            >
                <h2 className="text-2xl font-bold mb-5 text-center">
                    Update Profile
                </h2>

                {/* Profile Image Upload */}
                <div className="mb-4 text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Image
                    </label>

                    <div className="flex justify-center mb-4">
                        <img
                            src={
                                profileImage instanceof File
                                    ? URL.createObjectURL(profileImage)
                                    : profileImage || defaultProfilePic
                            }
                            alt="Profile Preview"
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Name Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        value={inputs.name}
                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Username Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                {/* Bio Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                    </label>
                    <textarea
                        value={inputs.bio}
                        onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        placeholder="Tell us something about yourself"
                        rows="4"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
