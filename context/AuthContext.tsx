"use client";
import { IUser } from "@/types";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession, SessionProvider } from "next-auth/react";
// export const INITIAL_USER = {
//   id: "",
//   name: "",
//   username: "",
//   email: "",
//   imageUrl: "",
//   bio: "",
// };

// const INITIAL_STATE = {
//   user: INITIAL_USER,
//   isLoading: false,
//   isAuthenticated: false,
//   setUser: () => {},
//   setIsAuthenticated: () => {},
//   checkAuthUser: async () => false as boolean,
// };

// type IContextType = {
//   user: IUser;
//   isLoading: boolean;
//   setUser: React.Dispatch<React.SetStateAction<IUser>>;
//   isAuthenticated: boolean;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   checkAuthUser: () => Promise<boolean>;
// };

// const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const [user, setUser] = useState<IUser>(INITIAL_USER);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const { data: session, status } = useSession();
  // console.log(session, status);

  // const checkAuthUser = async () => {
  //   setIsLoading(true);

  //   try {
  //     if (status === "loading") return false;

  //     return false;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const cookieFallback = localStorage.getItem("cookieFallback");
  //   if (
  //     cookieFallback === "[]" ||
  //     cookieFallback === null ||
  //     cookieFallback === undefined
  //   ) {
  //     //   redirect("/signin");
  //   }

  //   checkAuthUser();
  // }, []);

  // const value = {
  //   user,
  //   setUser,
  //   isLoading,
  //   isAuthenticated,
  //   setIsAuthenticated,
  //   checkAuthUser,
  // };

  // return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

  return <SessionProvider>{children}</SessionProvider>;
}

// export const useUserContext = () => useContext(AuthContext);
