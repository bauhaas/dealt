"use client";

import useAuthenticationWithCredsForm from "@/hooks/useAuthenticationWithCredsForm";
import AuthenticationWithCredsForm from "@/components/AuthtenticationWithCredsForm";

export default function SignIn() {
  const { values, handleChange, handleSignin } =
    useAuthenticationWithCredsForm();

  return (
    <AuthenticationWithCredsForm
      title="Sign in"
      description="Enter your email and password to access your account."
      buttonText="Signin"
      linkText="Don't have an account yet?"
      linkHref="/signup"
      onSubmit={handleSignin}
      values={values}
      handleChange={handleChange}
    />
  );
}
