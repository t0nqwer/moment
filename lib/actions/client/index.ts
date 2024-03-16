import { storage } from "@/utils/firebase";
import {
  getBlob,
  ref,
  getDownloadURL,
  getBytes,
  uploadBytes,
  uploadBytesResumable,
  getMetadata,
} from "firebase/storage";

export const uploadimageFront = async (data: any) => {
  try {
    const file = data.file[0];
    console.log(file);
    const fileRef = ref(storage, `original/${file.name}`);
    const uploadTask = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(uploadTask.ref);

    console.log(url, "From CreatePost action");

    console.log(data, "From CreatePost action");
    return url;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (data: any) => {
  try {
    const res = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {}
};
