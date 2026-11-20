"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // If already logged in, bounce to dashboard
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/admin");
    }
  }, [loading, isAuthenticated, router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.replace("/admin");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Login failed. Check your credentials.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-card shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="font-display text-2xl font-bold text-secondary">
            After Sunrise
          </div>
          <div className="text-sm text-ink-muted mt-1">Admin Dashboard</div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@aftersunrise.com"
            autoComplete="email"
            required
          />

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full h-11 px-3 pr-10 rounded-lg border border-gray-200 bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={submitting}
            className="w-full"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-muted">
          Protected area. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}