import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import SideNavebar from "../(components)/SideNavebar";
import "./globals.css";
// import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Provider from "../(components)/Provider";

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moment",
  description: "Share your moments with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <SessionProvider> */}
      <Provider>
        <body className={inter.className}>
          <div className="flex h-full grow-0">
            <SideNavebar />
            {children}
          </div>
        </body>
      </Provider>
      {/* </SessionProvider> */}
    </html>
  );
}
