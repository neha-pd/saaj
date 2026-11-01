"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { mainNav, site } from "@/lib/site";
import { useStore } from "@/components/store/StoreProvider";
import { Logo } from "@/components/ui/Logo";
import { Overlay } from "@/components/ui/Overlay";
import { BagIcon, HeartIcon, InstagramIcon, MenuIcon, SearchIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/format";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const iconBtn = "relative grid size-11 place-items-center text-navy-800 transition hover:text-rose-600";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled ? "border-sand-300/70 bg-ivory-50/92 shadow-[0_6px_30px_-20px_rgba(14,22,48,0.35)] backdrop-blur-md" : "border-transparent bg-ivory-50"
      }`}
    >
      <div className="container-saaj grid h-18 grid-cols-[1fr_auto_1fr] items-center md:h-20 lg:grid-cols-[auto_1fr_auto]">
        {/* Mobile: menu */}
        <div className="flex lg:hidden">
          <button type="button" className={iconBtn} onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
            <MenuIcon size={24} />
          </button>
        </div>

        <div className="justify-self-center lg:justify-self-start">
          <Logo />
        </div>

        <nav aria-label="Main" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-3.5 pr-2 pl-6 xl:gap-9 xl:px-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={`link-underline text-[0.68rem] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors xl:text-[0.72rem] xl:tracking-[0.2em] ${
                    isActive(pathname, item.href) ? "text-rose-600 after:scale-x-100" : "text-navy-800 hover:text-rose-600"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end">
          <button type="button" className={iconBtn} onClick={() => setSearchOpen(true)} aria-label="Search">
            <SearchIcon size={21} />
          </button>
          <Link href="/wishlist" className={`${iconBtn} hidden sm:grid`} aria-label={`Wishlist (${wishlist.length} items)`}>
            <HeartIcon size={21} />
            {wishlist.length > 0 && <Badge count={wishlist.length} />}
          </Link>
          <button type="button" className={iconBtn} onClick={() => setCartOpen(true)} aria-label={`Shopping bag (${cartCount} items)`}>
            <BagIcon size={22} />
            {cartCount > 0 && <Badge count={cartCount} />}
          </button>
        </div>
      </div>

      <Overlay open={menuOpen} onClose={closeMenu} label="Menu" variant="left">
        <div className="flex min-h-full flex-col bg-ivory-50 px-7 pt-6 pb-10">
          <Logo compact />
          <nav aria-label="Mobile" className="mt-10">
            <ul className="space-y-1">
              {mainNav.map((item, i) => (
                <li key={item.href} className="animate-fade-up" style={{ animationDelay: `${80 + i * 50}ms` }}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={`block border-b border-sand-300/60 py-4 font-display text-[1.7rem] ${
                      isActive(pathname, item.href) ? "text-rose-600" : "text-navy-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/wishlist" onClick={closeMenu} className="block py-4 font-display text-[1.7rem] text-navy-800">
                  Wishlist {wishlist.length > 0 && <span className="text-base text-ink-soft">({wishlist.length})</span>}
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-auto space-y-3 pt-10">
            <a href={whatsappLink("Hello SAAJ!")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
              <WhatsAppIcon size={18} /> Chat on WhatsApp
            </a>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
              <InstagramIcon size={18} /> @{site.instagram.handle}
            </a>
          </div>
        </div>
      </Overlay>
    </header>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <span className="absolute top-1.5 right-1 grid min-w-4.5 place-items-center rounded-full bg-rose-600 px-1 text-[0.6rem] leading-[1.15rem] font-medium text-ivory-50">
      {count}
    </span>
  );
}
