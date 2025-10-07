"use client";
/**
 * SupabaseTest component
 * Purpose: Test Supabase connection and show environment status
 * Location: src/components/SupabaseTest.tsx
 */
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function SupabaseTest() {
  const [status, setStatus] = useState<string>("Testing...");
  const [envStatus, setEnvStatus] = useState<string>("");

  useEffect(() => {
    // Check environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
      setEnvStatus("❌ Environment variables missing");
      setStatus("❌ Supabase not configured");
      return;
    }
    
    setEnvStatus(`✅ Env vars set (URL: ${url.substring(0, 30)}...)`);

    // Test Supabase client
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("❌ Supabase client is null");
      return;
    }

    setStatus("✅ Supabase client created");
    
    // Test session
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setStatus(`❌ Session error: ${error.message}`);
      } else {
        setStatus(`✅ Supabase working! Session: ${data.session ? 'Active' : 'None'}`);
      }
    });
  }, []);

  return (
    <div className="fixed top-4 left-4 bg-base-100 p-3 rounded-lg shadow-lg border z-50 max-w-sm">
      <p className="text-xs font-medium">Supabase Test</p>
      <p className="text-xs">{envStatus}</p>
      <p className="text-xs">{status}</p>
    </div>
  );
}

export default SupabaseTest;


