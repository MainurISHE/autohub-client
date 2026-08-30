"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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

export const Navigation = () => {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

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

  return (
    <nav className="flex items-center gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
            pathname === link.href
              ? "bg-slate-100 text-slate-900"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          )}
        >
          {link.label}
        </Link>
      ))}

      {user &&
        authLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              pathname === link.href
                ? "bg-slate-100 text-slate-900"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            )}
          >
            {link.label}
          </Link>
        ))}
    </nav>
  );
};