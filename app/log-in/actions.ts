"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmail = (email: string) => email.includes("zod.com");

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmail, "Only @zod.com emails are allowed")
    .refine(checkEmailExists, "An account with the email does not exists."),
  password: z
    .string({
      required_error: "Password is required"
    })
    .min(10, "Password should be at least 10 characters long.")
    .regex(
      /[0-9]/,
      "Password should contains at least one number (0123456789)."
    )
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        id: true,
        password: true
      }
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: []
        }
      };
    }
  }
};
