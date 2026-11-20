"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import api from "@/lib/api";

const INITIAL = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // basic client-side check
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent! Check your inbox — we'll get back to you soon.");
      setForm(INITIAL);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Name *"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          required
        />
        <Input
          label="Email *"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="080..."
        />
        <Input
          label="Subject *"
          name="subject"
          value={form.subject}
          onChange={onChange}
          placeholder="What's this about?"
          required
        />
      </div>
      <Textarea
        label="Message *"
        name="message"
        value={form.message}
        onChange={onChange}
        placeholder="Tell us what you need..."
        rows={6}
        required
      />
      <Button type="submit" variant="primary" size="lg" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}