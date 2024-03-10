import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/authOptions";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import { Metadata } from "next";
const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moment",
  description: "Share your moments with the world",
};
const RootLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const isAuth = await getServerSession(options);
  return isAuth ? (
    redirect("/")
  ) : (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
};

export default RootLayout;
