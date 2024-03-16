// "use client";
// import { useEffect, useState } from "react";
import Image from "next/image";
import PostCard from "../(components)/PostCard";

export default async function Home() {
  // const [posts, setPosts] = useState([]);
  const FetchPosts = async () => {
    const res = await fetch("http://localhost:3000/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data, "From FetchPosts action");

    return data;
    // setPosts(data);
  };

  const posts = await FetchPosts();

  // useEffect(() => {
  //   FetchPosts();
  // }, []);

  return (
    <main className=" flex flex-1">
      <div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          <ul className="flex flex-col flex-1 gap-9 w-full ">
            {posts.map((post: any) => (
              <li>
                <PostCard key={post._id} post={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
