import { siteConfig } from '@/config/site';

/** Hero placeholder. */
export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{siteConfig.name}</h1>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{siteConfig.description}</p>
    </section>
  );
}
