import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Header from "../Components/Header.jsx";
import ProfileInfo from "../Components/profileInfo.jsx";
import Stats from "../Components/stats.jsx";
import ActionButtons from "../Components/profileActions.jsx";
import PostsGrid from "../Components/profilePosts.jsx";
import { useParams } from "react-router-dom";

const UserPage = () => {
    const user = useSelector((state) => state.user);
    const {username} = useParams();
    const host = "http://localhost:5000";
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserProfile = async() => {
            try{
            const response = await fetch(`${host}/api/users/profile/${username}`, {
                method: "GET",
                credentials: "include",
            });
            const json = await response.json();
            if(json.success){
                setUserData(json.user);
            }
            else{
                console.log("bla bla bla")
            }
        } catch(error){
            console.error("Error fetching user profile", error);
        }
        };
        fetchUserProfile();
    }, [username]);
    console.log(userData);
    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-deepPurple min-h-screen flex justify-center">
            <div className="w-full lg:w-3/5">
                <Header />
                <ProfileInfo
                    profilepic={userData.profilepic}
                    name={userData.name}
                    username={userData.username}
                    bio={userData.bio}
                />
                <Stats
                    followersCount={userData.followersCount}
                    followingCount={userData.followingCount}
                />
                <ActionButtons />
                <PostsGrid />
            </div>
        </div>
    );
};

export default UserPage;
