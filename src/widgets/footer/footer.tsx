"use client";

import Link from "next/link";
import { CarFront } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

export const Footer = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <CarFront className="h-6 w-6 text-primary" />

              <span className="text-lg font-bold">AutoHub</span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Buy and sell cars with confidence.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="text-sm font-semibold">Marketplace</h3>

            <nav className="mt-3 flex flex-col gap-2">
              <Link
                href="/cars"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Browse cars
              </Link>

              {user && (
                <>
                  <Link
                    href="/create-car"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Sell a car
                  </Link>

                  <Link
                    href="/favorites"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Favorites
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold">Account</h3>

            <nav className="mt-3 flex flex-col gap-2">
              {user && (
                <Link
                  href="/messages"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Messages
                </Link>
              )}

              <Link
                href="/profile"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Profile
              </Link>

              {!user && (
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AutoHub. All rights reserved by David Mayor.
          </p>
        </div>
      </div>
    </footer>
  );
};