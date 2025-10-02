"use client";
/**
 * UserMenu component
 * Purpose: Show sign-in link or user dropdown with sign-out using Supabase client
 * Location: src/components/UserMenu.tsx
 */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function UserMenu() {
  const supabase = getSupabaseBrowserClient();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let isMounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return;
      setEmail(data.user?.email ?? null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => {
      sub.subscription.unsubscribe();
      isMounted = false;
    };
  }, [supabase]);

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setEmail(null);
  }

  if (!supabase) {
    return <Link href="/login" className="btn btn-primary">Sign in</Link>;
  }

  return email ? (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        {email}
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><button onClick={handleSignOut}>Sign out</button></li>
      </ul>
    </div>
  ) : (
    <Link href="/login" className="btn btn-primary">Sign in</Link>
  );
}

export default UserMenu;

