"use client";
/**
 * Auth redirect page
 * Purpose: Handle magic link authentication and redirect to dashboard
 * Location: src/app/redirect/page.tsx
 */
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function RedirectPage() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("Processing magic link...");
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    const fullUrl = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      setStatus("No code found, redirecting to home...");
      // Clean URL just in case, then go home
      window.history.replaceState({}, document.title, window.location.pathname);
      router.replace("/");
      return;
    }

    // Prevent multiple executions
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("Error: Supabase not configured");
      return;
    }

    (async () => {
      try {
        // If this code was already processed, skip
        const lastCode = window.localStorage.getItem("last_code_processed");
        if (lastCode === code) {
          setStatus("Already processed. Redirecting to dashboard...");
          window.history.replaceState({}, document.title, window.location.pathname);
          router.replace("/dashboard");
          return;
        }

        // If already signed in, skip exchange
        const existing = await supabase.auth.getSession();
        if (existing.data.session) {
          setStatus("Already signed in. Redirecting to dashboard...");
          window.history.replaceState({}, document.title, window.location.pathname);
          router.replace("/dashboard");
          return;
        }

        setStatus("Exchanging code for session...");
        console.log("Redirect page: Processing code =", code);
        console.log("Redirect page: Full URL =", fullUrl);
        
        const { data, error } = await supabase.auth.exchangeCodeForSession(fullUrl);
        
        console.log("Redirect page: Response data =", data);
        console.log("Redirect page: Response error =", error);
        
        if (error) {
          setStatus(`Error: ${error.message}`);
          console.error("Redirect page: Auth error:", error);
          // Clean URL to avoid repeated attempts, then send to login
          window.history.replaceState({}, document.title, window.location.pathname);
          setTimeout(() => router.replace("/login"), 1500);
        } else {
          setStatus("Success! Redirecting to dashboard...");
          console.log("Redirect page: Success! Session =", data.session);
          // Mark code as processed and clean URL
          window.localStorage.setItem("last_code_processed", code);
          window.history.replaceState({}, document.title, window.location.pathname);
          router.replace("/dashboard");
        }
      } catch (err) {
        setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        console.error("Redirect page: Exception:", err);
        window.history.replaceState({}, document.title, window.location.pathname);
        setTimeout(() => router.replace("/login"), 1500);
      }
    })();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title justify-center">Authentication</h2>
          <p>{status}</p>
          <div className="card-actions justify-center">
            <div className="loading loading-spinner loading-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
