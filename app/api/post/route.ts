import { connectToDatabase } from "@/utils/database/databse";
import { NextApiRequest, NextApiResponse } from "next";
import sharp from "sharp";
import { storage } from "@/utils/firebase";
import {
  getBlob,
  ref,
  getDownloadURL,
  getBytes,
  uploadBytes,
  getMetadata,
  deleteObject,
} from "firebase/storage";
import { NextResponse, NextRequest } from "next/server";

import Post from "@/utils/database/model/post";
import User from "@/utils/database/model/user";
export async function GET(req: NextRequest, res: NextResponse) {
  const page: any = req.nextUrl.searchParams.get("page");

  try {
    await connectToDatabase();
    const posts = await Post.find()
      .populate("user")
      .limit(2)
      .skip(2 * (page - 1))
      .sort({ createdAt: -1 });

    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const imageOriginal = data.imageUrl;
    const storageRef = ref(storage, imageOriginal);
    const urldata = await getBytes(storageRef);
    const metadata = await getMetadata(storageRef);
    const buffer = Buffer.from(urldata);
    const sharpBuffer = await sharp(buffer)
      .resize({
        width: 1080,
        height: 1080,
        fit: "cover",
        position: "center",
      })
      .withMetadata()
      .png()
      .toBuffer();
    const PostUser = await User.findOne({ email: data.user.user.email }).select(
      "_id"
    );
    const tags = data.tags.split(",");

    const post = new Post({
      caption: data.caption,
      user: PostUser._id,
      tag: tags,
      location: data.location,
    });
    await post.save();
    const storageRef2 = ref(storage, `Post/${post._id}.png`);
    const uploadTask = await uploadBytes(storageRef2, sharpBuffer);
    const url = await getDownloadURL(uploadTask.ref);
    console.log(url, "From CreatePost action");
    const postUpdate = await Post.findByIdAndUpdate(
      post._id,
      { image: url },
      { new: true }
    );
    await deleteObject(storageRef);

    return NextResponse.json({ message: "Post created successfully" });
  } catch (error) {
    console.log(error);
  }
}
