"use client";
/**
 * AuthExchange component
 * Purpose: If a magic-link code lands on an arbitrary page (e.g., "/?code=..."),
 *          exchange it for a session and redirect to /dashboard.
 * Location: src/components/AuthExchange.tsx
 */
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AuthExchange() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<string>("");
  
  console.log("AuthExchange component mounted");

  useEffect(() => {
    const code = params.get("code");
    console.log("AuthExchange: code =", code);
    if (!code) return;
    
    setStatus("Processing magic link...");
    console.log("AuthExchange: Processing magic link");
    
    const supabase = getSupabaseBrowserClient();
    console.log("AuthExchange: supabase client =", supabase ? "available" : "null");
    if (!supabase) {
      setStatus("Error: Supabase not configured. Check environment variables.");
      return;
    }
    
    (async () => {
      try {
        setStatus("Exchanging code for session...");
        console.log("AuthExchange: Exchanging code for session");
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (error) {
          console.error("AuthExchange: Error exchanging code:", error);
          setStatus(`Error: ${error.message}`);
        } else {
          console.log("AuthExchange: Success, redirecting to dashboard");
          setStatus("Success! Redirecting to dashboard...");
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("AuthExchange: Exception:", err);
        setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    })();
  }, [params, router]);

  // Always show component for debugging
  const code = params.get("code");
  console.log("AuthExchange render: code =", code, "status =", status);
  
  return (
    <div className="fixed top-4 right-4 bg-base-100 p-4 rounded-lg shadow-lg border z-50">
      <p className="text-sm">
        AuthExchange: {code ? `Code: ${code}` : "No code"} | {status || "Ready"}
      </p>
    </div>
  );
}


