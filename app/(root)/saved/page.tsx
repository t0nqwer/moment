import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }
  return <div>page</div>;
};

export default page;
