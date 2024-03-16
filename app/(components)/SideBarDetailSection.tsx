"use client";
import { useSession } from "next-auth/react";

const SideBarDetailSection = () => {
  const { data: session, status } = useSession();
  console.log(session, "session nav");

  return (
    <div className=" select-none w-full rounded-md bg-secoundarybg flex mt-5">
      <div className="profile-info-div">
        <h1 className="text-white text-center text-[13px]">12</h1>
        <p className="text-gray-400 text-center text-xs">Posts</p>
      </div>
      <div className="profile-info-div">
        <h1 className="text-white text-center text-[13px]">12</h1>
        <p className="text-gray-400 text-center  text-xs">Following</p>
      </div>
      <div className="profile-info-div">
        <h1 className="text-white text-center text-[13px]">12</h1>
        <p className="text-gray-400 text-center text-xs">Follower</p>
      </div>
    </div>
  );
};

export default SideBarDetailSection;
