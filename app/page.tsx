"use client";

import Input from "../components/input";
import Button from "../components/button";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/20/solid";
import { handleForm } from "./actions";
import { useFormState } from "react-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [state, dispatch] = useFormState(handleForm, null);

  return (
    <div className="flex flex-col items-center gap-10 py-10 px-6">
      <span className="text-4xl">🔥</span>
      <form action={dispatch} className="flex flex-col gap-3 w-full">
        <Input
          icon={<EnvelopeIcon className="size-5" />}
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          icon={<UserIcon className="size-5" />}
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          icon={<KeyIcon className="size-5" />}
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
        {state !== null && !state?.fieldErrors ? (
          <div className="flex gap-4 items-center bg-green-500 px-4 w-full rounded-lg h-10">
            <CheckCircleIcon className="size-5" />
            <span>Welcome back!</span>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}
