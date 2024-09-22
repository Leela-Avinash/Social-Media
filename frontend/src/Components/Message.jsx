import React from "react";

const Message = ({ ownMessage }) => {
    return (
        <>
            {ownMessage ? (
                <div className="flex gap-2 self-end">
                    <p className="max-w-[350px] bg-blue-400 p-1 rounded-md">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam sequi labore exercitationem cumque 
                    </p>
                    <img
                        src="../../IMG/profile.JPG"
                        className="w-7 h-7 ml-1 rounded-full"
                        alt="Verified Badge"
                    />
                </div>
            ):(
                <div className="flex gap-2">
                    <img
                        src="../../IMG/profile.JPG"
                        className="w-7 h-7 ml-1 rounded-full"
                        alt="Verified Badge"
                    />
                    <p className="max-w-[350px] bg-gray-400 p-1 rounded-md">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam sequi labore exercitationem cumque ea optio amet, maxime laboriosam rerum, blanditiis nobis quod ullam distinctio placeat, sit quis! Vero iste perferendis id sint quam esse possimus a quae praesentium enim dolor numquam iusto, reprehenderit voluptatem temporibus. Recusandae itaque possimus voluptas a.
                    </p>
                </div>
            )}
        </>
    );
};

export default Message;
