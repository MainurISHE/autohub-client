"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginSchema,
  loginSchema,
} from "@/features/auth/model/schemas/login.schema";
import { useLoginMutation } from "@/features/auth/hooks/use-login-mutation";

import { Mail } from "lucide-react";

const LoginPage = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const loginMutation = useLoginMutation();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit((data) => {
              loginMutation.mutate(data);
            })}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register("email")}
              />

              {form.formState.errors.email && (
                <p className="test-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...form.register("password")}
              />

              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
