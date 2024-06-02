"use client";

import useAuthenticationWithCredsForm from "@/hooks/useAuthenticationWithCredsForm";
import AuthenticationWithCredsForm from "@/components/AuthtenticationWithCredsForm";

export default function SignupPage() {
  const { values, handleChange, handleSignup } =
    useAuthenticationWithCredsForm();

  return (
    <AuthenticationWithCredsForm
      title="Sign up"
      description="Enter your email and password to create your account."
      buttonText="Signup"
      linkText="Already have an account?"
      linkHref="/signin"
      onSubmit={handleSignup}
      values={values}
      handleChange={handleChange}
    />
  );
}
