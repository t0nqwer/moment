import { z } from "zod";
import { PostValidation } from "@/lib/validation";

export const CreatePost = async (data: z.infer<typeof PostValidation>) => {
  console.log(data, "From CreatePost action");
};
