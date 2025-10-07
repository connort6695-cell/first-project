"use client";
/**
 * MagicLinkHandler component
 * Purpose: Handle magic link authentication directly in the page
 * Location: src/components/MagicLinkHandler.tsx
 */
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function MagicLinkHandler() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const [code, setCode] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Get code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlCode = urlParams.get("code");
    setCode(urlCode);
    
    // Only process once
    if (!urlCode || hasProcessed.current) return;
    
    hasProcessed.current = true;
    setStatus("Processing magic link...");
    
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("Error: Supabase not configured");
      return;
    }
    
    (async () => {
      try {
        setStatus("Exchanging code for session...");
        
        const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        
        if (error) {
          setStatus(`Error: ${error.message}`);
        } else {
          setStatus("Success! Redirecting to dashboard...");
          
          // Clean up URL and redirect
          window.history.replaceState({}, document.title, window.location.pathname);
          router.replace("/dashboard");
        }
      } catch (err) {
        setStatus(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    })();
  }, [router]);

  // Only show if we have a code
  if (!code) return null;

  return (
    <div className="fixed top-4 right-4 bg-base-100 p-4 rounded-lg shadow-lg border z-50 max-w-sm">
      <p className="text-sm font-medium">Magic Link Handler</p>
      <p className="text-xs text-gray-600">Code: {code.substring(0, 8)}...</p>
      <p className="text-sm">{status || "Processing..."}</p>
    </div>
  );
}

export default MagicLinkHandler;
