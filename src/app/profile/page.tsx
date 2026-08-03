"use client";

import { useProfileQuery } from "@/features/auth/hooks/use-profile-query";
import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";

export const ProfilePage = () => {
  const { data, isLoading, error } = useProfileQuery();

  const { setUser } = useAuthStore();

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  console.log("USER FROM STORE:", user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <p>{data.name}</p>
      <p>{data.email}</p>
      <p>{data.role}</p>
    </div>
  );
};

export default ProfilePage;
