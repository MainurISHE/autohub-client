"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useProfileQuery } from "@/features/auth/hooks/use-profile-query";
import { useChangePasswordMutation } from "@/features/auth/hooks/use-change-password-mutation";
import { useAuthStore } from "@/features/auth/store/auth.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ChangePasswordPage = () => {
  const router = useRouter();

  const { data, isLoading } = useProfileQuery();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const changePasswordMutation = useChangePasswordMutation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  useEffect(() => {
    if (isInitialized && user === null) {
      router.replace("/login");
    }
  }, [isInitialized, user, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      return;
    }

    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
    });
  };

  if (isLoading || !data) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8">
      <div className="overflow-hidden rounded-xl border bg-background">
        {/* Header */}
        <div className="flex items-center gap-3 border-b px-6 py-5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold">Change password</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Keep your account secure with a strong password
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >
          <div className="space-y-2">
            <label
              htmlFor="currentPassword"
              className="text-sm font-medium"
            >
              Current password
            </label>

            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) =>
                setCurrentPassword(event.target.value)
              }
              placeholder="Enter your current password"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium"
            >
              New password
            </label>

            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
              placeholder="Enter your new password"
              minLength={8}
              required
            />

            <p className="text-xs text-muted-foreground">
              Password must contain at least 8 characters.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium"
            >
              Confirm new password
            </label>

            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Repeat your new password"
              minLength={8}
              required
            />

            {confirmPassword &&
              newPassword !== confirmPassword && (
                <p className="text-sm text-destructive">
                  Passwords do not match.
                </p>
              )}
          </div>

          {changePasswordMutation.isError && (
            <p className="text-sm text-destructive">
              Failed to change password. Check your current
              password.
            </p>
          )}

          <div className="flex justify-end border-t pt-6">
            <Button
              type="submit"
              disabled={
                changePasswordMutation.isPending ||
                newPassword !== confirmPassword
              }
            >
              {changePasswordMutation.isPending
                ? "Changing password..."
                : "Change password"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ChangePasswordPage;