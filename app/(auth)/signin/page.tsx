"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SigninValidation } from "@/lib/validation";
import Loader from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  const isPending = false;
  const isUserLoading = false;
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    console.log(user);
  };
  return (
    <Form {...form}>
      <div className="flex-col sm:w-420 flex-center">
        <div className=" w-full flex justify-center">
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </div>

        <h2 className="pt-5 text-white md:h2-bold sm:pt-12 text-center">
          Log in to your account
        </h2>
        <p className="mt-2 text-gray-500 small-medium md:base-regular">
          Welcome back! Please enter your details.
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col w-full gap-5 mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isPending || isUserLoading ? (
              <div className="gap-2 flex-center">
                <Loader /> Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>
          <p className="mt-2 text-center text-small-regular text-light-2">
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="ml-1 text-highlight text-small-semibold"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default page;
