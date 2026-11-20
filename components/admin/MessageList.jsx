"use client";

import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { HiOutlineMail } from "react-icons/hi";
import { formatDate } from "@/lib/format";

const TABS = [
  { label: "All", value: "" },
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
  { label: "Replied", value: "replied" },
];

const statusTone = { unread: "red", read: "gray", replied: "green" };

export default function MessageList({
  messages,
  activeId,
  onSelect,
  filter,
  onFilterChange,
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-100 flex gap-1 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => onFilterChange(t.value)}
            className={`px-3 py-1.5 rounded-pill text-xs font-medium whitespace-nowrap transition-colors ${
              filter === t.value
                ? "bg-secondary text-white"
                : "bg-gray-100 text-ink-soft hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState
            icon={HiOutlineMail}
            title="No messages"
            description="Messages from the contact form will appear here."
          />
        ) : (
          <ul className="divide-y divide-gray-100">
            {messages.map((m) => {
              const active = m._id === activeId;
              return (
                <li key={m._id}>
                  <button
                    onClick={() => onSelect(m)}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      active ? "bg-secondary-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          {m.status === "unread" && (
                            <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                          )}
                          <span
                            className={`text-sm truncate ${
                              m.status === "unread"
                                ? "font-semibold text-ink"
                                : "font-medium text-ink-soft"
                            }`}
                          >
                            {m.name}
                          </span>
                        </div>
                        <div className="text-sm text-ink truncate mt-0.5">
                          {m.subject}
                        </div>
                        <div className="text-xs text-ink-muted truncate mt-0.5">
                          {m.message}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] text-ink-muted">
                          {formatDate(m.createdAt)}
                        </span>
                        <Badge tone={statusTone[m.status]}>{m.status}</Badge>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}