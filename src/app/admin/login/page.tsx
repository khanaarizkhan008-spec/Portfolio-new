"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-[#f2f2f2] p-4">
      <div className="w-full max-w-md space-y-8 p-8 rounded-2xl bg-[#111] border border-white/10 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Access</h1>
          <p className="text-gray-400">Enter your credentials to manage the portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-white"
              placeholder="admin@rizz.dev"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-white/10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-white"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-black font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
