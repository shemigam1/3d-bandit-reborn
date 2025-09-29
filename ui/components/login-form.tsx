"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LoginFormData,
  validateLoginForm,
  validateSignupForm,
  type SignupFormData,
} from "../lib/validation";
import { PasswordInput } from "./ui/password-input";
// import { useForm } from "react-hook-form";
import { loginUser, signupUser } from "../lib/api";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuth } from "@/context/authcontext";

// Custom resolver function that integrates with your validation
const loginFormResolver = (data: LoginFormData) => {
  const validationErrors = validateLoginForm(data);

  if (validationErrors.length === 0) {
    return {
      values: data,
      errors: {},
    };
  }

  // Convert your validation errors to React Hook Form format
  const errors: Record<string, { type: string; message: string }> = {};

  validationErrors.forEach((error) => {
    if (error.field) {
      errors[error.field] = {
        type: "manual",
        message: error.message,
      };
    }
  });

  return {
    values: {},
    errors,
  };
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    defaultValues: {
      // username: "",
      email: "",
      password: "",
      // confirmPassword: "",
    },
    resolver: loginFormResolver,
    mode: "onTouched",
  });

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearErrors("root");

      const response = await login(data.email, data.password);
      // console.log(data);

      if (response) {
        // console.log("user login success");
        window.location.href = "/user";
      } else {
        setError("root", {
          type: "manual",
          message: "Login failed. Please try again.",
        });
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Log in to your account</h1>
        {/* <p className="text-muted-foreground text-sm text-balance">
          Enter your information below to create your account
        </p> */}
      </div>

      {errors.root && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {errors.root.message}
        </div>
      )}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="bandit@example.com"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>

        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Log in with GitHub
        </Button>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
