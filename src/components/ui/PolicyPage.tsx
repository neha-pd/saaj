import { PageHeader } from "./PageHeader";

export function PolicyPage({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <>
      <PageHeader eyebrow="Policies" title={title} crumbs={[{ label: title }]} />
      <article className="container-saaj prose-saaj max-w-3xl pb-24">
        {updated && <p className="!text-xs tracking-[0.18em] uppercase">Last updated: {updated}</p>}
        {children}
      </article>
    </>
  );
}
