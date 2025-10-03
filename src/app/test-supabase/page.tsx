"use client";
/**
 * Test Supabase connection
 * Purpose: Verify Supabase environment variables are working
 * Location: src/app/test-supabase/page.tsx
 */
import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function TestSupabase() {
  const [status, setStatus] = useState<string>("Testing...");
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    // Check environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    setEnvVars({
      url: url ? "Set" : "Missing",
      key: key ? "Set" : "Missing",
      urlValue: url,
      keyValue: key ? `${key.substring(0, 20)}...` : "None"
    });

    // Test Supabase client
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("❌ Supabase client is null - environment variables missing");
      return;
    }

    setStatus("✅ Supabase client created successfully");
    
    // Test a simple query
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setStatus(`❌ Error getting session: ${error.message}`);
      } else {
        setStatus(`✅ Supabase working! Session: ${data.session ? 'Active' : 'None'}`);
      }
    });
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="space-y-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Environment Variables</h2>
            <div className="space-y-2">
              <p><strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {envVars.url}</p>
              <p><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {envVars.key}</p>
              {envVars.urlValue && <p className="text-xs text-gray-500">URL: {envVars.urlValue}</p>}
              {envVars.keyValue && <p className="text-xs text-gray-500">Key: {envVars.keyValue}</p>}
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Connection Status</h2>
            <p className="text-lg">{status}</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Magic Link Test</h2>
            <p>If you have a magic link with ?code=..., paste it here:</p>
            <input 
              type="text" 
              className="input input-bordered w-full mt-2" 
              placeholder="https://your-app.vercel.app/?code=..."
              onChange={(e) => {
                const url = e.target.value;
                const urlObj = new URL(url);
                const code = urlObj.searchParams.get('code');
                if (code) {
                  setStatus(`Found code: ${code}`);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
