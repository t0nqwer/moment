import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/option";
import "./globals.css";

const layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const isAuth = await getServerSession(options);
  return isAuth ? (
    redirect("/")
  ) : (
    <>
      <section className="flex w-full h-full bg-secoundarybg ">
        <div className=" flex flex-col items-center justify-center flex-1 py-10 w-1/2">
          {children}
        </div>
        <img
          src="/side.png"
          alt="logo"
          className="hidden object-cover w-1/2 h-screen bg-no-repeat  xl:block"
        />
      </section>
    </>
  );
};

export default layout;
