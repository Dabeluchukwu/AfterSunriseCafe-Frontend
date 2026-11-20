"use client";

import { useEffect, useState } from "react";
import {
  HiOutlineTrash,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import toast from "react-hot-toast";
import Badge from "@/components/ui/Badge";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/format";
import api from "@/lib/api";

const statusTone = { unread: "red", read: "gray", replied: "green" };

export default function MessageDetail({
  message,
  onClose,
  onReplied,
  onDeleted,
  showBackButton = false,
}) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Reset the reply box when switching messages
  useEffect(() => {
    setReply(message.reply || "");
  }, [message._id, message.reply]);

  const onSubmitReply = async (e) => {
    e.preventDefault();
    if (!reply.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }
    setSending(true);
    try {
      const { data } = await api.post(`/contact/${message._id}/reply`, {
        reply: reply.trim(),
      });
      toast.success("Reply sent");
      onReplied?.(data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const onDelete = async () => {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await api.delete(`/contact/${message._id}`);
      toast.success("Message deleted");
      onDeleted?.(message._id);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          {showBackButton && (
            <button
              onClick={onClose}
              className="p-1 text-ink-muted hover:text-ink"
              aria-label="Back to list"
            >
              <HiOutlineArrowLeft size={20} />
            </button>
          )}
          <div className="min-w-0">
            <div className="font-display text-lg font-semibold text-ink truncate">
              {message.subject}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge tone={statusTone[message.status]}>{message.status}</Badge>
              <span className="text-xs text-ink-muted flex items-center gap-1">
                <HiOutlineClock size={12} /> {formatDate(message.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onDelete}
          disabled={deleting}
          className="p-2 text-ink-muted hover:text-secondary hover:bg-secondary-50 rounded-lg transition-colors disabled:opacity-50 shrink-0"
          aria-label="Delete message"
        >
          <HiOutlineTrash size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Sender details */}
        <div className="bg-gray-50 rounded-card p-4 space-y-2 text-sm">
          <div className="font-medium text-ink">{message.name}</div>
          <a
            href={`mailto:${message.email}`}
            className="flex items-center gap-2 text-ink-soft hover:text-secondary"
          >
            <HiOutlineMail size={14} /> {message.email}
          </a>
          {message.phone && (
            <a
              href={`tel:${message.phone}`}
              className="flex items-center gap-2 text-ink-soft hover:text-secondary"
            >
              <HiOutlinePhone size={14} /> {message.phone}
            </a>
          )}
        </div>

        {/* Message body */}
        <div>
          <div className="text-xs uppercase tracking-wider text-ink-muted mb-2">
            Message
          </div>
          <p className="text-ink-soft whitespace-pre-wrap">{message.message}</p>
        </div>

        {/* Previous reply (if any) */}
        {message.reply && (
          <div className="bg-emerald-50 rounded-card p-4 border border-emerald-100">
            <div className="text-xs uppercase tracking-wider text-emerald-700 mb-1">
              Your reply · {message.repliedAt ? formatDate(message.repliedAt) : ""}
            </div>
            <p className="text-sm text-ink-soft whitespace-pre-wrap">
              {message.reply}
            </p>
          </div>
        )}

        {/* Reply form */}
        <form onSubmit={onSubmitReply} className="pt-2 border-t border-gray-100">
          <label className="block text-sm font-medium text-ink mb-1.5 mt-2">
            {message.reply ? "Send another reply" : "Reply"}
          </label>
          <Textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Type your reply..."
            rows={5}
          />
          <div className="mt-3">
            <Button type="submit" variant="primary" disabled={sending}>
              {sending ? "Sending..." : "Send Reply"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}