"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineMail,
  HiOutlineLogout,
  HiOutlineGlobe,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";

const LINKS = [
  { label: "Dashboard", href: "/admin", icon: HiOutlineHome, exact: true },
  { label: "Menu", href: "/admin/menu", icon: HiOutlineViewGrid },
  { label: "Messages", href: "/admin/messages", icon: HiOutlineMail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { admin, logout } = useAuth();

  const isActive = (link) =>
    link.exact ? pathname === link.href : pathname.startsWith(link.href);

  return (
    <aside className="w-64 bg-ink text-white flex flex-col h-screen sticky top-0 shrink-0">
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/admin" className="block">
          <span className="font-display font-bold text-lg text-white">
            After Sunrise
          </span>
          <span className="block text-xs text-accent mt-0.5">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {LINKS.map((link) => {
          const Icon = link.icon;
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-secondary text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <HiOutlineGlobe size={20} />
          View Site
        </a>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <HiOutlineLogout size={20} />
          Logout
        </button>
      </div>

      {admin && (
        <div className="px-6 py-4 border-t border-white/10">
          <div className="text-xs text-white/50">Signed in as</div>
          <div className="text-sm text-white truncate">{admin.email}</div>
        </div>
      )}
    </aside>
  );
}
