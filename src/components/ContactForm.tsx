"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Copy, Check, Mail, Sparkles, User, MessageSquare } from "lucide-react";

interface ContactFormProps {
  email: string;
}

export default function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !userEmail.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: userEmail, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setName("");
        setUserEmail("");
        setMessage("");
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try sending a direct email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Direct Info & Quick Copy Action */}
      <div className="lg:col-span-5 space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Fast Inquiries
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Let&rsquo;s Build Together
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Available for high-impact software roles, AI product consulting, freelance projects, and tech leadership.
            </p>
          </div>

          {/* Quick Copy Email Box */}
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Direct Inbox</p>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-mono font-bold text-zinc-200 truncate">{email}</span>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white text-zinc-300 hover:text-zinc-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Availability Perks */}
          <div className="space-y-2.5 pt-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>Full-Stack &amp; Autonomous AI Engineering</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>Remote &amp; Global Availability</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Contact Form */}
      <div className="lg:col-span-7">
        <div className="p-6 sm:p-10 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl space-y-6">
          
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2.5">
              <span>Send a Message</span>
              <Sparkles size={20} className="text-zinc-400" />
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Fill in your details below and your message will be forwarded directly to my inbox.
            </p>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Thank you for reaching out. I have received your message and will respond shortly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-2 px-5 py-2 rounded-xl bg-white text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 font-mono">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <User size={13} /> Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Mail size={13} /> Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="sarah@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <MessageSquare size={13} /> Project Details / Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, timeline, or how you'd like to collaborate..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-mono resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-xl cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
