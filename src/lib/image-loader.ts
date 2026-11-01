/**
 * Image loader for the static GitHub Pages build: there is no image optimiser,
 * so serve the file from /public as-is, prefixed with the sub-path.
 */
export default function staticLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${src.startsWith("/") ? base : ""}${src}?w=${width}`;
}
