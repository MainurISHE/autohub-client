"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User } from "lucide-react";

import { useProfileQuery } from "@/features/auth/hooks/use-profile-query";
import { useUpdateProfileMutation } from "@/features/auth/hooks/use-update-profile-mutation";
import { useChangeAvatarMutation } from "@/features/auth/hooks/use-change-avatar-mutation";
import { useRemoveAvatarMutation } from "@/features/auth/hooks/use-remove-avatar-mutation";
import { useAuthStore } from "@/features/auth/store/auth.store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const EditProfilePage = () => {
  const router = useRouter();

  const { data, isLoading } = useProfileQuery();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const updateProfileMutation = useUpdateProfileMutation();
  const changeAvatarMutation = useChangeAvatarMutation();
  const removeAvatarMutation = useRemoveAvatarMutation();

  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (data) {
      setUser(data);

      setName(data.name ?? "");
      setLastName(data.lastName ?? "");
      setEmail(data.email ?? "");
      setPhoneNumber(data.phoneNumber ?? "");
    }
  }, [data, setUser]);

  useEffect(() => {
    if (isInitialized && user === null) {
      router.replace("/login");
    }
  }, [isInitialized, user, router]);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    setSelectedAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleAvatarUpload = () => {
    if (!selectedAvatar) {
      return;
    }

    changeAvatarMutation.mutate(selectedAvatar, {
      onSuccess: () => {
        setSelectedAvatar(null);
        setAvatarPreview(null);
      },
    });
  };

  const handleAvatarRemove = () => {
    removeAvatarMutation.mutate(undefined, {
      onSuccess: () => {
        setSelectedAvatar(null);
        setAvatarPreview(null);
      },
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProfileMutation.mutate({
      name: name.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      ...(phoneNumber.trim() && {
        phoneNumber: phoneNumber.trim(),
      }),
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
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
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
            <h1 className="text-2xl font-bold">Edit profile</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Update your personal information
            </p>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center border-b px-6 py-8">
          {avatarPreview || user.avatarUrl ? (
            <img
              src={avatarPreview || user.avatarUrl!}
              alt={`${user.name} ${user.lastName}`}
              className="h-28 w-28 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-muted">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          <div className="mt-4 flex items-center gap-2">
            <label
              htmlFor="avatar"
              className="cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Choose photo
            </label>

            <input
              id="avatar"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
            />

            {selectedAvatar && (
              <Button
                type="button"
                onClick={handleAvatarUpload}
                disabled={changeAvatarMutation.isPending}
              >
                {changeAvatarMutation.isPending ? "Uploading..." : "Upload"}
              </Button>
            )}

            {user.avatarUrl && !selectedAvatar && (
              <Button
                type="button"
                variant="outline"
                onClick={handleAvatarRemove}
                disabled={removeAvatarMutation.isPending}
              >
                {removeAvatarMutation.isPending ? "Removing..." : "Remove"}
              </Button>
            )}
          </div>

          {selectedAvatar && (
            <p className="mt-2 text-xs text-muted-foreground">
              Selected: {selectedAvatar.name}
            </p>
          )}
        </div>

        {/* Profile form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                First name
              </label>

              <Input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your first name"
                minLength={2}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last name
              </label>

              <Input
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Enter your last name"
                minLength={2}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone number
            </label>

            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex justify-end border-t pt-6">
            <Button type="submit" disabled={updateProfileMutation.isPending}>
              {updateProfileMutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>

          {updateProfileMutation.isSuccess && (
            <p className="text-sm text-green-600">
              Profile updated successfully.
            </p>
          )}

          {updateProfileMutation.isError && (
            <p className="text-sm text-destructive">
              Failed to update profile.
            </p>
          )}
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
