"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

import { useProfileQuery } from "@/features/auth/hooks/use-profile-query";
import { useLogoutMutation } from "@/features/auth/hooks/use-logout-mutation";
import { useAuthStore } from "@/features/auth/store/auth.store";

import { Button } from "@/components/ui/button";

export const ProfilePage = () => {
  const router = useRouter();

  const { data, isLoading } = useProfileQuery();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const logoutMutation = useLogoutMutation();

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
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="overflow-hidden rounded-xl border bg-background">
        {/* Header */}
        <div className="border-b px-6 py-5">
          <h1 className="text-2xl font-bold">Profile</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Your personal information
          </p>
        </div>

        {/* Avatar + name */}
        <div className="flex flex-col items-center border-b px-6 py-8">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={`${user.name} ${user.lastName}`}
              width={112}
              height={112}
              className="h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-muted">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          <h2 className="mt-4 text-xl font-semibold">
            {user.name} {user.lastName}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {user.email}
          </p>
        </div>

        {/* Information */}
        <div className="divide-y">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-muted-foreground">
              First name
            </span>

            <span className="font-medium">
              {user.name}
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-muted-foreground">
              Last name
            </span>

            <span className="font-medium">
              {user.lastName}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 px-6 py-4">
            <span className="text-sm text-muted-foreground">
              Email
            </span>

            <span className="truncate font-medium">
              {user.email}
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-muted-foreground">
              Phone
            </span>

            <span className="font-medium">
              {user.phoneNumber || "Not specified"}
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-muted-foreground">
              Role
            </span>

            <span className="font-medium">
              {user.role}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t px-6 py-5">
          <Button
            type="button"
            variant="destructive"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/profile/change-password")}
            >
              Change password
            </Button>

            <Button
              type="button"
              onClick={() => router.push("/profile/edit")}
            >
              Edit profile
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
