/**
 * Sub-path the site is served from (e.g. "/saaj" on GitHub Pages, "" locally).
 * next/link and next/image handle it automatically; use `asset()` for plain
 * <video>/<img>/poster URLs that point into /public.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);
