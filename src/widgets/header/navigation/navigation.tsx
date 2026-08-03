import Link from "next/link";

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
  return (
    <nav className="flex items-center gap-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
