"use client";

import { useEffect, useState, useCallback } from "react";
import { HiOutlineMail } from "react-icons/hi";
import toast from "react-hot-toast";
import Topbar from "@/components/admin/Topbar";
import MessageList from "@/components/admin/MessageList";
import MessageDetail from "@/components/admin/MessageDetail";
import Spinner from "@/components/ui/Spinner";
import EmptyState from "@/components/ui/EmptyState";
import api from "@/lib/api";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("");
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get("/contact");
      setMessages(data);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onSelect = async (message) => {
    setActive(message);
    setMobileDetailOpen(true);

    // Auto-mark-as-read if unread
    if (message.status === "unread") {
      try {
        await api.put(`/contact/${message._id}/read`);
        setMessages((prev) =>
          prev.map((m) =>
            m._id === message._id ? { ...m, status: "read" } : m
          )
        );
        setActive((prev) => ({ ...prev, status: "read" }));
      } catch {
        /* silent */
      }
    }
  };

  const onReplied = (updated) => {
    setMessages((prev) =>
      prev.map((m) => (m._id === updated._id ? updated : m))
    );
    setActive(updated);
  };

  const onDeleted = (id) => {
    setMessages((prev) => prev.filter((m) => m._id !== id));
    setActive(null);
    setMobileDetailOpen(false);
  };

  const filtered = filter
    ? messages.filter((m) => m.status === filter)
    : messages;

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="flex flex-col h-screen">
      <Topbar title={`Messages${unreadCount ? ` (${unreadCount} unread)` : ""}`} />

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Spinner size={36} />
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Left pane — list */}
          <div
            className={`w-full md:w-80 lg:w-96 border-r border-gray-100 bg-white shrink-0 ${
              mobileDetailOpen ? "hidden md:flex" : "flex"
            } flex-col`}
          >
            <MessageList
              messages={filtered}
              activeId={active?._id}
              onSelect={onSelect}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>

          {/* Right pane — detail */}
          <div
            className={`flex-1 bg-white ${
              mobileDetailOpen ? "flex" : "hidden md:flex"
            } flex-col`}
          >
            {active ? (
              <MessageDetail
                message={active}
                onReplied={onReplied}
                onDeleted={onDeleted}
                onClose={() => {
                  setMobileDetailOpen(false);
                  setActive(null);
                }}
                showBackButton={mobileDetailOpen}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState
                  icon={HiOutlineMail}
                  title="Select a message"
                  description="Click a message from the list to read and reply."
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}