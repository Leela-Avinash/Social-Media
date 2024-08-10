import React from "react";

const PostsGrid = () => {
    return (
        <div>
            <h1 className="flex justify-center text-gray-200 pt-4 tracking-widest font-semibold">
                POSTS
            </h1>
            <div className="border-t-2 border-gray-500 mt-2 mx-4"></div>
            <div className="grid grid-cols-3 gap-2 p-4">
                <div className="aspect-w-1 aspect-h-1">
                    <img
                        src="../IMG/post_1.JPG"
                        alt="Post 1"
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
                <div className="aspect-w-1 aspect-h-1">
                    <img
                        src="../IMG/post_1.JPG"
                        alt="Post 2"
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
                <div className="aspect-w-1 aspect-h-1">
                    <img
                        src="../IMG/post_1.JPG"
                        alt="Post 3"
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
                <div className="aspect-w-1 aspect-h-1">
                    <img
                        src="../IMG/post_1.JPG"
                        alt="Post 4"
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
                <div className="aspect-w-1 aspect-h-1">
                    <img
                        src="../IMG/post_1.JPG"
                        alt="Post 5"
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
                <div className="aspect-w-1 aspect-h-1">
                    <img
                        src="../IMG/post_1.JPG"
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default PostsGrid;
