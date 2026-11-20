"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/ui/Spinner";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <Spinner size={40} />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Render nothing while router.replace kicks in
    return null;
  }

  return children;
}