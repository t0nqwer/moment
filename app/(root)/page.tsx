"use client";
import { useEffect, useState } from "react";

import PostCard from "../(components)/PostCard";

export default function Home() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isBottom, setIsBottom] = useState(false);
  const FetchPosts = async (page: number) => {
    const res = await fetch(`http://localhost:3000/api/post?page=${page} `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: object[] = await res.json();
    return data;
  };
  const handleScroll = (event: any) => {
    if (isBottom) return;
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const post: any = await FetchPosts(page);
      if (post.length === 0) {
        setIsBottom(true);
        setLoading(false);
        return;
      }

      setPosts((prev: any) => {
        const newdata = [...prev, ...post];
        const unique = newdata.filter(
          (obj, index) =>
            newdata.findIndex((item) => item._id === obj._id) === index
        );
        return unique;
      });
      setLoading(false);
    };
    loadPost();
  }, [page]);

  return (
    <main className=" flex flex-1 ">
      <div
        className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar"
        onScroll={handleScroll}
      >
        <div className="max-w-screen-sm flex flex-col items-center w-full gap-6">
          <h2 className="h3-bold md:h2-bold text-left w-full text-highlight">
            Home Feed
          </h2>
          <ul className="flex flex-col flex-1 gap-9 w-full ">
            {posts?.map((post: any) => (
              <li key={post._id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
          {loading && <p>Loading...</p>}
          {isBottom && <p>End of the line</p>}
        </div>
      </div>
    </main>
  );
}
