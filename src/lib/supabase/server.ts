/**
 * Supabase server client (SSR)
 * Purpose: Create authenticated Supabase client for server actions/route handlers
 * Location: src/lib/supabase/server.ts
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function getSupabaseServerClient() {
	const cookieStore = await cookies();
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	return createServerClient(supabaseUrl ?? "", supabaseAnonKey ?? "", {
		cookies: {
			get(name: string) {
				return cookieStore.get(name)?.value;
			},
			set(name: string, value: string, options: Parameters<typeof cookieStore.set>[2]) {
				cookieStore.set(name, value, options);
			},
			remove(name: string, options: Parameters<typeof cookieStore.set>[2]) {
				cookieStore.set(name, "", { ...options, maxAge: 0 });
			},
		},
	});
}

export type SupabaseServerClient = ReturnType<typeof getSupabaseServerClient>;


