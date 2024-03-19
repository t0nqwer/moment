import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import SideNavebar from "../../components/shared/SideNavebar";
import "./globals.css";
// import { SessionProvider } from "next-auth/react";
// import type { AppProps } from "next/app";
import Provider from "../../components/shared/Provider";
// import { AuthProvider } from "@/context/AuthContext";
// import { authOptions } from "../api/auth/[...nextauth]/authOptions";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moment",
  description: "Share your moments with the world",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(options);
  // if (!session) redirect("/signin");
  return (
    <html lang="en">
      {/* <SessionProvider> */}
      <body className={inter.className}>
        <Provider>
          <div className="flex h-full grow-0 overflow-hidden">
            <SideNavebar />
            {children}
          </div>
        </Provider>
      </body>
      {/* </SessionProvider> */}
    </html>
  );
}
