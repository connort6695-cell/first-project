"use client";
/**
 * MagicLinkHandler component
 * Purpose: Handle magic link authentication directly in the page
 * Location: src/components/MagicLinkHandler.tsx
 */
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function MagicLinkHandler() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const code = params.get("code");
    console.log("MagicLinkHandler: code =", code, "URL =", window.location.href);
    
    if (!code || isProcessing) return;
    
    setIsProcessing(true);
    setStatus("Processing magic link...");
    console.log("MagicLinkHandler: Processing magic link");
    
    const supabase = getSupabaseBrowserClient();
    console.log("MagicLinkHandler: supabase client =", supabase ? "available" : "null");
    
    if (!supabase) {
      setStatus("Error: Supabase not configured");
      setIsProcessing(false);
      return;
    }
    
    (async () => {
      try {
        setStatus("Exchanging code for session...");
        console.log("MagicLinkHandler: Exchanging code for session");
        
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        
        if (error) {
          console.error("MagicLinkHandler: Error:", error);
          setStatus(`Error: ${error.message}`);
        } else {
          console.log("MagicLinkHandler: Success!");
          setStatus("Success! Redirecting to dashboard...");
          
          // Clean up URL and redirect
          window.history.replaceState({}, document.title, window.location.pathname);
          router.replace("/dashboard");
        }
      } catch (err) {
        console.error("MagicLinkHandler: Exception:", err);
        setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setIsProcessing(false);
      }
    })();
  }, [params, router, isProcessing]);

  // Always show for debugging
  const code = params.get("code");
  console.log("MagicLinkHandler render: code =", code, "URL =", window.location.href);

  return (
    <div className="fixed top-4 right-4 bg-base-100 p-4 rounded-lg shadow-lg border z-50 max-w-sm">
      <p className="text-sm font-medium">Magic Link Handler</p>
      <p className="text-xs text-gray-600">
        {code ? `Code: ${code.substring(0, 8)}...` : "No code detected"}
      </p>
      <p className="text-xs text-gray-500">URL: {window.location.href}</p>
      <p className="text-sm">{status || "Ready"}</p>
    </div>
  );
}

export default MagicLinkHandler;
