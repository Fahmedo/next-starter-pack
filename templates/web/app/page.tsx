import { Hero, Section } from '@/components/shared';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section id="features" title="Features">
        <p className="text-muted-foreground">Placeholder section content.</p>
      </Section>
    </>
  );
}
