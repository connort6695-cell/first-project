"use client";
/**
 * Login page (Supabase magic link)
 * Purpose: Collect email and send a magic link via Supabase
 * Location: src/app/login/page.tsx
 */
import React, { useEffect, useRef, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/Button";
import Link from "next/link";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setIsSending(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const email = emailRef.current?.value?.trim();
      if (!email) {
        setError("Please enter your email");
        return;
      }
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (authError) throw authError;
      setNotice("Check your inbox for the login link.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send magic link";
      setError(message);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h1 className="card-title">Sign in</h1>
          <form className="form-control gap-3" onSubmit={handleSend}>
            <label className="input input-bordered flex items-center gap-2">
              <span className="opacity-70">Email</span>
              <input ref={emailRef} type="email" placeholder="you@example.com" className="grow" required />
            </label>
            {notice ? <div className="alert alert-info">{notice}</div> : null}
            {error ? <div className="alert alert-error">{error}</div> : null}
            <Button type="submit" loading={isSending} className="btn-primary">Send magic link</Button>
          </form>
          <div className="text-sm opacity-70">
            By continuing, you agree to our terms.
          </div>
          <div className="card-actions justify-end">
            <Link href="/">Back home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


