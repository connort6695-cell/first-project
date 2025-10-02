/**
 * Dashboard (protected)
 * Purpose: Example server-protected page using Supabase SSR
 * Location: src/app/dashboard/page.tsx
 */
import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {user.email}</h1>
      <p>Your account is authenticated via Supabase.</p>
    </div>
  );
}


