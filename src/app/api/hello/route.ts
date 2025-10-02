/**
 * GET /api/hello
 * Vercel-compatible route with simple token check and rate limit placeholder
 * Response shape: { message: string, timestamp: string }
 */
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
	const token = req.headers.get("x-api-token");
	if (process.env.RATE_LIMIT_TOKEN && token !== process.env.RATE_LIMIT_TOKEN) {
		return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	}

	// Placeholder for rate limiting: In production, integrate an edge KV or Upstash
	// Log basic request metadata for debugging after deploy
	const now = new Date().toISOString();
	const message = "Hello from Next.js API";
	return Response.json({ message, timestamp: now });
}


