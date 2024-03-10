import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import SideNavebar from "../(components)/SideNavebar";
import "./globals.css";
// import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Provider from "../(components)/Provider";
import { AuthProvider } from "@/context/AuthContext";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
// import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
      <Provider>
        <AuthProvider>
          <body className={inter.className}>
            <div className="flex h-full grow-0">
              <SideNavebar />
              {children}
            </div>
          </body>
        </AuthProvider>
      </Provider>
      {/* </SessionProvider> */}
    </html>
  );
}
