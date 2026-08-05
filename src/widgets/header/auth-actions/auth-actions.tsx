"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogoutMutation } from "@/features/auth/hooks/use-logout-mutation";

export const AuthActions = () => {
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogoutMutation();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href={"/login"}>
          <Button variant={"ghost"}>Login</Button>
        </Link>

        <Link href={"/register"}>
          <Button>Register</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <Link href={"/profile"}>
        <Button variant={"ghost"}>Profile</Button>
      </Link>

      <Button variant={"outline"} onClick={() => logoutMutation.mutate()}>
        Logout
      </Button>
    </div>
  );
};
