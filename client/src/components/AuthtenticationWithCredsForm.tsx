import FormField from "@/components/FormField";
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

interface AuthenticationWithCredsFormProps {
  title: string;
  description: string;
  buttonText: string;
  linkText: string;
  linkHref: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  values: { email: string; password: string };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthenticationWithCredsForm({
  title,
  description,
  buttonText,
  linkText,
  linkHref,
  onSubmit,
  values,
  handleChange,
}: AuthenticationWithCredsFormProps) {
  return (
    <div className="flex items-center bg-slate-600 h-screen w-full justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <FormField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="john.doe@dealt.fr"
              value={values.email}
              onChange={handleChange}
              required
            />
            <FormField
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="********"
              value={values.password}
              onChange={handleChange}
              required
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {linkText}
              <Link className="underline" href={linkHref}>
                {buttonText === "Signin" ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
