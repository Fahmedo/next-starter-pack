import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-12 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link href="/" className="text-sm underline">
        Go home
      </Link>
    </div>
  );
}
