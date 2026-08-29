"use client";

import { useProfileQuery } from "@/features/auth/hooks/use-profile-query";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/features/auth/hooks/use-logout-mutation";
import { useRouter } from "next/navigation";

export const ProfilePage = () => {
  const { data } = useProfileQuery();
  const { setUser } = useAuthStore();
  const logoutMutation = useLogoutMutation();
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const router = useRouter();

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

  if (!data) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <div>
        <p>{data.name}</p>
        <p>{data.email}</p>
        <p>{data.role}</p>
      </div>

      <Button onClick={() => logoutMutation.mutate()}>
        Logout
      </Button>
    </div>
  );
};

export default ProfilePage;