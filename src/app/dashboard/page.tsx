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

  // Fetch example data from a "notes" table if it exists
  // Expected schema: notes(id uuid pk, title text, created_at timestamptz default now())
  let notes: Array<{ id: string; title: string; created_at: string } > = [];
  let loadError: string | null = null;
  try {
    const { data, error } = await supabase
      .from("notes")
      .select("id,title,created_at")
      .order("created_at", { ascending: false });
    if (error) {
      loadError = error.message;
    } else if (data) {
      notes = data as typeof notes;
    }
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Failed to load notes";
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome, {user.email}</h1>
      <p>Your account is authenticated via Supabase.</p>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Notes</h2>
          {loadError ? (
            <div className="alert alert-warning">
              {loadError}. If the table doesn't exist, create it in Supabase:
              <code className="ml-2">create table notes (id uuid primary key default gen_random_uuid(), title text, created_at timestamptz default now());</code>
            </div>
          ) : notes.length === 0 ? (
            <div className="alert">No notes yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.map((n) => (
                    <tr key={n.id}>
                      <td>{n.title}</td>
                      <td>{new Date(n.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


