"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useLogoutMutation } from "@/features/auth/hooks/use-logout-mutation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useAuthStore } from "@/features/auth/store/auth.store";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/cars",
    label: "Catalog",
  },
];

export const MobileNavigation = () => {
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogoutMutation();

  const [isOpen, setIsOpen] = useState(false);

  const authLinks = [
    {
      href: "/favorites",
      label: "Favorites",
    },
    {
      href: "/messages",
      label: "Messages",
    },
  ];

  const handleNavigation = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    setIsOpen(false);
    logoutMutation.mutate();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" />}>
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2 px-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavigation}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}

          {user &&
            authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavigation}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}

          <div className="my-2 border-t" />

          {!user ? (
            <>
              <Link href="/login" onClick={handleNavigation}>
                <Button variant="ghost" className="w-full justify-start">
                  Login
                </Button>
              </Link>

              <Link href="/register" onClick={handleNavigation}>
                <Button className="w-full">Register</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/create-car" onClick={handleNavigation}>
                <Button className="w-full justify-start">Create car</Button>
              </Link>

              <Link href="/profile" onClick={handleNavigation}>
                <Button variant="ghost" className="w-full justify-start">
                  Profile
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
