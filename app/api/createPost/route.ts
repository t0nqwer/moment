import { connectToDatabase } from "@/utils/database/databse";
import Post from "@/utils/database/model/post";
import User from "@/utils/database/model/user";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    console.log(data);
    return NextResponse.json({ message: "Post created successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the post." },
      { status: 500 }
    );
  }
}
