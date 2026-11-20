"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}