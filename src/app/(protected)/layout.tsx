"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/login");
    }
  }, [isInitialized, user, router]);

  if (!isInitialized || !user) {
    return null;
  }

  const isMessagesPage = pathname.startsWith("/messages");

  return (
    <>
      <Header />
      {children}
      {!isMessagesPage && <Footer />}
    </>
  );
}