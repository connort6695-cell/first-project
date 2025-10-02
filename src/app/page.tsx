import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <div className="space-y-6">
      <Card title="Welcome to your app" actions={<Button>Get started</Button>}>
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
