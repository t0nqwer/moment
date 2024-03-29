"use client";
import React, { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { PostValidation } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/components/shared/FileUploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { uploadimageFront, createPost } from "@/lib/actions/client";
import { useSession } from "next-auth/react";
import Loader from "@/components/shared/Loader";

type PostFormProps = {
  post?: {
    caption: string;
    imageUrl: string;
    location: string;
    tags: string;
  };
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const { data: user } = useSession();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: "",
      file: [],
      location: "",
      tags: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    startTransition(async () => {
      if (action === "Create") {
        const ImageUrl = await uploadimageFront(values);
        const data = { ...values, imageUrl: ImageUrl, user };
        await createPost(data);
        form.reset();
        router.push("/");
        return;
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full  max-w-5xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar text-off-white"
                  {...field}
                  placeholder="asdada"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary w-[105px] disabled:bg-secoundarybg whitespace-nowrap"
            disabled={isPending}
            // disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isPending ? <Loader /> : " Create Post"}
            {/* {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post */}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
