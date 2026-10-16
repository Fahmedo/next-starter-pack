import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold">{siteConfig.name}</h1>
    </div>
  );
}
