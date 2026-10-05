"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await authClient.signIn.email({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message ?? "সাইন ইন করা যায়নি, আবার চেষ্টা করুন।");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold text-red-700">
        সাইন ইন
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-1 text-sm">
          ইমেইল
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
          />
        </label>

        <label className="grid gap-1 text-sm">
          পাসওয়ার্ড
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn border-none bg-red-700 text-white hover:bg-red-800"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-red-700">
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;