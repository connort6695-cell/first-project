import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Suspense } from "react";
import { MagicLinkHandler } from "@/components/MagicLinkHandler";
import { SupabaseTest } from "@/components/SupabaseTest";

export default function Home() {
  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <SupabaseTest />
        <MagicLinkHandler />
      </Suspense>
      <div className="alert alert-info">
        <p className="text-sm">Current URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
      </div>
      <Card title="Welcome to your app" actions={<Link href="/login"><Button>Get started</Button></Link>}>
        <p>Next.js + Tailwind CSS + DaisyUI is configured.</p>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Deploy">
          <a className="btn btn-primary" href="https://vercel.com/new" target="_blank" rel="noreferrer">
            Deploy to Vercel
          </a>
        </Card>
        <Card title="Docs">
          <a className="btn btn-secondary" href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
            Next.js Docs
          </a>
        </Card>
      </div>
    </div>
  );
}
