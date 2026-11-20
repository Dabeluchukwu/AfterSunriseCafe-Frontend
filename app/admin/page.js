"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HiOutlineViewGrid,
  HiOutlineMail,
  HiOutlinePlusCircle,
  HiOutlineArrowRight,
} from "react-icons/hi";
import toast from "react-hot-toast";
import Topbar from "@/components/admin/Topbar";
import StatCard from "@/components/admin/StatCard";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import api from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, unread: 0, totalMessages: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, msgRes] = await Promise.all([
          api.get("/products"),
          api.get("/contact"),
        ]);
        const unread = msgRes.data.filter((m) => m.status === "unread").length;
        setStats({
          products: prodRes.data.length,
          unread,
          totalMessages: msgRes.data.length,
        });
        setRecent(msgRes.data.slice(0, 5));
      } catch (err) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <Topbar title="Dashboard" />
      <div className="p-6 space-y-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size={36} />
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                icon={HiOutlineViewGrid}
                label="Menu Items"
                value={stats.products}
                tone="red"
              />
              <StatCard
                icon={HiOutlineMail}
                label="Unread Messages"
                value={stats.unread}
                tone="pink"
              />
              <StatCard
                icon={HiOutlineMail}
                label="Total Messages"
                value={stats.totalMessages}
                tone="ink"
              />
            </div>

            <div className="bg-white rounded-card border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold text-ink">
                  Recent Messages
                </h2>
                <Link
                  href="/admin/messages"
                  className="text-sm text-secondary hover:underline flex items-center gap-1"
                >
                  View all <HiOutlineArrowRight size={14} />
                </Link>
              </div>

              {recent.length === 0 ? (
                <p className="text-sm text-ink-muted">No messages yet.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {recent.map((m) => (
                    <li key={m._id}>
                      <Link
                        href="/admin/messages"
                        className="flex items-start justify-between gap-3 py-3 hover:bg-gray-50 px-2 rounded transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-ink truncate">
                            {m.name} — {m.subject}
                          </div>
                          <div className="text-xs text-ink-muted truncate mt-0.5">
                            {m.message}
                          </div>
                        </div>
                        {m.status === "unread" && (
                          <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="/admin/menu/new" variant="primary">
                <HiOutlinePlusCircle /> Add Menu Item
              </Button>
              <Button href="/admin/menu" variant="secondary">
                Manage Menu
              </Button>
              <Button href="/admin/messages" variant="ghost">
                Open Inbox
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}