import React from "react";
import Link from "next/link";
import Image from "next/image";
import { multiFormatDateString } from "@/utils/utils";

const PostCard = ({ post }: any) => {
  return (
    <div className="bg-dark-2 rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href={``}>
            <img
              src={
                // post.creator?.imageUrl ||
                "/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-10 lg:h-10 rounded-full"
            />
          </Link>

          <div className="flex flex-col select-none">
            <p className="base-medium lg:body-bold text-light-1">
              {post.user.username}
            </p>
            <div className="flex-center gap-2 text-mindaro-100">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.createdAt)}
              </p>

              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={`${post.image}`}
        className="w-full  rounded-[10px] object-cover mt-3 mb-5;"
        alt="more"
        width={1080}
        height={1080}
      />
    </div>
  );
};

export default PostCard;
