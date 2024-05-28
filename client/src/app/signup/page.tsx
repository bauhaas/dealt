"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import FormField from "@/components/FormField";
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
