"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/shared/ui/Logo";
import { Container } from "@/shared/ui/Container";
import { mainNav } from "@/shared/config/nav";
import { TrackedLink } from "@/shared/ui/TrackedLink";
import { useState, useEffect } from "react";


export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helper to check if current route matches nav item (including trailing slash & subpaths)
  const isNavActive = (href: string) => {
    if (!pathname) return false;
    const cleanPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
    const cleanHref = href.endsWith("/") && href !== "/" ? href.slice(0, -1) : href;

    if (cleanHref === "/") {
      return cleanPath === "/";
    }

    return cleanPath === cleanHref || cleanPath.startsWith(`${cleanHref}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
        : "bg-white py-4"
        }`}
    >
      <Container size="2xl" className="flex items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
          {mainNav.map((item) => {
            const active = isNavActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-[15px] font-bold transition-all duration-200 cursor-pointer ${
                  active
                    ? "text-primary bg-primary/10 shadow-xs"
                    : "text-neutral-700 hover:text-primary hover:bg-neutral-50"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <TrackedLink
            href="https://page.line.me/221mbxdw"
            target="_blank"
            rel="noopener noreferrer"
            eventName="Contact"
            eventParams={{
              content_name: "Header Contact Us",
              content_category: "General Inquiry",
            }}
            umamiEvent="contact-click: header"
            className="hidden lg:inline-flex bg-accent hover:bg-accent-hover text-white text-[15px] font-bold px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
          >
            ติดต่อเรา
          </TrackedLink>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-100 shadow-xl py-6 px-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-2">
            {mainNav.map((item) => {
              const active = isNavActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                    active
                      ? "bg-primary/10 text-primary font-black"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-primary"
                  }`}
                >
                  <span>{item.title}</span>
                  {active && <span className="text-primary font-black">●</span>}
                </Link>
              );
            })}
            <hr className="my-2 border-neutral-100" />
            <TrackedLink
              href="https://page.line.me/221mbxdw"
              target="_blank"
              rel="noopener noreferrer"
              eventName="Contact"
              eventParams={{
                content_name: "Header Mobile Contact Us",
                content_category: "General Inquiry",
              }}
              umamiEvent="contact-click: header-mobile"
              className="bg-accent text-white px-6 py-3 rounded-full text-center font-bold shadow-md"
            >
              ติดต่อเรา
            </TrackedLink>
          </nav>
        </div>
      )}
    </header>
  );
}
