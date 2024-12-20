import { InputHTMLAttributes, ReactElement } from "react";

interface InputProps {
  errors?: string[];
  name: string;
  icon: JSX.Element;
}

export default function Input({
  errors = [],
  name,
  icon,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="relative">
        <span className="absolute left-4 top-2.5">{icon}</span>
        <input
          name={name}
          className="pl-11 bg-transparent text-sm rounded-full w-full h-10 border-neutral-300 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 focus:border-neutral-300 transition ring-neutral-300 placeholder:text-neutral-400"
          {...rest}
        />
      </label>
      {errors.map(error => (
        <span className="text-red-500 text-sm">{error}</span>
      ))}
    </div>
  );
}
