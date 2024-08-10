import React from "react";

const Stats = ({followersCount, followingCount}) => {
    return (
        <div className="flex justify-evenly text-white pt-4 items-center">
            <div className="text-center flex-1">
                <div className="font-semibold text-lg">6</div>
                <div className="text-gray-400 tracking-wider text-xs">
                    POSTS
                </div>
            </div>
            <div className="text-center flex-1">
                <div className="font-semibold text-lg">{followersCount}</div>
                <div className="text-gray-400 tracking-wider text-xs">
                    FOLLOWERS
                </div>
            </div>
            <div className="text-center flex-1">
                <div className="font-semibold text-lg">{followingCount}</div>
                <div className="text-gray-400 tracking-wider text-xs">
                    FOLLOWING
                </div>
            </div>
        </div>
    );
};

export default Stats;
