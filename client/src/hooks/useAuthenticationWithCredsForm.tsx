import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useAuthenticationWithCredsForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/signup`,
        values,
      );
      router.push("/");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.error) {
      console.error("Failed to sign in");
    } else {
      router.push("/");
    }
  };

  return {
    values,
    handleChange,
    handleSignup,
    handleSignin,
  };
};

export default useAuthenticationWithCredsForm;
