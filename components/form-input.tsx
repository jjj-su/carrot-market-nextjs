import { ReactElement } from "react";

interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
  icon: JSX.Element;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
  icon
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="relative">
        <span className="absolute left-4 top-2.5">{icon}</span>
        <input
          name={name}
          className="pl-11 bg-transparent text-sm rounded-full w-full h-10 border-neutral-300 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 focus:border-neutral-300 transition ring-neutral-300 placeholder:text-neutral-400"
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </label>
      {errors.map(error => (
        <span className="text-red-500 text-sm">{error}</span>
      ))}
    </div>
  );
}
