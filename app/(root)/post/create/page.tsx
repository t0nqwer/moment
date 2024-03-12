import PostForm from "@/app/(components)/form/PostForm";
import React from "react";
import Image from "next/image";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full text-white">
          <Image
            src="/icons/add-post.svg"
            width={100}
            height={100}
            className=""
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
