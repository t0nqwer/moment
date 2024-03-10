import { connectToDatabase } from "@/utils/database/databse";
import User from "@/utils/database/model/user";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, name, username, password } = await req.json();

  try {
    await connectToDatabase();
    const user = await User.findOne({ email }).select("_id");
    if (user) {
      return NextResponse.json({ user });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({ user: newUser });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
