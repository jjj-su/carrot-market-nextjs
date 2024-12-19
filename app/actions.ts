"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  console.log(prevState);
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (formData.get("password") === "12345")
    return {
      result: "success"
    };
  else
    return {
      errors: ["wrong password"]
    };
};
