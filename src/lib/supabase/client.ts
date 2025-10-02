/**
 * Supabase browser client (SSR-ready)
 * Purpose: Provide a typed Supabase client for client components
 * Location: src/lib/supabase/client.ts
 */
import { createBrowserClient } from "@supabase/ssr";

export function getSupabaseBrowserClient() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		if (process.env.NODE_ENV !== "production") {
			console.warn("Supabase env vars are not set. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
			return null as any;
		}
	}

	return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}

export type SupabaseClient = ReturnType<typeof getSupabaseBrowserClient>;


