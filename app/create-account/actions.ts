"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkPasswords = ({
  password,
  confirm_password
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const checkEmail = (email: string) => email.includes("zod.com");

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username??"
      })
      .min(5, "Username should be at least 5 characters long.")
      .toLowerCase()
      .trim(),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkEmail, "Only @zod.com emails are allowed"),
    password: z
      .string()
      .min(10, "Password should be at least 10 characters long.")
      .regex(
        /[0-9]/,
        "Password should contains at least one number (0123456789)."
      ),
    confirm_password: z
      .string()
      .min(10, "Password should be at least 10 characters long.")
      .regex(
        /[0-9]/,
        "Password should contains at least one number (0123456789)."
      )
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username
      },
      select: {
        id: true
      }
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken.",
        path: ["username"],
        fatal: true
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email
      },
      select: {
        id: true
      }
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken.",
        path: ["email"],
        fatal: true
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"]
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password")
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
      },
      select: {
        id: true
      }
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
