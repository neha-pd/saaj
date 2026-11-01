import Link from "next/link";
import { Ornament } from "@/components/ui/Ornament";

export default function NotFound() {
  return (
    <section className="container-saaj py-28 text-center">
      <p className="eyebrow text-rose-600">404</p>
      <h1 className="mt-4 text-5xl md:text-6xl">A thread gone astray</h1>
      <Ornament className="mx-auto mt-6" />
      <p className="mx-auto mt-6 max-w-md text-ink-soft">The page you&rsquo;re looking for isn&rsquo;t here — but our sarees are.</p>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/shop" className="btn-primary">Shop sarees</Link>
        <Link href="/" className="btn-outline">Back home</Link>
      </div>
    </section>
  );
}
