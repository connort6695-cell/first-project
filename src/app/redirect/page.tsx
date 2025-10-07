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

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) {
      setStatus("No code found, redirecting to home...");
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
        setStatus("Exchanging code for session...");
        console.log("Redirect page: Processing code =", code);
        console.log("Redirect page: Full URL =", window.location.href);
        
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        
        console.log("Redirect page: Response data =", data);
        console.log("Redirect page: Response error =", error);
        
        if (error) {
          setStatus(`Error: ${error.message}`);
          console.error("Redirect page: Auth error:", error);
          setTimeout(() => router.replace("/"), 3000);
        } else {
          setStatus("Success! Redirecting to dashboard...");
          console.log("Redirect page: Success! Session =", data.session);
          router.replace("/dashboard");
        }
      } catch (err) {
        setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
        console.error("Redirect page: Exception:", err);
        setTimeout(() => router.replace("/"), 3000);
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
