"use client";

import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/features/auth/hooks/use-register-mutation";
import {
  registerSchema,
  RegisterSchema,
} from "@/features/auth/model/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const RegisterPageContent = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const searchParams = useSearchParams();
  const registerMutation = useRegisterMutation(searchParams.get("returnUrl"));

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>Registration</CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit((data) => {
              registerMutation.mutate(data);
            })}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>

              <Input
                id="name"
                type="name"
                placeholder="Enter your name"
                {...form.register("name")}
              />

              {form.formState.errors.name && (
                <p className="test-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last name*</Label>

              <Input
                id="lastName"
                type="lastName"
                placeholder="Enter your last name"
                {...form.register("lastName")}
              />

              {form.formState.errors.lastName && (
                <p className="test-sm text-red-500">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>

              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                {...form.register("email")}
              />

              {form.formState.errors.email && (
                <p className="test-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>

              <Input
                id="phone"
                type="phone"
                placeholder="+000 (000) 000-000"
                {...form.register("phoneNumber")}
              />

              {form.formState.errors.phoneNumber && (
                <p className="test-sm text-red-500">
                  {form.formState.errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password*</Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...form.register("password")}
              />

              {form.formState.errors.password && (
                <p className="test-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export const RegisterPage = () => {
  return (
    <Suspense fallback={null}>
      <RegisterPageContent />
    </Suspense>
  );
};

export default RegisterPage;
